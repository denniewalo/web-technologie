const jwt   = require('jsonwebtoken')
auth          = require('../../auth/auth')
uuid          = require('uuid')
bcrypt        = require('bcrypt')
User          = require('../model/user.model')
Admin          = require('../model/admin.model')
RefreshToken  = require('../model/refreshToken.model')
Salt          = require('../model/salt.model')


const saltRounds = 10
const token     = { username: "", password: "" }


exports.register = async function (req, res) {
    
    let userexist = undefined
    if(req.body.role == "admin-group") {
        userexist = await findAdminWithName(req.body.username)
    } else if (req.body.role == "user-group") {
        userexist = await findUserWithName(req.body.username)
    }
    
    if(userexist) return res.json({ message: 'exist' })

    const salt  = await genSalt()
    if(!salt)   return res.send("Es konnte kein Salt generiert werden. <Register>")

    const hashedPw  = await hashPw(req.body.password, salt.genSalt)
    if(!hashedPw)   return res.send("Es konnte kein Passwort verschlüsselt werden. <Register>")

    // erstelle User
    let user = undefined
    if(req.body.role == "admin-group") {
        user      = new Admin()
    } else if (req.body.role == "user-group")  {
        user      = new User()
    }
    
    user.id             = uuid.v4()
    user.fullname       = req.body.fullname
    user.username       = req.body.username
    user.password       = hashedPw
    user.saltid         = salt.saltId
    user.role           = req.body.role

    // erstelle token für das generieren einen AccessTokens
    token.username      = req.body.username
    token.username      = hashedPw
    const accesToken    = auth.generateAccessToken(token)

    if(req.body.role == "admin-group") {
        admin.save( function (err) {
            if (err) res.send("User konnte nicht erstellt werden. <Register>")
            res.status(201).json({
                message: 'created',
                data: { user, accesToken }
            })
        })
    } else if (req.body.role == "user-group") {
        user.save( function (err) {
            if (err) res.send("User konnte nicht erstellt werden. <Register>")
            res.status(201).json({
                message: 'created',
                data: { user, accesToken }
            })
        })
    }
}


exports.login = async function (req, res) {
    
    if(req.body.role != "admin-group" && req.body.role != "user-group") return res.sendStatus(401)

    let user = undefined
    if(req.body.role == "admin-group") {
        user = await findAdminWithName(req.body.username)
    } else if (req.body.role == "user-group")  {
        user = await findUserWithName(req.body.username)
    }
   
    if (!user) return res.json({ status: "Es konnte kein User gefunden werden! <Login>" })

    const salt = await findSaltById(user.saltid)
    if (!salt) return res.json({ status: "Es konnte kein Salt gefunden werden! <Login>" })

    const hashedPw  = await hashPw(req.body.password, salt.salt)
    if(!hashedPw)   return res.json({ status: "Es konnte kein Passwort verschlüsselt werden! <Login>" })

    const compPWResult = await comparePasswords(req.body.password, hashedPw)
    if (!compPWResult) return res.json({ status: 'denied' })
 
    // erstelle AccessToken
    token.username      = req.body.username
    token.password      = hashedPw
    const accessToken   = auth.generateAccessToken(token)

    const findRefreshT = await findRefreshToken(user.id)
    if(findRefreshT) {
        await deleteRefreshTokenByUserId(user.id)
    }

    const refreshToken  = new RefreshToken()
    refreshToken.id = user.id
    refreshToken.token  = auth.generateRefreshToken(token)
    await saveRefreshToken(refreshToken)
    res.json({
        status: 'access',
        token: [ accessToken, user.id ]
    })
}


exports.logout = function (req, res) {
    deleteRefreshTokenByUserId(req.body.id)
    res.json({ status: 'logout' })
}


exports.refreshToken = async function(req, res) {

    const user = await findUserWithId(req.body.userid)
    if(!user) return res.sendStatus(401)

    const refreshToken = await findRefreshToken(user.id)
    if (!refreshToken) return res.sendStatus(403)
    
    const accessToken = await new Promise((resolve, reject) => {
        jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, result) => {

            if(err) return res.sendStatus(403)
            token.username = user.username
            token.password = user.password
            const accessToken = auth.generateAccessToken(token)

            resolve(accessToken)
        })
    })
    res.json({ token: [accessToken, user.id] })
}

// Datenbank Hilfsmethoden ---------------------------------------------------------- //////////

async function genSalt() {
    const salt = await new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {  
            if (err) return console.log(err) 

            const newSalt   = new Salt()
            newSalt.id      = uuid.v4()
            newSalt.salt    = salt
            newSalt.save( function (err) {
                if (err) res.sendStatus(503).send(err)
            })
            const result = { saltId: newSalt.id, genSalt: salt }
            resolve(result)
        })
    })
    return salt
}

async function hashPw(pw, salt) {
    const hashedPw = await new Promise((resolve, reject) => {
        bcrypt.hash(pw, salt,  function(err, hash) {
            if (err) return console.log(err)
            resolve(hash)
        })
    })
    return hashedPw
}

async function findUserWithName(username) {
    const user = await new Promise((resolve, reject) => {
        User.find({username: username}, async function (err, user) {
            if (err) return console.log(err)
            resolve(user)
        })
    })
    return user[0]
}

async function findAdminWithName(username) {
    const admin = await new Promise((resolve, reject) => {
        Admin.find({username: username}, async function (err, admin) {
            if (err) return console.log(err)
            resolve(admin)
        })
    })
    return admin[0]
}

async function findAdminWithName(username) {
    const admin = await new Promise((resolve, reject) => {
        Admin.find({username: username}, async function (err, admin) {
            if (err) return console.log(err)
            resolve(admin)
        })
    })
    return admin[0]
}

async function findUserWithId(userid) {
    const user = await new Promise((resolve, reject) => {
        User.find({id: userid}, async function (err, user) {
            if (err) return console.log(err)
            resolve(user)
        })
    })
    return user[0]
}

async function findSaltById(saltid) {
    const salt = await new Promise((resolve, reject) => {
        Salt.find({id: saltid}, async function (err, salt) {
            if (err) return console.log(err)
            resolve(salt)
        })
    })
    return salt[0]
}

async function comparePasswords(userPw, hashedPw) {
    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(userPw, hashedPw, function(err, result) {
            if (result) resolve(true)
            else resolve(false)
        })
    })
    return result
}

async function findRefreshToken(userid) {
    const refreshToken = await new Promise((resolve, reject) => {
        RefreshToken.find({ id: userid }, async function (err, res) {
            if (err) return console.log(err)
            resolve(res)
        })
    })
    return refreshToken[0]
}

async function saveRefreshToken(refreshToken) {
    await new Promise((resolve, reject) => {
        refreshToken.save( async function(err, res) {
            if (err) return console.log(err)
            resolve(res)
        })
    })
    return
}

async function deleteRefreshTokenByUserId(userId) {
    await new Promise((resolve, reject) => {
        RefreshToken.deleteOne({id: userId}, async function(err, res) {
            if (err) return console.log(err)
            resolve()
        })
    })
    return
}
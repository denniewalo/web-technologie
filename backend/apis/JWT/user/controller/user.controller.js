const jwt     = require('jsonwebtoken')
auth          = require('../../token_generator/token-generator')
uuid          = require('uuid')
bcrypt        = require('bcrypt')
User          = require('../model/user.model')
RefreshToken  = require('../model/refreshToken.model')
Salt          = require('../model/salt.model')


const saltRounds = 10
const token     = { username: "", password: "" }


exports.register = async function (req, res) {

    console.log("Registrierverfahren gestartet...",req.body)

    const userexist = await findUserWithName(req.body.username)
    if(userexist) return res.json({ message: 'exist' })

    const salt  = await genSalt()
    if(!salt)   return res.send("Es konnte kein Salt generiert werden. <Register>")

    const hashedPw  = await hashPw(req.body.password, salt.genSalt)
    if(!hashedPw)   return res.send("Es konnte kein Passwort verschlüsselt werden. <Register>")
    
    console.log("Register hased und salt: ", salt, hashedPw)
    
    // erstelle User
    user            = new User()
    user.id         = uuid.v4()
    user.fullname   = req.body.fullname
    user.username   = req.body.username
    user.password   = hashedPw
    user.saltid     = salt.saltId
    user.role       = req.body.role

    // erstelle token für das generieren einen AccessTokens
    token.username      = req.body.username
    token.username      = hashedPw
    const accessToken    = auth.generateAccessToken(token)

    user.save( function (err) {
        console.log("user wurde gespeicher", user)
        if (err) res.send("User konnte nicht erstellt werden. <Register>")
        res.json({
            status: 'created',
            user: user,
            accessToken: accessToken
        })
    })
    
}


exports.login = async function (req, res) {

    const user = await findUserWithName(req.body.username)
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
        token: [ accessToken, user.id, user.role ]
    })
}


exports.logout = function (req, res) {
    console.log("Benutzer wird ausgeloggt!")
    deleteRefreshTokenByUserId(req.body.id)
    res.json({ status: 'logout' })
}


exports.refreshToken = async function(req, res) {

    console.log("Verfahren zum erstellen eines neuen AccessToken gestartet...")

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token === undefined) req.sendText("denied")
    
    const user = await findUserWithId(req.body.userid)
    if(!user) return res.sendStatus(401)

    const refreshToken = await findRefreshToken(user.id)
    if (!refreshToken) return res.sendStatus(403)
    
    const accessToken = await new Promise((resolve, reject) => {
        jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
            if(!result) return res.sendStatus(403)
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
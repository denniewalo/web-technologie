const jwt   = require('jsonwebtoken')
const uuid  = require('uuid')
bcrypt      = require('bcrypt')
User        = require('../model/user.model')
RefreshToken= require('../model/refreshToken.model')


const access    = 'access'
const refresh   = 'refresh'

const token     = {username: "", password: ""}


exports.newUser = async function (req, res) {

    // encrypt das pw des users
    const salt      = await bcrypt.genSalt()
    const hashedPw  = await bcrypt.hash(req.body.password, salt)

    // build user
    const user      = new User()
    user.id         = uuid.v4()
    user.fullname   = req.body.fullname
    user.username   = req.body.username
    user.password   = hashedPw
    user.role       = "user-group"

    user.save( function (err) {
        if (err) res.sendStatus(503).send("User konnte nicht erstellt werden. <Register>")
        res.json({
            message: "New User created",
            data: user
        })
    })
}


exports.login = async function (req, res) {
    
    const salt      = await bcrypt.genSalt()
    const hashedPw  = await bcrypt.hash(req.body.password, salt)
    const newuser = new User()

    User.find({ name: req.body.username, name: hashedPw }, async function(err, user) {
    
        console.log("FINDUSER: ", user[0])
        
        if(user[0] == undefined) { 
            console.log("USER NICHT GEFUNDEN")
            return res.status(500).send("Kein User gefunden! <Login1>")
        } else {
            console.log("USER GEFUNDEN",user[0])
            newuser = user[0]
        }
    })

    console.log("NEWSUER: ", newuser)

    // Autentification
    if (await bcrypt.compare(hashedPw, newuser.password)) {
        console.log("Access")
        
        //res.sendStatus('Access')
        //next()
    } else {
        console.log("Denied")
        return res.sendStatus('Not allowed')
    }

    token.username      = req.body.username
    token.password      = hashedPw
    const accessToken   = generateToken(token, access)

    const refreshToken  = new RefreshToken()
    refreshToken.userid = userID
    refreshToken.token  = generateToken(token, refresh)

    // save refreshToken
    refreshToken.save( function (err) {
        if (err) res.sendStatus(500).send("RefreshToken konnte nicht gespeichert werden. <Login2>", err)
    })
    res.json({
        message: "New AccessToken and RefreshToken created",
        data: {accessToken, refreshToken}
    })
    console.log("Refreshtoken created!")
    
}


exports.logout = function (req, res) {

    RefreshToken.deleteOne({ _id: req.params.redreshToken_id}, function (err, contact) {
        if (err) {
          res.send(err)
          return
        }
        res.json({
          status: "success",
          message: 'RefreshToken deleted'
        })
    })
}

exports.refreshToken = function(req, res) {

    const refreshToken = req.body.token

    if(refreshToken === null) return res.sendStatus(401)
    if (!RefreshToken.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if(err) return res.sendStatus(403)

        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
}


// Hilfsmethoden
/*async function createRefreshToken(id,token, res) {
    console.log("CreateRefreshToken: ", id, token)

    const refreshToken = new RefreshToken()
    refreshToken.userId = id
    refreshToken.refreshToken = generateToken(token, refresh)
    
    res.json({
        message: "New RefreshToken created",
        data: refreshToken
    })
    console.log("RefreshToken created!")
}*/

function generateToken(token, tokenType) {

    const username = token.username
    const userpw = token.password

    if(tokenType === 'access') {
        return jwt.sign(
            {username, userpw}, 
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m"})
    }
    if(tokenType === 'refresh') {
        return jwt.sign(
            {username, userpw}, 
            process.env.REFRESH_TOKEN_SECRET)
    }
}
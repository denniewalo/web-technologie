const express   = require('express')
const connectDB = require('./config/db/db')
const tool = require('./config/tools/tools')
require('dotenv').config()


connectDB()

const app = express()
const PORT = process.env.PORT

// JWT
const jwt = require('jsonwebtoken')
app.use(express.json())


// Import routes
const apiRoutes = require("./api-routes")
app.use('/api', apiRoutes);


// erstellt einen neunen accessToken wenn ein richtiger refreshToken geschickt wurde
app.post('/token', (req, res) => {
    const refreshToken = req.body.token

    if(refreshToken == null) return res.sendStatus(401)

    // TODO: abfrage in der DB ob refreshToken existiert
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if(err)  return res.sendStatus(403)

        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })

})


// Nach dem Logout werden die refreshTokens des Users gelöscht um 
// keine weiteren Tokens generieren lassen zu können
app.delete('/logout', (req, res) => {
    // TODO: delete refreshToken aus der DB
    res.json({ refreshToken: req.body.refreshToken }).sendStatus(204)
})


// Zum erstellen eines Tokens
app.post('/login', (req, res) => {

    // First: Authentication des User

    // Second: 
    const username = req.body.username
    const password = req.body.password
    const user = { username: username, password: password }

    // generiert nach einer bestimmten Zeit einen neuen accessToken
    const accessToken = generateAccessToken(user)

    // TODO: muss erstellt und in die DB zu dem richtigen User gepeichert werden
    // erstellt einen refreshToken für den benutzer
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    refreshTokens.push(refreshToken)

    res.json({ accessToken: accessToken, refreshToken: refreshToken })

})


// Zum registrieren 
app.post('/sign-up', (req, res) => {

    console.log("FIRST")

    const fullname      = req.body.fullname
    const username      = req.body.username
    const password      = req.body.password
    const role          = "User" 
    
    const userToken = { username, password }
    const newRefreshToken = jwt.sign(userToken, process.env.REFRESH_TOKEN_SECRET)

    const refreshToken  = newRefreshToken

    const newUser = { 
        fullname:       fullname,
        username:       username, 
        password:       password,
        role:           role,
        refreshToken:   refreshToken
    }

    const accessToken = generateAccessToken(newUser.username, newUser.password)

    res.json({ user: newUser, accessToken: accessToken })
})


// generates a new accessToken for this user
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


app.listen(
    PORT, 
    console.log(`Sever is running on http://localhost:${PORT}`)
)
require('./config/dotenv').config()


const express = require('express')
const app = express()

// JWT
const jwt = require('jsonwebtoken')
app.use(express.json())


// Test-Response 
app.get('/post', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {

    // get the header von der request 
    const authHeader = req.headers['authorization']

    // split the header in zwei Teile wo der zweite Wert der Token ist
    // mit 'authHeader &&' check ob ein header ist vorhanden 
    const token = authHeader && authHeader.split(' ')[1]

    // haben wir keinen Token gibt es einen 401 zurück
    if(token == null) return req.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        // wenn wir einen error erhalten gibt es einen 403 zurück
        if(err) return res.sendStatus(403)

        // wir haben einen user, geben den in die request
        req.user = user

        // weiter gehen
        next()
    })
}


app.listen(4700, console.log("running on http://localhost:4700/"))
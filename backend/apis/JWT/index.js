const express       = require('express')
const connectDB     = require('./db/db')
const cors          = require('cors')
const bodyParser    = require('body-parser')
//const cookieParser  = require('cookie-parser')

require('dotenv').config()

const app   = express()
const PORT  = process.env.PORT

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

//app.use(cookieParser)

connectDB()

app.use(cors())

// Import routes
const apiRoutes = require("./user-login-routes")
app.use('/user', apiRoutes);

//Routes
app.get('/', (req, res) => {
    res.send('You can find all resources under /user')
});

app.listen(
    PORT, 
    console.log(`Sever is running on http://localhost:${PORT}`)
)


async function authenticateToken(req, res, next) {

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
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

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token === undefined) req.send("denied")

    console.log("authen token: ", token)
    
  
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if(!user) return res.sendStatus(403)
          if(err) return res.sendStatus(403)
          console.log("User: " ,user ,"verified!")
          resolve(user)
      })
    })
  
    req.user = user  
    next() // weiterleiten zum api aufruf
  
  }

require('dotenv').config()
const jwt   = require('jsonwebtoken')


const express      = require('express')
const port         = 4000;
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const swaggerUI    = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const specs        = require('./swagger/swagger.json');
const app          = express();
const cors         = require('cors');
const fileUpload   = require('express-fileupload');


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//Connect to mongoose
mongoose.connect(process.env.DB_PRODUCTS,{ useNewUrlParser: true});

// Import routes
const apiRoutes = require("./api-routes")
app.use('/api', apiRoutes);

//Routes
app.get('/', (req, res) => {
  res.send('You can find all resources under /api');
});

app.listen(port, function () {
  console.log("Running ProductAPI on port " + port);
});


async function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if(token === undefined) req.send("denied")

  const user = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(!user) return res.sendStatus(403)
        if(err) return res.sendStatus(403)
        console.log("Token: " ,user ,"verified!")
        resolve(user)
    })
  })

  req.user = user  
  next() // weiterleiten zum api aufruf

}
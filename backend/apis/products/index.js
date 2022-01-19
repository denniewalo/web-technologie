require('dotenv').config()

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

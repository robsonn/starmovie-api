const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const config = require('./config/config')
const Planet = require('./src/model/Planet');
const mongoose = require('mongoose');


//const uri = 'mongodb+srv://chewie:.chewie@cluster0-i5lvc.mongodb.net/test?retryWrites=true&w=majority'
const uri = config.mongodb_url

const options = {
     useNewUrlParser: true,
     useUnifiedTopology: true,          
     poolSize: 10     
   };

mongoose.connect(uri, options)

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

mongoose.connection.on('error', (error) => {
     console.log("**********error to connect db: " + error )
})

mongoose.connection.on('disconnected', () => {
     console.log("**********database off ")
})

mongoose.connection.on('connected', () => {
     console.log("**********database connected ")
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/api", require('./src/routes'));

var server = app.listen(config.port, () => console.log(`LISTENING ON PORT ${config.port}`));

module.exports = server
var express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { mongoose } = require("mongoose");
const mongoURI = process.env.mongoURI;
console.log(mongoURI);
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
    console.log("Mongoose DB Connected");
});

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(8080);
console.log('Server is listening on port 8080');
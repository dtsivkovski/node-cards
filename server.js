var express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { mongoose } = require("mongoose");
const mongoURI = process.env.mongoURI;
console.log(mongoURI);
var app = express();
app.use(express.json());
app.use(express.static('public'));

// include all from routes subdirectory - referenced from
// - https://stackoverflow.com/a/6064205
require('./routes')(app);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

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
app.get('/gallery', function(req, res) {
  res.render('pages/gallery');
});

app.listen(8080);
console.log('Server is listening on port 8080');

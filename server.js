/**
 * Created by leandroloi on 14/04/16.
 */

// Setup the server
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;


//Config
var database = require('./config/database');
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

//Routes
require('./app/routes')(app);

//Start app
app.listen(port);
console.log("Starting app on port: " + port)







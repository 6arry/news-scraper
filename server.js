// Require our dependencies
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');

// Setup our port to be either the host's designated port, or port 3000
const PORT = process.env.PORT || 3000;

// Instantiate our Express App
const app = express();

// Setup an Express Router
const router = express.Router();

// Designate our public folder as a static directory
app.use(express.static(__dirname+'/public'));

// Connect Handlebars to our Express app
app.engine("handlebars", exhbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use Express in our app to parse through the data
app.use(express.urlencoded({
    extended: false
}));

// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const db = process.env.MONGODB_URI || "mongodb://"+process.env.username+":"+process.env.password+"@ds045454.mlab.com:45454/heroku_87dkbzqx";

// Connect mongoose to our database
mongoose.connect(db, function(error){
    if (error){
        console.log(error);
    } 
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

// Listen on the port
app.listen(PORT, function(){
    console.log("Listening on port: "+PORT);
});
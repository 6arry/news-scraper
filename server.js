// Require our dependencies
const express = require('express');
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

// Listen on the port
app.listen(PORT, function(){
    console.log("Listening on port: "+PORT);
});
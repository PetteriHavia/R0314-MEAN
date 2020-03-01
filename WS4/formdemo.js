var express = require("express");
var fs = require("fs");
var app = express();

//Require the module required for using form data
var bodyParser = require('body-parser');
app .use(bodyParser.urlencoded({ extended: true })); //For parsing application

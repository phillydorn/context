var express = require('express'),
    bodyParser = require ('body-parser'),
    app = express();


  var keys = require('../../keys.js');

    module.exports = function(app) {
    app.use(express.static('./client'));



    }
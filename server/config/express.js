var express = require('express'),
    bodyParser = require ('body-parser'),
    app = express();



    module.exports = function(app) {
    app.use(express.static('./client'));



    }
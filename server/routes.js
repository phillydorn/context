var express = require('express'),
    bodyParser  = require('body-parser');

module.exports = function (app) {
  var mailRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api', mailRouter);

  require('./routers/mailRouter.js')(mailRouter);
};


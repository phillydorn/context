var mail = require('../models/mail.js');

module.exports = function (app) {

  app.get('/', mail.getMail);
};
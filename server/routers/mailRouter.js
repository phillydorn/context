var mail = require('../models/mail.js');

module.exports = function (app) {

  app.get('/accounts', mail.getAccounts);
  app.get('/messages/*', mail.getMessages);
  app.post ('/messages', mail.unsubscribe);
};
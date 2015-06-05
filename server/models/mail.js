var ContextIO = require ('contextio');
var keys = require('../../keys');
var ctxioClient = new ContextIO.Client({
  key: keys.contextKey,
  secret: keys.contextSecret
})
var id = keys.id;

module.exports = {


  getAccounts: function(req, res) {
    ctxioClient.accounts().get({limit:150}, function (err, response) {
      if (err) throw err;
      res.send(response.body);
    });
  },

  getMessages: function(req, res) {
    var id = req.url.split('/').slice(2)[0];
    ctxioClient.accounts(id).messages().get({limit:100}, function (err, response) {
      if (err) throw err;
      var results = response.body.filter(function (message) {
        return message['list_headers'] && message['list_headers']['list-unsubscribe'];
      })
      res.send({results: results});
    });
  },

  unsubscribe: function(req, res) {
    var addresses = req.body.addresses;
    var id = req.body.id;
    addresses.forEach (function (address) {
      ctxioClient.accounts(id).messages().get({from: address}, function (err, response) {
        if (err) throw err;
        response.body.forEach (function(message) {
          console.log('deleting')
          var messageId = message.message_id;
          // ctxioClient.accounts(id).messages(messageId).delete(function (err, response) {
          //   if (err) throw err;
          // });
        });
      });
    });
    res.sendStatus(200);
  }
}



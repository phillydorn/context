var ContextIO = require ('contextio');

if (!process.env.CONTEXT_KEY) {
  var keys = require('../../keys');
  var key = keys.contextKey;
  var secret = keys.contextSecret;
  var id = keys.id;
} else {
  var key = process.env.CONTEXT_KEY;
  var secret = process.env.CONTEXT_SECRET;
  var id = process.env.ID;
}
var ctxioClient = new ContextIO.Client({
  key: key,
  secret: secret
})

module.exports = {


  getAccounts: function(req, res) {
    ctxioClient.accounts().get({limit:150}, function (err, response) {
      if (err) throw err;
      res.send(response.body);
    });
  },

  getMessagesById: function(req, res) {
    var id = req.url.split('/').slice(2)[0];
    ctxioClient.accounts(id).messages().get({date_after: 1420070400, folder: 'inbox'}, function (err, response) {
      if (err) throw err;
      var results = response.body.filter(function (message) {
        return message['list_headers'] && message['list_headers']['list-unsubscribe'];
      })
      console.log('results', results)
      res.send({results: results});
    });
  },

  unsubscribe: function(req, res) {
    var addresses = req.body.addresses;
    var id = req.body.id;
    console.log('addresses', addresses)
    addresses.forEach (function (address) {
      ctxioClient.accounts(id).messages().get({from: address, date_after: 1420070400}, function (err, response) {
        if (err) throw err;
        response.body.forEach (function(message) {
          var messageId = message.message_id;
          console.log('deleting', messageId)
          ctxioClient.accounts(id).messages(messageId).folders().post({add: 'Trash', remove: 'Inbox'}, function (err, response, request) {
            if (err) throw err;
            console.log('req', request)
            console.log('res', response)
          });
        });
      });
    });
    res.sendStatus(200);
  }
}



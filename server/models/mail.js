var ContextIO = require ('contextio');
var ctxioClient = new ContextIO.Client({
  key: "y8dmwfnv",
  secret: "HCWlxpe9C7iTW6GG"
})
var id = "556e48c0bc63ad65098b4575";

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
      console.log('body', response.body)
      var results = response.body.filter(function (message) {
        return message['list_headers'] && message['list_headers']['list-unsubscribe'];
      })
      console.log('results', results)
      res.send({results: results});
    });
  }
}
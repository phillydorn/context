var ContextIO = require ('contextio');
var ctxioClient = new ContextIO.Client({
  key: "y8dmwfnv",
  secret: "HCWlxpe9C7iTW6GG"
})

module.exports = {


  getMail: function(req, res) {
    ctxioClient.accounts().get({limit:15}, function (err, response) {
      if (err) throw err;
      console.log(response.body);
    });

  }
}
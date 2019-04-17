const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  var formular = "<form action='/' method='post'>";
  formular += "<input type='text' name='amount' value='1' />";
  formular += "<select name='crypto'>";
  formular += "<option value='BTC'>Bitcoin</option>";
  formular += "<option value='LTC'>Litecoin</option>";
  formular += "<option value='XMR'>Monero</option>";
  formular += "</select>";
  formular += "<select name='fiat'>";
  formular += "<option value='USD'>USD</option>";
  formular += "<option value='EUR'>EUR</option>";
  formular += "<option value='CZK'>CZK</option>";
  formular += "</select>";
  formular += "<button type='submit' name='button'>Zjisti!</button>";
  formular += "</form>";
  res.send(formular);
});

app.post("/", function(req, res) {
  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  var amount = req.body.amount;
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  url += crypto;
  url += fiat;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    res.send(
      "<h1> Aktuální cena " +
        amount +
        " " +
        crypto +
        " je " +
        price +
        " " +
        fiat +
        "</h1>"
    );
  });

  console.log(crypto);
  console.log(fiat);
});

app.listen(8080, function() {
  console.log("Server běží na portu 8080.");
});

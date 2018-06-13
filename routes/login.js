var express = require('express');

var login = express(); // the sub app

login.get('/', function (req, res) {
  console.log(login.mountpath); // /admin
  res.send('Admin pagina de start');
});

login.get('/manu', function (req, res) {
  res.send('Admin manuuuuuuuu de start');
});

login.post('/', function (req, res) {
  res.send(req.body);
  console.log(req);
});

module.exports = login;
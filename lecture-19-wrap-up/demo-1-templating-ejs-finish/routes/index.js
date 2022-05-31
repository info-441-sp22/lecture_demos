var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let username = '<strong>kyle</strong>'
  // TODO: add actual azure auth stuff here

  let fruits = [
    {name: "apple", price: 1.5},
    {name: "orange", price: .75},
    {name: "banana", price: 10}
  ]
  // TODO: look up fruit info from a real database

  res.render('index', {
     title: 'Fruit Store',
     username: username,
     fruits: fruits
  });
});

module.exports = router;

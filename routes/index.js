var express = require('express');
var router = express.Router();

const db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', (req, res, next) => {
  res.send(`ID: ${req.params.id}`);
});

module.exports = router;

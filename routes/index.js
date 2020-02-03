var express = require('express');
var router = express.Router();

const db = require('../config/db');
const indexController = require('../controllers/IndexRouter');

/* GET home page. */
//router.get('/', indexController.mainRoute);
router.get('/', indexController.lectureQuestions);

module.exports = router;

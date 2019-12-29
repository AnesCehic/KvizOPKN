var express = require('express');
var router = express.Router();

var usersController = require("../controllers/UsersController");
var usersMiddleware = require("../middlewares/UserMiddleware");

// promijeniti password velicinu u bazi na 256

router.get('/login', usersController.login)
router.get("/register", usersController.register)
router.post('/login', usersMiddleware.loginValidate, usersController.postLogin)
router.post('/register', usersMiddleware.registerValidate, usersController.postRegister);
router.get('/logout', usersController.logout);

module.exports = router;

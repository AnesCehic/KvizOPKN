var UserValidation = require("../validations/UserValidation");

module.exports = {
  loginValidate: (req, res, next) => {
    const { error } = UserValidation.login.validate(req.body);

    if (error) {
      res.status(400).json({
        msg: error.details[0].message,
      });
    } else {
      next();
    }
  },
  registerValidate: (req, res, next) => {
    const { error } = UserValidation.register.validate(req.body);

    if (error) {
      res.status(400).json({
        msg: error.details[0].message,
      });
    } else {
      next();
    }
  }
}
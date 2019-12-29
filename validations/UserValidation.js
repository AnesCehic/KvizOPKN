var Joi = require("@hapi/joi");

const register = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});

const login = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

module.exports = {
  login: login,
  register: register,
};
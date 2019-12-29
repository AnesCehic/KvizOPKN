var Joi = require("@hapi/joi");

const course = Joi.object().keys({
  ime: Joi.string().required().max(30)
});

module.exports = {
  course: course,
}
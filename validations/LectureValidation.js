var Joi = require('@hapi/joi');

var lecture = Joi.object().keys({
  nazivPredavanja: Joi.string().required().min(5),
  redniBroj: Joi.number().required().min(1),
  predId: Joi.number().optional(),
});

module.exports = {
  lecture: lecture
};
const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  text: Joi.string().min(5).max(300).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

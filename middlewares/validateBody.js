const { createError } = require('../helpers');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((d) => d.message).join('; ');
    return next(createError(400, message));
  }
  next();
};

module.exports = validateBody;

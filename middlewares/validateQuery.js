const { createError } = require('../helpers');

const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false });
  if (error) {
    const message = error.details.map((d) => d.message).join('; ');
    return next(createError(400, message));
  }
  req.query = value;
  next();
};

module.exports = validateQuery;

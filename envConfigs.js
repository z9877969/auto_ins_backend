require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  X_AUTH_USER_HEADER: process.env.X_AUTH_USER_HEADER,
  X_AUTH_TOKEN_HEADER: process.env.X_AUTH_TOKEN_HEADER,
  API_BASE_URL: process.env.API_BASE_URL,
  ROOT_USER_EMAIL: process.env.ROOT_USER_EMAIL,
  EMMITED_ORDER_REDIRECT_URL: process.env.EMMITED_ORDER_REDIRECT_URL,
  TO_LOGS_KEY: process.env.TO_LOGS_KEY,
};

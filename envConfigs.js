require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  X_AUTH_USER: process.env.X_AUTH_USER,
  X_AUTH_TOKEN: process.env.X_AUTH_TOKEN,
  API_BASE_URL: process.env.API_BASE_URL,
  ROOT_USER_EMAIL: process.env.ROOT_USER_EMAIL,
};

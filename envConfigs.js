require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  X_AUTH_USER_HEADER: process.env.X_AUTH_USER_HEADER,
  X_AUTH_TOKEN_HEADER: process.env.X_AUTH_TOKEN_HEADER,
  API_BASE_URL: process.env.API_BASE_URL,
  ROOT_USER_EMAIL: process.env.ROOT_USER_EMAIL,
  TO_LOGS_KEY: process.env.TO_LOGS_KEY,
  FRONT_URL: process.env.FRONT_URL,
  BACK_URL: process.env.BACK_URL,
  PORTMONE_LOGIN: process.env.PORTMONE_LOGIN,
  PORTMONE_PSW: process.env.PORTMONE_PSW,
  PORTMONE_PAYEE_ID: process.env.PORTMONE_PAYEE_ID,
  PORTMONE_KEY: process.env.PORTMONE_KEY,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

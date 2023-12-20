const axios = require("axios");
const {
  X_AUTH_TOKEN,
  X_AUTH_USER,
  API_BASE_URL,
  ROOT_USER_EMAIL,
} = require("../../envConfigs");

module.exports.apiInstance = axios.create({
  //baseURL: "/api",
  baseURL: API_BASE_URL,

  headers: {
    "x-auth-user": X_AUTH_TOKEN,
    "x-auth-token": X_AUTH_USER,
    "Content-Type": "application/json",
  },
});

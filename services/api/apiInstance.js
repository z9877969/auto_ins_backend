const axios = require("axios");
const {
  X_AUTH_TOKEN_HEADER,
  X_AUTH_USER_HEADER,
  API_BASE_URL,
} = require("../../envConfigs");

module.exports.apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-auth-user": X_AUTH_USER_HEADER,
    "x-auth-token": X_AUTH_TOKEN_HEADER,
    "Content-Type": "application/json",
  },
});

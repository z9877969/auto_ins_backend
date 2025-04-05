const axios = require('axios');

module.exports.portmoneInstance = axios.create({
  baseURL: 'https://www.portmone.com.ua',
});

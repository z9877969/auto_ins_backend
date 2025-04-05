const crypto = require('crypto');
const envConfigs = require('../envConfigs');

const createPaymentSignature = ({ billAmount, shopOrderNumber }) => {
  const login = envConfigs.PORTMONE_LOGIN.toUpperCase();
  const payeeId = envConfigs.PORTMONE_PAYEE_ID;
  const key = envConfigs.PORTMONE_KEY;

  // Отримання поточної дати у форматі YmdHis
  const dt = formatTimeToDt();

  // Формування рядка для підпису
  const strToSignature =
    payeeId + dt + Buffer.from(shopOrderNumber).toString('hex') + billAmount;
  const finalStrToSignature =
    strToSignature.toUpperCase() +
    Buffer.from(login).toString('hex').toUpperCase();

  // Створення підпису HMAC-SHA256
  const signature = crypto
    .createHmac('sha256', key)
    .update(finalStrToSignature)
    .digest('hex')
    .toUpperCase();

  return {
    dt,
    signature,
  };
};

const formatTimeToDt = () => {
  const date = new Date();
  const dateStr = date.toLocaleString();
  return dateStr.split(', ').reduce((acc, el, i) => {
    if (i === 0) {
      return acc + el.split('.').reverse().join('');
    } else if (i === 1) {
      return acc + el.replace(/:/g, '');
    }
    return acc;
  }, '');
};

module.exports = createPaymentSignature;

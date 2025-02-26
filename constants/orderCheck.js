module.exports.status = {
  OK: "OK", // - означает, что необходимые пароли уже подтверждены или не требуются
  OTP_REQUIRED_SIGNER: "OTP_REQUIRED_SIGNER", // - означает что нужно подтвердить SIGNER’а, а пароль для CUSTOMER’a уже подтвержден или не требуется
  OTP_REQUIRED_CUSTOMER: "OTP_REQUIRED_CUSTOMER", // - означает что нужно подтвердить пароль CUSTOMER’a а пароль SIGNER’а уже подтвержден или не требуется
  OTP_REQUIRED_BOTH: "OTP_REQUIRED_BOTH", // - означает что требуются оба пароля
};

module.exports.state = {
  // Новое состояние договора
  // Допустимые значения: 
  DELETED: "DELETED", // - удален
  REQUEST_CANCELLED: "REQUEST_CANCELLED", // - заявление аннулировано (только для Е-полиса)
  DRAFT: "DRAFT", // - черновик
  SIGNED: "SIGNED", // - подписан
  REQUEST: "REQUEST", // - заявлен (только для Е-полиса)
  EMITTED: "EMITTED", // - заключен (только для Е-полиса)
};

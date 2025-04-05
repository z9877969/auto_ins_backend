module.exports = {
  ORDERS: {
    GET_PSWRD: '/:contractId',
    CHECK_PSWRD: '/:contractId/check',
    REQUEST: '/:contractId/request',
    CREATE_PAYMENT: '/contractpayment/createContractPayment',
    CREATE_PAYMENT_LINK: '/payment/link',
    PAYMENT_SUCCESS: '/contractpayment/success',
    PAYMENT_ERROR: '/contractpayment/error',
    CONFIRM_PAYMENT: '/contractpayment/confirmContractPayment',
  },
};

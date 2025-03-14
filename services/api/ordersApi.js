const { AMOUNT_COMMISSION } = require('../../envConfigs');
const { createAxiosError } = require('../../helpers');
const { apiInstance } = require('./apiInstance');

const getOrderPasswordApi = async (contractId) => {
  try {
    console.log(`/contract/${contractId}/otp/send`, 'START');
    const { data } = await apiInstance.get(`/contract/${contractId}/otp/send`, {
      params: {
        customer: true,
      },
    });
    console.log(`/contract/${contractId}/otp/send`, data);

    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const checkOrderPasswordApi = async ({ contractId, customer }) => {
  try {
    console.log(`/contract/${contractId}/otp`, 'START');
    const { data } = await apiInstance.get(`/contract/${contractId}/otp`, {
      params: {
        customer,
      },
    });
    console.log(`/contract/${contractId}/otp`, data);

    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const updateOrderStatusApi = async ({ contractId, state }) => {
  try {
    console.log('START\n', `/contract/${contractId}/state/${state}`);
    const { data } = await apiInstance.post(
      `/contract/${contractId}/state/${state}`
    );
    console.log(`/contract/${contractId}/state/${state}`, data, '\nEND');
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const createContractPaymentApi = async ({
  contractId,
  paySystem = 'PORTMONE',
  amount,
  orderId,
  linkInvoice = 'https://www.portmone.com.ua/gateway/',
}) => {
  try {
    /* 
    contractId=17434782
    paySystem=PORTMONE
    orderId=PE8V883
    amount=3649.54
    linkInvoice=
  */
    const { data } = await apiInstance.post(
      `/contractpayment/createContractPayment`,
      null,
      {
        params: {
          contractId,
          paySystem,
          amount,
          orderId,
          // linkInvoice,
          linkInvoice: 'https://www.portmone.com.ua/gateway/',
        },
      }
    );
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const confirmContractPaymentApi = async ({
  contractId,
  amount,
  paySystem = 'PORTMONE',
  commission = AMOUNT_COMMISSION,
  orderId,
  payDate,
}) => {
  try {
    // const commissionAmount = amount - (amount / 100) * commission;
    const commissionAmount = Math.ceil((amount * commission) / 100);
    const { data } = await apiInstance.post(
      `/contractpayment/confirmContractPayment`,
      null,
      {
        params: {
          contractId,
          paySystem,
          amount,
          commission: commissionAmount,
          orderId,
          payDate,
        },
        /* 
        contractId query	integer (int64)	Идентификатор договора
        paySystem
        orderId query	string	Идентификатор платежа
        payDate query	string	Дата оплаты
        amount query	number	Сумма платежа
        commission query	number	Комиссия
        */
      }
    );
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

module.exports = {
  checkOrderPasswordApi,
  getOrderPasswordApi,
  updateOrderStatusApi,
  createContractPaymentApi,
  confirmContractPaymentApi,
};

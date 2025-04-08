const { PM, ROUTES } = require('../../constants');
const envConfigs = require('../../envConfigs');
const {
  createAxiosError,
  getExpTime,
  createPaymentSignature,
} = require('../../helpers');
const { apiInstance } = require('./apiInstance');
const { portmoneInstance: pmApi } = require('./portmoneInstance');

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
          linkInvoice,
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
  commission,
  orderId,
  payDate,
}) => {
  try {
    const { data } = await apiInstance.post(
      `/contractpayment/confirmContractPayment`,
      null,
      {
        params: {
          contractId,
          paySystem,
          amount,
          commission,
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

const createPaymentLinkApi = async ({
  billAmount,
  shoperEmail,
  orderId,
  successUrl,
  description,
}) => {
  const { dt, signature } = createPaymentSignature({
    billAmount,
    shopOrderNumber: orderId,
  });

  const { data } = await pmApi.post('/gateway/', {
    method: 'createLinkPayment',
    payee: {
      payeeId: envConfigs.PORTMONE_PAYEE_ID,
      login: envConfigs.PORTMONE_LOGIN,
      dt,
      signature,
    },
    order: {
      description,
      shopOrderNumber: orderId,
      billAmount: billAmount,
      preauthFlag: 'N',
      billCurrency: PM.UAH,
      successUrl,
      failureUrl: envConfigs.BACK_URL + ROUTES.ORDERS.PAYMENT_ERROR,
      expTime: getExpTime(),
    },
    paymentTypes: {
      card: 'Y',
      portmone: 'Y',
      privat: 'Y',
      gpay: 'Y',
      token: 'N',
      clicktopay: 'N',
      createtokenonly: 'N',
    },
    priorityPaymentTypes: {
      gpay: '1',
      privat: '2',
      card: '3',
      portmone: '4',
      token: '0',
      clicktopay: '0',
      createtokenonly: '0',
    },
    token: {
      tokenFlag: 'N',
      returnToken: 'N',
      token: '',
      cardMask: '',
      otherPaymentMethods: 'Y',
      sellerToken: '',
    },
    payer: {
      lang: PM.LANG_UA,
      emailAddress: shoperEmail,
    },
  });

  if (data.error) {
    throw new Error(data.error.message);
  } else {
    return data.linkPayment;
  }
};

const checkPaymentApi = async ({ orderId }) => {
  const { data } = await pmApi.post('/gateway/', {
    method: 'result',
    params: {
      data: {
        login: envConfigs.PORTMONE_LOGIN,
        password: envConfigs.PORTMONE_PSW,
        payeeId: envConfigs.PORTMONE_PAYEE_ID,
        shopOrderNumber: orderId,
      },
    },
    id: '1',
  });

  const payDate = data[0]?.pay_date.split(' ').reduce((acc, el, i) => {
    if (i === 0) {
      return acc + el.split('.').reverse().join('-');
    }
    return acc + 'T' + el;
  }, '');

  return {
    payDate,
    commission: data[0]?.payee_commission,
  };
};

module.exports = {
  checkOrderPasswordApi,
  getOrderPasswordApi,
  updateOrderStatusApi,
  createContractPaymentApi,
  confirmContractPaymentApi,
  createPaymentLinkApi,
  checkPaymentApi,
};

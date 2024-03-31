const { createAxiosError, encodeDate } = require('../../helpers');
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

const checkCustomOrderPasswordApi = async (vclId) => {
  try {
    // ?=&customer=111111&customerOtpDate=2019-06-18T13%3A06%3A16.000%2B0000
    console.log(
      `/contract/${vclId}/sellerOtp?=&customer=111111&customerOtpDate=${encodeDate()}`,
      'START'
    );
    const { data } = await apiInstance.get(
      `/contract/${vclId}/sellerOtp?=&customer=111111&customerOtpDate=${encodeDate()}`,
      {
        params: {
          customer: '111111',
          customerOtpDate: encodeDate(), // 2024-03-31T18%3A53%3A59.250Z
        },
      }
    );
    console.log(
      `/contract/${vclId}/sellerOtp?=&customer=111111&customerOtpDate=${encodeDate()}`,
      data,
      '\nEND'
    );
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const updateOrderStatusApi = async ({ contractId, state }) => {
  try {
    console.log(`/contract/${contractId}/state/${state}`, 'START');
    const { data } = await apiInstance.post(
      `/contract/${contractId}/state/${state}`
    );
    console.log(`/contract/${contractId}/state/${state}`, data);
    return data;
  } catch (error) {
    console.log('error.request._header :>> ', error.request._header);
    console.log('error.response :>> ', error.response);
    throw createAxiosError(error);
  }
};

module.exports = {
  checkOrderPasswordApi,
  checkCustomOrderPasswordApi,
  getOrderPasswordApi,
  updateOrderStatusApi,
};

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

module.exports = {
  checkOrderPasswordApi,
  getOrderPasswordApi,
  updateOrderStatusApi,
};

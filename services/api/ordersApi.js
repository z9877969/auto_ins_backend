const { createAxiosError } = require("../../helpers");
const { apiInstance } = require("./apiInstance");

const getOrderPasswordApi = async (contractId) => {
  try {
    const { data } = await apiInstance.get(`/contract/${contractId}/otp/send`, {
      params: {
        customer: true,
      },
    });

    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const checkOrderPasswordApi = async ({ contractId, customer }) => {
  try {
    const { data } = await apiInstance.get(`/contract/${contractId}/otp`, {
      params: {
        customer,
      },
    });

    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const updateOrderStatusApi = async ({ contractId, state }) => {
  try {
    const { data } = await apiInstance.post(
      `/contract/${contractId}/state/${state}`
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
};

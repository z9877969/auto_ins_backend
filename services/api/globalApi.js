const { createAxiosError, addLog } = require('../../helpers');
const { apiInstance } = require('./apiInstance');

const createContractApi = async (body) => {
  try {
    const { data } = await apiInstance.post('/contract/save', {
      ...body,
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getAddressApi = async ({
  cdbMtibu = false,
  country = 'UA',
  ...query
}) => {
  try {
    const { data } = await apiInstance.get('/place', {
      params: {
        ...query,
        cdbMtibu,
        country,
      },
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

module.exports = {
  createContractApi,
  getAddressApi,
};

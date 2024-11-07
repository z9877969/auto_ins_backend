const { transformReqToCurl } = require('../helpers/transformReqToCurl');
const { globalApi: api,  } = require('../services');
const  {apiInstance} = require('../services/api/apiInstance');


const createContract = async (req, res, next) => {
  try {
    const data = await api.createContractApi(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const data = await api.getAddressApi(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { createContract, getAddress };

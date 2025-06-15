const { globalApi: api } = require('../services');
const { ipnBlackList } = require('../helpers');

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

const getBlackList = async (req, res) => {
  res.json(ipnBlackList.IPN_BLACKLIST);
};

module.exports = { createContract, getAddress, getBlackList };

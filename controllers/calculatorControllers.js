const { calculatorApi: api } = require("../services");

const loginUser = async (req, res, next) => {
  try {
    const data = await api.getUserApi();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getOsagoByParams = async (req, res, next) => {
  try {
    const { salePoint, dateTo, ...query } = req.query;
    const data = await api.getOsagoByParamsApi({ salePoint, dateTo, ...query });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getOsagoByDn = async (req, res, next) => {
  try {
    const { customerCategory, stateNumber, dateFrom, registrationType, taxi } =
      req.query;
    const data = await api.getOsagoByDnApi({
      customerCategory,
      stateNumber,
      dateFrom,
      registrationType,
      taxi,
    });
    return data;
  } catch (error) {
    next(error);
  }
};

const chooseVclTariffDGO = async (req, res, next) => {
  try {
    const data = await api.chooseVclTariffDGOApi(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  getOsagoByParams,
  getOsagoByDn,
  chooseVclTariffDGO,
};

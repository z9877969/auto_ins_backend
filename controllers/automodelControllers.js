const { automodelApi: api } = require("../services");

const getAutoMakers = async (req, res, next) => {
  try {
    const data = await api.getAutoMakersApi();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAutoModelByMaker = async (req, res, next) => {
  try {
    const data = await api.getAutoModelByMakerApi(res.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAutoByNumber = async (req, res, next) => {
  try {
    const data = await api.getAutoByNumberApi(res.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAutoByMakerAndModel = async (req, res, next) => {
  try {
    const data = await api.getAutoByMakerAndModelApi(res.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAutoMakers,
  getAutoModelByMaker,
  getAutoByNumber,
  getAutoByMakerAndModel,
};

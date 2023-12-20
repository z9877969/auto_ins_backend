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

module.exports = {
  getAutoMakers,
  getAutoModelByMaker,
};

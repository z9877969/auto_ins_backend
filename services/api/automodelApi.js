const { createAxiosError } = require("../../helpers");
const { apiInstance } = require("./apiInstance");

const getAutoMakersApi = async () => {
  try {
    const { data } = await apiInstance.get("/auto_model/makers");
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getAutoModelByMakerApi = async (params) => {
  try {
    const { data } = await apiInstance.get("/auto_model/models", {
      params,
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getAutoByNumberApi = async (params) => {
  try {
    const { data } = await apiInstance.get("/auto/mtibu/number", {
      params,
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getAutoByMakerAndModelApi = async (params) => {
  try {
    const { data } = await apiInstance.get("/auto_model/maker_and_model", {
      params,
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

module.exports = {
  getAutoMakersApi,
  getAutoModelByMakerApi,
  getAutoByNumberApi,
  getAutoByMakerAndModelApi,
};

const { createAxiosError } = require("../../helpers");
const { apiInstance } = require("./apiInstance");

const getAutoMakersApi = async () => {
  try {
    const { data } = await instance.get("/auto_model/makers");
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getAutoModelByMakerApi = async (query) => {
  try {
    const { data } = await instance.get("/auto/mtibu/number", {
      params: {
        query,
      },
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

module.exports = {
  getAutoMakersApi,
  getAutoModelByMakerApi,
};

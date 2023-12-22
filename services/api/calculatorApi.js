const { apiInstance } = require("./apiInstance");
const { createAxiosError } = require("../../helpers");
const { ROOT_USER_EMAIL } = require("../../envConfigs");

const getUserApi = async () => {
  try {
    const { data } = await apiInstance.get("/user/getByEmail", {
      params: { email: ROOT_USER_EMAIL },
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getOsagoByParamsApi = async ({
  usageMonths = 0,
  taxi = false,
  salePoint,
  dateTo,
  ...query
}) => {
  try {
    const { data } = await apiInstance.get("/tariff/choose/policy", {
      params: {
        ...query,
        usageMonths,
        taxi,
        salePoint,
        dateTo,
      },
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const getOsagoByDnApi = async ({
  customerCategory,
  stateNumber,
  dateFrom,
  registrationType = "PERMANENT_WITHOUT_OTK",
  taxi = false,
}) => {
  try {
    const { data } = await apiInstance.get("/tariff/choose/policy/statenumber", {
      params: {
        customerCategory,
        stateNumber,
        dateFrom,
        registrationType,
        taxi,
      },
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

const chooseVclTariffDGOApi = async ({ dateFrom, dateTo, ...body }) => {
  try {
    const { data } = await apiInstance.post("/tariff/choose/vcl", {
      ...body,
      dateFrom,
      dateTo,
    });
    return data;
  } catch (error) {
    throw createAxiosError(error);
  }
};

module.exports = {
  getUserApi,
  getOsagoByParamsApi,
  getOsagoByDnApi,
  chooseVclTariffDGOApi,
};

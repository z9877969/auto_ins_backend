const { createRouter } = require("../../helpers");
const { calculatorControllers: c } = require("../../controllers");

const outsideApiRouter = createRouter({
  options: [
    {
      path: "/user/getByEmail",
      method: "get",
      middlewares: null,
      controller: c.loginUser,
    },
    {
      path: "/tariff/choose/policy",
      method: "get",
      middlewares: null,
      controller: c.getOsagoByParams,
    },
    {
      path: "/tariff/choose/policy/statenumber",
      method: "get",
      middlewares: null,
      controller: c.getOsagoByDn,
    },
    {
      path: "/tariff/choose/policy/statenumber",
      method: "get",
      middlewares: null,
      controller: c.chooseVclTariffDGO,
    },
  ],
  defaultMiddlewares: [],
});

outsideApiRouter.setRouter();

module.exports = outsideApiRouter.router;

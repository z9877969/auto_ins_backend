const { createRouter } = require("../../helpers");
const { calculatorControllers: c } = require("../../controllers");

const calculatorRouter = createRouter({
  options: [
    {
      route: "/user/getByEmail",
      method: "get",
      middlewares: null,
      controller: c.loginUser,
    },
    {
      route: "/tariff/choose/policy",
      method: "get",
      middlewares: null,
      controller: c.getOsagoByParams,
    },
    {
      route: "/tariff/choose/policy/statenumber",
      method: "get",
      middlewares: null,
      controller: c.getOsagoByDn,
    },
    {
      route: "/tariff/choose/vcl",
      method: "get",
      middlewares: null,
      controller: c.chooseVclTariffDGO,
    },
  ],
  defaultMiddlewares: [],
});

calculatorRouter.setRouter();

module.exports = calculatorRouter.router;

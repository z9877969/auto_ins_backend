const { createRouter } = require("../../helpers");
const { ordersControllers: c } = require("../../controllers");
const { FRONT_PATHES } = require("../../constants");
const envConfigs = require("../../envConfigs");

const stringifyQueryString = (query) => {
  return Object.entries(query).reduce(
    (acc, [key, value], idx) =>
      acc + (idx === 0 ? "?" : "&") + `${key}=${value}`,
    ""
  );
};

const paymentRouter = createRouter({
  options: [
    {
      route: "/:contractId",
      method: "get",
      middlewares: null,
      controller: c.getOrderPassword,
    },
    {
      route: "/:contractId/check",
      method: "get",
      middlewares: null,
      controller: c.checkOrderPassword,
    },
    {
      route: "/:contractId/request",
      method: "post",
      middlewares: null,
      controller: c.updateOrderToRequestStatus,
    },
    {
      route: "/:contractId/emmit",
      method: "post",
      middlewares: null,
      controller: c.updateOrderToEmmitAndRedirect,
    },
    {
      route: "/contractpayment/createContractPayment",
      method: "post",
      middlewares: null,
      controller: c.createContractPayment,
    },
    {
      route: "/contractpayment/confirmContractPayment",
      method: "post",
      middlewares: null,
      controller: c.confirmContractPayment,
    },
    {
      route: "/contractpayment/redirect",
      method: "post",
      middlewares: null,
      controller: (req, res) => {
        const { query } = req;
        const queryString = stringifyQueryString(query);
        res.redirect(envConfigs + FRONT_PATHES.ORDER_EMMITED + queryString);
      },
    },
  ],
  defaultMiddlewares: [],
});

paymentRouter.setRouter();

module.exports = paymentRouter.router;

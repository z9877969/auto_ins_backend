const { createRouter } = require("../../helpers");
const { ordersControllers: c } = require("../../controllers");

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
      method: "get",
      middlewares: null,
      controller: c.updateOrderToEmmitAndRedirect,
    },
  ],
  defaultMiddlewares: [],
});

paymentRouter.setRouter();

module.exports = paymentRouter.router;

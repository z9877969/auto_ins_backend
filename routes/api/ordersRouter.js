const { createRouter } = require('../../helpers');
const { ordersControllers: c } = require('../../controllers');
const { FRONT_PATHES, ROUTES } = require('../../constants');
const envConfigs = require('../../envConfigs');

const ordersRouter = createRouter({
  options: [
    {
      route: ROUTES.ORDERS.GET_PSWRD,
      method: 'get',
      middlewares: null,
      controller: c.getOrderPassword,
    },
    {
      route: ROUTES.ORDERS.CHECK_PSWRD,
      method: 'get',
      middlewares: null,
      controller: c.checkOrderPassword,
    },
    {
      route: ROUTES.ORDERS.REQUEST,
      method: 'post',
      middlewares: null,
      controller: c.updateOrderToRequestStatus,
    },
    {
      route: ROUTES.ORDERS.CREATE_PAYMENT,
      method: 'post',
      middlewares: null,
      controller: c.createContractPayment,
    },
    {
      route: ROUTES.ORDERS.VCL_REDIRECT,
      method: 'post',
      middlewares: null,
      controller: c.redirectVcl,
    },
    {
      route: ROUTES.ORDERS.PAYMENT_SUCCESS,
      method: 'post',
      middlewares: null,
      controller: c.confirmContractPayment,
    },
    {
      route: ROUTES.ORDERS.PAYMENT_ERROR,
      method: 'post',
      middlewares: null,
      controller: (req, res) => {
        console.log('PAYMENT ERROR');
        res.redirect(envConfigs.FRONT_URL + '?error=true');
      },
    },
  ],
  defaultMiddlewares: [],
});

ordersRouter.setRouter();

module.exports = ordersRouter.router;

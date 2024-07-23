const { createRouter } = require('../../helpers');
const { ordersControllers: c } = require('../../controllers');

const logsRouter = createRouter({
  options: [
    {
      route: '/:contractId',
      method: 'get',
      middlewares: null,
      controller: c.getOrderPassword,
    },
  ],
  defaultMiddlewares: [],
});

logsRouter.setRouter();

module.exports = logsRouter.router;

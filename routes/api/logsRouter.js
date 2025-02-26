const { createRouter } = require('../../helpers');
const { logsControllers: c } = require('../../controllers');

const logsRouter = createRouter({
  options: [
    // {
    //   route: '/:contractId',
    //   method: 'get',
    //   middlewares: null,
    //   controller: c.getOrderPassword,
    // },
    {
      route: '/type-error',
      method: 'post',
      middlewares: null,
      controller: c.addLog,
    },
  ],
  defaultMiddlewares: [],
});

logsRouter.setRouter();

module.exports = logsRouter.router;

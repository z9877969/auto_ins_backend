const { createRouter } = require('../../helpers');
const { globalControllers: c } = require('../../controllers');
const { ctrlWrapper } = require('../../decorators');

const outsideApiRouter = createRouter({
  options: [
    {
      route: '/contract/save',
      method: 'post',
      middlewares: null,
      controller: c.createContract,
    },
    {
      route: '/place',
      method: 'get',
      middlewares: null,
      controller: c.getAddress,
    },
    {
      route: '/blacklist',
      method: 'get',
      middlewares: null,
      controller: ctrlWrapper(c.getBlackList),
    },
  ],
  defaultMiddlewares: [],
});

outsideApiRouter.setRouter();

module.exports = outsideApiRouter.router;

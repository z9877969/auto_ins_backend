const { createRouter } = require("../../helpers");
const { globalControllers: c } = require("../../controllers");

const outsideApiRouter = createRouter({
  options: [
    {
      route: "/contract/save",
      method: "post",
      middlewares: null,
      controller: c.createContract,
    },
    {
      route: "/place",
      method: "get",
      middlewares: null,
      controller: c.getAddress,
    },
  ],
  defaultMiddlewares: [],
});

outsideApiRouter.setRouter();

module.exports = outsideApiRouter.router;

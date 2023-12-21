const { createRouter } = require("../../helpers");
const { automodelControllers: c } = require("../../controllers");

const globalRouter = createRouter({
  options: [
    {
      route: "/auto_model/makers",
      method: "get",
      middlewares: null,
      controller: c.getAutoMakers,
    },
    {
      route: "/auto_model/models",
      method: "get",
      middlewares: null,
      controller: c.getAutoModelByMaker,
    },
    {
      route: "/auto/mtibu/number",
      method: "get",
      middlewares: null,
      controller: c.getAutoByNumber,
    },
    {
      route: "/auto_model/maker_and_model",
      method: "get",
      middlewares: null,
      controller: c.getAutoByMakerAndModel,
    },
  ],
  defaultMiddlewares: [],
});

globalRouter.setRouter();

module.exports = globalRouter.router;

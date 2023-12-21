const { createRouter } = require("../../helpers");
const { automodelControllers: c } = require("../../controllers");

const referencesRouter = createRouter({
  options: [
    {
      path: "/auto_model/makers",
      method: "get",
      middlewares: null,
      controller: c.getAutoMakers,
    },
    {
      path: "/auto_model/models",
      method: "get",
      middlewares: null,
      controller: c.getAutoModelByMaker,
    },
    {
      path: "/auto/mtibu/number",
      method: "get",
      middlewares: null,
      controller: c.getAutoByNumber,
    },
    {
      path: "/auto_model/maker_and_model",
      method: "get",
      middlewares: null,
      controller: c.getAutoByMakerAndModel,
    },
  ],
  defaultMiddlewares: [],
});

referencesRouter.setRouter();

module.exports = referencesRouter.router;

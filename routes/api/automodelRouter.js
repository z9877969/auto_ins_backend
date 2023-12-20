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
      path: "/auto/mtibu/number",
      method: "get",
      middlewares: null,
      controller: c.getAutoModelByMaker,
    },
  ],
  defaultMiddlewares: [],
});

referencesRouter.setRouter();

module.exports = referencesRouter.router;

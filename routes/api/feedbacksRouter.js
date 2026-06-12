const { createRouter } = require('../../helpers');
const { feedbacksControllers: c } = require('../../controllers');
const { validateBody } = require('../../middlewares');
const feedbackSchema = require('../../schemas/feedbackSchema');

const feedbacksRouter = createRouter({
  options: [
    {
      route: '/',
      method: 'post',
      middlewares: [validateBody(feedbackSchema)],
      controller: c.createFeedback,
    },
    {
      route: '/',
      method: 'get',
      middlewares: null,
      controller: c.getFeedbacks,
    },
  ],
  defaultMiddlewares: [],
});

feedbacksRouter.setRouter();

module.exports = feedbacksRouter.router;

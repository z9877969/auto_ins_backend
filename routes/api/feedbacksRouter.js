const { createRouter } = require('../../helpers');
const { feedbacksControllers: c } = require('../../controllers');
const { validateBody, validateQuery } = require('../../middlewares');
const feedbackSchema = require('../../schemas/feedbackSchema');
const getFeedbacksQuerySchema = require('../../schemas/getFeedbacksQuerySchema');

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
      middlewares: [validateQuery(getFeedbacksQuerySchema)],
      controller: c.getFeedbacks,
    },
  ],
  defaultMiddlewares: [],
});

feedbacksRouter.setRouter();

module.exports = feedbacksRouter.router;

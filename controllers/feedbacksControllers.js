const { ctrlWrapper } = require('../decorators');
const { feedbacksDb } = require('../services/db');

const createFeedback = async (req, res) => {
  const feedback = await feedbacksDb.createFeedback(req.body);
  res.status(201).json(feedback);
};

const getFeedbacks = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 6);

  const { feedbacks, total, averageRating } = await feedbacksDb.getFeedbacks({ page, limit });

  res.json({ feedbacks, page, limit, total, averageRating });
};

module.exports = {
  createFeedback: ctrlWrapper(createFeedback),
  getFeedbacks: ctrlWrapper(getFeedbacks),
};

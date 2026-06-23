const pool = require('./dbInstance');

const createFeedback = async ({ name, text, rating }) => {
  const [result] = await pool.execute(
    'INSERT INTO feedbacks (name, text, rating, is_publish) VALUES (?, ?, ?, 1)',
    [name, text, rating]
  );
  const [rows] = await pool.execute(
    'SELECT id, name, text, rating, is_publish, created_at FROM feedbacks WHERE id = ?',
    [result.insertId]
  );
  return rows[0];
};

const getFeedbacks = async ({ page, limit }) => {
  const offset = (page - 1) * limit;

  const [[{ total, averageRating }]] = await pool.query(
    'SELECT COUNT(*) AS total, ROUND(AVG(rating), 2) AS averageRating FROM feedbacks WHERE is_publish = 1'
  );

  const [feedbacks] = await pool.query(
    'SELECT id, name, text, rating, created_at FROM feedbacks WHERE is_publish = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );

  return { feedbacks, total, averageRating };
};

module.exports = { createFeedback, getFeedbacks };

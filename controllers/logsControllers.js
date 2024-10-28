const h = require('../helpers');
const { logsServices: s } = require('../services');

const addLog = async (req, res, next) => {
  try {
    s.addLog({ ...req.body, time: h.convertTime() });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLog,
};

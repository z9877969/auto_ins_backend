module.exports = () => {
  const curDate = Date.now();
  const deadLine = new Date();
  deadLine.setHours(24);
  deadLine.setMinutes(-5);
  deadLine.setSeconds(0);
  const diff = (deadLine - curDate) / 1000;

  return diff;
};

const convertTime = (offSet = 2) => {
  const curDateStr = new Date().toISOString().slice(0, -1);
  const utcDate = new Date(curDateStr);
  const utcHours = utcDate.getHours();

  utcDate.setHours(utcHours + offSet);
  return utcDate.toLocaleString();
};

module.exports = convertTime;

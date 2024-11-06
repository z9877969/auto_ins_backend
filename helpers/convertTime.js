const convertTime = (offSet = 2) => {
  const curDateStr = new Date().toISOString().slice(0, -1);
  const utcDate = new Date(curDateStr);
  const utcHours = utcDate.getHours();

  utcDate.setHours(utcHours + offSet);
  return utcDate.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

module.exports = convertTime;

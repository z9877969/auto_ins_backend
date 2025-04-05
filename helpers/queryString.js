module.exports = {
  parse(str) {
    return str.split('&').reduce((acc, el) => {
      const [key, value] = el.split('=');
      acc[key] = value;
      return acc;
    }, {});
  },
  stringify(obj) {
    return Object.entries(obj).reduce((acc, [key, value], idx, arr) => {
      return acc + `${key}=${value}` + (idx < arr.length - 1 ? '&' : '');
    }, '');
  },
};

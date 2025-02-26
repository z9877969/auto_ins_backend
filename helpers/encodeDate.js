const encodeDate = (date) => {
  const d = date ? new Date(date) : new Date();
  return (
    d
      .toISOString()
      // 2024-03-31T18:43:05.517Z
      .split('')
      .map((el) => {
        switch (el) {
          case ':':
            return '%3A';
          default:
            return el;
        }
      })
      .join('')
  );
};

module.exports = encodeDate;

module.exports = (error) => {
  const { request } = error;
  const { status } = request ? request : {};
  if (status) {
    error.status = status;
  }
  return error;
};

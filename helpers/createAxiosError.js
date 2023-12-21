module.exports = (error) => {
  const { request, response } = error;
  if (response?.status) {
    error.status = response.status;
  } else if (request?.status) {
    error.status = request.status;
  }
  return error;
};

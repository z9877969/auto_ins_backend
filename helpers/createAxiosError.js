module.exports = (error) => {
  // error.response keys -> [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
  const { request, response } = error;
  if (response?.status) {
    error.status = response.status;
    error.message = error.response.data.message;
  } else if (request?.status) {
    error.status = request.status;
  }
  return error;
};

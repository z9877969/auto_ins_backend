module.exports = (error) => {
  // error.response keys -> [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
  const { request, response } = error;
  if (response?.status) {
    error.status = response.status;
    error.message = error.response.data.message;
    error.errorResponse =
      typeof error.response.data === 'string' &&
      error.response.data.startsWith('<')
        ? { markup: error.response.data }
        : { ...error.response.data };
    error.errorResponse.curl = error.response.config?.curlCommand ?? null;
  } else if (request?.status) {
    error.status = request.status;
  }
  return error;
};

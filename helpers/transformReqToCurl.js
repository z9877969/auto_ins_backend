const transformReqToCurl = (req) => {
  const method = req.method;
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;

  // Headers
  let curl = `curl -X ${method} "${url}"`;
  for (const [header, value] of Object.entries(req.headers)) {
    curl += ` -H "${header}: ${value}"`;
  }

  // Body (if it exists)
  if (req.body && Object.keys(req.body).length > 0) {
    const body = JSON.stringify(req.body);
    curl += ` -d '${body}'`;
  }

  return curl;
};

const axiosToCurl = ({ method, url, headers, data }) => {
  let curl = `curl -X ${method.toUpperCase()} "${url}"`;

  // Додаємо заголовки
  for (const [key, value] of Object.entries(headers)) {
    curl += ` -H "${key}: ${value}"`;
  }

  // Додаємо дані (тіло запиту) для методів POST, PUT
  if (
    data &&
    (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')
  ) {
    curl += ` -d '${JSON.stringify(data)}'`;
  }

  return curl;
};

module.exports = { transformReqToCurl, axiosToCurl };

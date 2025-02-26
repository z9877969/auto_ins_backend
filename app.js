const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const {
  calculatorRouter,
  automodelRouter,
  globalRouter,
  ordersRouter,
  logsRouter,
} = require('./routes/api');
const { logsServices } = require('./services');

const app = express();

app.use(logger('dev'));
app.use(cors());
/* 
cors options
  {
    origin: [
      'http://localhost:5173',
      'https://auto-ins.com.ua/',
      'https://auto-ins.netlify.app',
    ],
  }
*/
app.use(express.json());

app.use('/api/calculator', calculatorRouter);
app.use('/api/automodel', automodelRouter);
app.use('/api/global', globalRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/logs', logsRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: 'Not found path' });
});

app.use(async (err, _, res, __) => {
  const {
    status = 500,
    message = 'Internal server error',
    errorResponse = null,
  } = err;
  if (errorResponse) {
    await logsServices.addLog(errorResponse);
  }
  res.status(status).json({ message, errorResponse });
});

module.exports = app;

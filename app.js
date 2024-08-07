const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const {
  calculatorRouter,
  automodelRouter,
  globalRouter,
  ordersRouter,
} = require('./routes/api');
const { addLog } = require('./helpers');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/calculator', calculatorRouter);
app.use('/api/automodel', automodelRouter);
app.use('/api/global', globalRouter);
app.use('/api/orders', ordersRouter);

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
    await addLog(errorResponse);
  }
  res.status(status).json({ message, errorResponse });
});

module.exports = app;

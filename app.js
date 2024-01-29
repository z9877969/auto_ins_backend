const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const {
  calculatorRouter,
  automodelRouter,
  globalRouter,
  ordersRouter,
} = require("./routes/api");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/calculator", calculatorRouter);
app.use("/api/automodel", automodelRouter);
app.use("/api/global", globalRouter);
app.use("/api/orders", ordersRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found path" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

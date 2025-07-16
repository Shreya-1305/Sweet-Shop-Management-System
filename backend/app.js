const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Project setup working correctly ✅" });
});

app.all("*", (req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(globalErrorHandler);

module.exports = app;

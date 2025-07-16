const AppError = require("../utils/appError");

const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${messages.join(". ")}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "ValidationError") {
    err = handleValidationErrorDB(err);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

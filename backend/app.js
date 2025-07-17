const express = require("express");
const sweetRoutes = require("./routes/sweetRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Project setup working correctly ✅" });
});

app.use("/api/sweets", sweetRoutes);
app.use("/api/inventory", inventoryRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(globalErrorHandler);

module.exports = app;

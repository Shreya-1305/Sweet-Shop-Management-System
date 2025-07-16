const Sweet = require("../models/sweetModel");
const AppError = require("../utils/appError"); // ✅ This is missing

exports.addSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json({
      status: "success",
      data: sweet,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return next(new AppError("Sweet not found", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json({
      status: "success",
      results: sweets.length,
      data: sweets,
    });
  } catch (err) {
    next(err);
  }
};

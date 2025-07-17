const Sweet = require("../models/sweetModel");
const AppError = require("../utils/appError");

exports.purchaseSweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return next(
        new AppError("Please provide a valid quantity to purchase", 400)
      );
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) return next(new AppError("Sweet not found", 404));

    if (sweet.quantity < quantity) {
      return next(new AppError("Not enough stock available", 400));
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({
      status: "success",
      message: `${quantity} ${sweet.name} purchased`,
      data: sweet,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new AppError("Invalid sweet ID format", 400));
    }
    next(err);
  }
};

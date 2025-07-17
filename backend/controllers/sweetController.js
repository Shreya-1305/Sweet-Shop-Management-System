const Sweet = require("../models/sweetModel");
const AppError = require("../utils/appError");

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

exports.searchSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);

    res.status(200).json({
      status: "success",
      results: sweets.length,
      data: sweets,
    });
  } catch (err) {
    next(err);
  }
};

exports.sortSweets = async (req, res, next) => {
  try {
    const { sort } = req.query;
    if (!sort) return next(new AppError("Please provide a sort field", 400));

    const sortFields = sort.split(",").join(" ");
    const sweets = await Sweet.find().sort(sortFields);

    res.status(200).json({
      status: "success",
      results: sweets.length,
      data: sweets,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSweetById = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return next(new AppError("Sweet not found", 404));

    res.status(200).json({
      status: "success",
      data: sweet,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new AppError("Invalid sweet ID format", 400));
    }
    next(err);
  }
};

exports.updateSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sweet) return next(new AppError("Sweet not found", 404));

    res.status(200).json({
      status: "success",
      message: "Sweet updated successfully",
      data: sweet,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new AppError("Invalid sweet ID format", 400));
    }
    next(err);
  }
};

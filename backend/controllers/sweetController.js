const Sweet = require("../models/sweetModel");

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

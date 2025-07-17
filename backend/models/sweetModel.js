const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A sweet must have a name"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "A sweet must have a category"],
    enum: {
      values: [
        "chocolate",
        "candy",
        "pastry",
        "milk-based",
        "nut-based",
        "vegetable-based",
      ],
      message:
        "Category must be one of: chocolate, candy, pastry, milk-based, nut-based, vegetable-based",
    },
  },
  price: {
    type: Number,
    required: [true, "A sweet must have a price"],
    min: [0, "Price must be a positive number"],
  },
  quantity: {
    type: Number,
    required: [true, "A sweet must have quantity in stock"],
    min: [0, "Quantity must be a non-negative number"],
  },
  imageUrl: {
    type: String,
  },
});

const Sweet = mongoose.model("Sweet", sweetSchema);
module.exports = Sweet;

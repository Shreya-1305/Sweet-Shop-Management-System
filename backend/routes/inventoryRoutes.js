const express = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.patch("/:id/purchase", inventoryController.purchaseSweet);

module.exports = router;

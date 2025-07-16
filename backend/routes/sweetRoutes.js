const express = require("express");
const sweetController = require("../controllers/sweetController");

const router = express.Router();

router.route("/").post(sweetController.addSweet);

module.exports = router;

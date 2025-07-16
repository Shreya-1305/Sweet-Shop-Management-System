const express = require("express");
const sweetController = require("../controllers/sweetController");

const router = express.Router();

router
  .route("/")
  .get(sweetController.getAllSweets)
  .post(sweetController.addSweet);
router.route("/:id").delete(sweetController.deleteSweet);

module.exports = router;

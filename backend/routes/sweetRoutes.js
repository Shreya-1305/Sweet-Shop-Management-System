const express = require("express");
const sweetController = require("../controllers/sweetController");

const router = express.Router();

router.get("/search", sweetController.searchSweets);
router.get("/sort", sweetController.sortSweets);

router
  .route("/")
  .get(sweetController.getAllSweets)
  .post(sweetController.addSweet);

router
  .route("/:id")
  .get(sweetController.getSweetById)
  .patch(sweetController.updateSweet)
  .delete(sweetController.deleteSweet);

module.exports = router;

const express = require("express");
const router = express.Router();
const subcategoriesController = require("./subcategories.controller");

router.route("/").get(subcategoriesController.getAll);

router
  .route("/category/:name")
  .post(subcategoriesController.create)
  .get(subcategoriesController.getSubcategories);

router.route("/:id").get(subcategoriesController.getOne);

module.exports = router;

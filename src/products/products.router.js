const express = require("express");
const router = express.Router();
const productsController = require("./products.controller");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const middleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json("Forbidden.");
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, function (err) {
    if (err) {
      return res.status(401).json(err);
    }
    return next();
  });
};

router
  .route("/")
  .get(productsController.all)
  .post(body("images").isURL(), middleware, productsController.create);

router
  .route("/:id/favorite")
  .put(middleware, productsController.addFav)
  .delete(middleware, productsController.removeFav);

router
  .route("/:id")
  .get(productsController.getOne)
  .put(productsController.update);

router.route("/search/:text").get(productsController.search);

router.route("/user/:id").get(productsController.genericSearch);

module.exports = router;

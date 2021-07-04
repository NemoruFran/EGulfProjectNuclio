const express = require("express");
const router = express.Router();
const categoriesController = require("./categories.controller");
const jwt = require("jsonwebtoken");

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

router.route("/").post(middleware, categoriesController.create);

module.exports = router;

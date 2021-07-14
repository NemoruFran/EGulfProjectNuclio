const express = require("express");
const router = express.Router();
const bidsController = require("./bids.controller");
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

router.route("/").get(bidsController.all);

router.route("/:id/").get(bidsController.findBid);

module.exports = router;

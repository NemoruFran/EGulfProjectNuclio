const express = require("express");
const router = express.Router();
const usersController = require("./user.controller");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const auctionController = require("../auction/auction.controller");

const middleware = async (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  if (!tokenWithBearer) {
    return res.status(401);
  }
  console.log(tokenWithBearer);
  const tokenWithoutBearer = tokenWithBearer.split(" ")[1];
  jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET, function (err) {
    if (err) {
      return res.status(400).json(err);
    }
    return next();
  });
};

router
  .route("/")
  .post(
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    usersController.create
  )
  .get(usersController.getAll);

router.route("/userId").get(middleware, usersController.getUserId);

router.route("/me/favorites").get(middleware, usersController.getFav);
router.route("/me/productcreatedpage").get(middleware, auctionController.getByUserAuthorization);
router.route("/me/bids").get(usersController.bidsByUser);

router
  .route("/:id")
  .put(middleware, usersController.upDate)
  .get(usersController.get);

module.exports = router;

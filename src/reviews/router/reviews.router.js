const express = require("express");
const router = express.Router();
const controller = require('../controller/reviews.controller')

router.get("/:id/reviews", controller.reviews)
  
module.exports = router

    
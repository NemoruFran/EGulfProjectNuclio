const express = require("express");
const router = express.Router();
const reviewsController = require('./reviews.controller')


router.route('/reviews/product/:productid')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createReview)
    .get(reviewsController.getReview)
    .delete(reviewsController.removeReview)

router.route('/reviews/user/:userid')
    .getAll(reviewsController.getAllReviews)
    .post(reviewsController.createReview)
    .get(reviewsController.getReview)
    .delete(reviewsController.removeReview)
 


  
module.exports = router

    
const express = require("express");
const router = express.Router();
const reviewsController = require('./reviews.controller')

router.route('').post(reviewsController.createReview)

router.route('/product/:productId')
    .get(reviewsController.getAllReviewsByProductId)

router.route('/:reviewId')  //nueva ruta para llega a solo un review
    .get(reviewsController.getReview)
    .delete(reviewsController.removeReview)

router.route('/user/:ownerId')
    .get(reviewsController.getAllReviewsByOwnerId)

  
module.exports = router

    
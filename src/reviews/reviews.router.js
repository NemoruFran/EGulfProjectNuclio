const express = require("express");
const router = express.Router();
const reviewsController = require('./reviews.controller')


router.route('/product/:productId')
    .get(reviewsController.getAllReviewsByProductId)
    .post(reviewsController.createReview)
    .delete(reviewsController.removeReview)

router.route('/:reviewId')  //nueva ruta para llega a solo un review
    .get(reviewsController.getReview) //este ya no sirve para nada despues de sacar los otros get?
    .delete(reviewsController.removeReview)

router.route('/user/:userId')
    .get(reviewsController.getAllReviewsByOwnerId)
    .post(reviewsController.createReview)
    //falta update, acordarse que es con la ruta comienza con .put
 


  
module.exports = router

    
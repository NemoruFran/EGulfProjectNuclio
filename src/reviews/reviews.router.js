const express = require("express");
const router = express.Router();
const reviewsController = require('./reviews.controller')


router.route('/product/:productId')
    .get(reviewsController.getAllReviewsByProductId)
    .post(reviewsController.createReview)
    .delete(reviewsController.removeReview)

router.route('/reviews/:reviewId')  //nueva ruta para llega a solo un review
    .get(reviewsController.getReview)
    .delete(reviewsController.removeReview)

router.route('/user/:ownerId')
    .get(reviewsController.getAllReviewsByOwnerId)
    .post(reviewsController.createReview)

//opción 1 rutas nuevas
router.route('user/:reviewerId')
    .post(reviewsController.createReview)



    //falta update, acordarse que es con la ruta comienza con .put
  
    //Opción 2 unificación de rutas
/* router.route('/reviews/:ownerId/:reviewerId/:productId')
    .get(reviewsController.getAllReviewsByProductId)
    .post(reviewsController.createReview)
    .delete(reviewsController.removeReview)
    .get(reviewsController.getReview)
    .delete(reviewsController.removeReview)
    .get(reviewsController.getAllReviewsByOwnerId)
    .post(reviewsController.createReview)
 */
//Opción 1 unificación de rutas



    /* Crear una ruta para el userReviewer??
    router.route('/user/userReviewerId')
    .get(reviewsController.getAllReviewsByUserReviewerId)
 */
  
module.exports = router

    
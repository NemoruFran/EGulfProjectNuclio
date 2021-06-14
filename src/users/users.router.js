const express = require('express');
const router = express.Router();
const usersControllers = require('./user.controllers');
const reviewsController = require('../reviews/controller/reviews.controller')

router
    .route('/')
        .post(usersControllers.create);
router
    .route('/:id')
    .put(usersControllers.upDate);

router
    .get('/:id/reviews', reviewsController.reviews)

module.exports = router;    

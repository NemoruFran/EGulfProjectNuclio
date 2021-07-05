const express = require('express');
const router = express.Router();
const categoriesController = require ("./categories.controller");

router
    .route ("/") 
        .get(categoriesController.all)
        .post(categoriesController.create)

router
    .route ("/:id")
        .get(categoriesController.getOne)

router
    .route('/search/:text')
        .get(categoriesController.search) 

module.exports = router; 
    
        
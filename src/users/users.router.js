const express = require('express');
const router = express.Router();
const usersControllers = require('./user.controllers');

router
    .route('/')
        .post(usersControllers.create);
router
    .route('/:id')
    .put(usersControllers.upDate);



module.exports = router;    

const express = require('express');
const router = express.Router();
const usersControllers = require('./user.controllers');
const jwt = require('jsonwebtoken');

const middleware = async (req, res, next) =>{
    const tokenWithBearer = req.headers.authorization;
    if (!tokenWithBearer){
        return res.status(401).json('Forbidden')
    }
    console.log(tokenWithBearer);
    const tokenWithoutBearer = tokenWithBearer.split(' ')[1];
    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET, function(err) {
        if (err) {
            return res.status(400).json(err)
        }
        return next();
    })
}

router
    .route('/')
        .post(usersControllers.create);
router
    .route('/:id')
    .put(middleware, usersControllers.upDate);

module.exports = router;    

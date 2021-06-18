const express = require('express');
const router = express.Router();
const productsController = require ("./products.controller");
const jwt = require ("jsonwebtoken"); 
const {body} = require("express-validator");

const middleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json("Forbidden.");
    }
    const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, process.env.TOKEN_SECRET, function(err) {
        if (err) {
          return res.status(401).json(err)
        }
        return next();
    })
  }

  router
    .route ("/")
      .get (productsController.all)
      .post (middleware, productsController.create)

  router
    .route ("/:id")
      .get(productsController.getOne)
  
router
    .route('/search/:text')
     .get(productsController.search) 
    


  module.exports = router;

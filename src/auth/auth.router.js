const express = require('express');
const router = express.Router();
const authController  = require('./auth.controller');


router.route("/login").post(authController.login);

module.exports = router;

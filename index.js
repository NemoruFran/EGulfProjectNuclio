const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const products = require ("./src/products/products.router");
const reviews = require('./src/reviews/reviews.router');
const users  = require('./src/users/users.router');
const auth  = require('./src/auth/auth.router')
const bids = require('./src/bids/bids.router')
const notifications = require ('./src/notifications/notifications.router');
const categories = require ("./src/categories/categories.router")
require('dotenv').config()
require = require("esm");


const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(
  process.env.DB_HOST,
  options
)

mongo.then(()=> {
    console.log("Ready");
    //codigo del seeder
  });

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");
app.use('/users', users);
app.use('/reviews', reviews);
app.use('/products', products);
app.use("/auth", auth);
app.use('/bids', bids)
app.use('/notifications',notifications);
app.use('/categories', categories)

const start = async () => {
  try {
    app.listen(5001, () => {
      console.log(`REST API on http://localhost:5001/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

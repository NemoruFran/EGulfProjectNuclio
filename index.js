const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const products = require ("./src/products/products.router");
require('dotenv').config()

const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(
  process.env.DB_HOST,
  options
);

mongo.then(()=> {
    console.log("Mongo ready to accept queries");
  });

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use('/products', products);



const start= async () => {
    try {
        app.listen(5001,() => {
            console.log(`REST API on http//:localhost:5001/api`);
        });
    } catch (e) {
        console.error(e)
    }
};




start();
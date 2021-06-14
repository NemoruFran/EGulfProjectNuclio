const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const routes = require("./resources/reviews/router/reviews.router");
const mongoose = require('mongoose');
/* 
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(
    'mongodb://mongoadmin:secret@localhost:27017',
); */

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");
app.use(routes)



const start = async () => {
  try {
    app.listen(5000, () => {
      console.log(`REST API on http://localhost:5000/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

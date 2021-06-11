const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.get("/test", (request, response) => {
  response.status(200).json("Soy un test!");
});
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
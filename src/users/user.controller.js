const userModel = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { validationResult } = require("express-validator");

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = bcrypt.genSaltSync(10);
  const entities = await userModel.create({
    name: req.body.name,
    avatar: req.body.avatar,
    rating: req.body.rating,
    address: req.body.address,
    gender: req.body.gender,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  const token = jwt.sign({ id: entities.id }, process.env.TOKEN_SECRET);
  res.status(201).json({ token: token });
};

const getAll = async (req, res) => {
  const users = await userModel.getAll();
  return res.status(200).json(users);
};

const upDate = async (req, res) => {
  const user = await userModel.upDate(req.params.id);
  const id = req.params.id;
  if (user) {
    const body = req.body;
    userModel.upDate(id, body);
    return res.status(200).json(body);
  }
  return res.status(404).json({ error: "user not found" });
};

const get = async (req, res) => {
  const user = await userModel.get(req.params.id);
  const id = req.params.id;
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ error: "user not found" });
};

const getFav = async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Your petition has no authorization" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  const tokenDecoded = jwt.decode(token);
  const userId = tokenDecoded.user._id;
  const user = await userModel.get(userId);
  if (user) {
    return res.status(200).json(user.productFavs);
  } else {
    return res.status(404).json({ error: "user favorites not found" });
  }
};



module.exports = {
  create,
  getAll,
  upDate,
  get,
  getFav,
};

const mongoose = require("mongoose");
require("../products/products.model");


const UsersShema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
  gender: String,
  avatar: { type: String },
  address: String,
  born: Date,
  role: { type: String, default: "user" },
  productsViews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  rating: Number,
  createDate: { type: Date, default: Date.now },
  userUpdated: Date,
  productFavs: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  
});

const userModel = mongoose.model("users", UsersShema);

const getAll = async () => {
  const users = await userModel.find();
  return users;
};

const create = async (user) => {
  const userCreated = await userModel.create(user);
  return userCreated;
};

const upDate = async (id, body) => {
  const user = await userModel.findByIdAndUpdate(id, body);
  return user;
};

const get = async (id) => {
  const user = await userModel.findById(id)
  .populate("productFavs", ["name", "images"])
  .populate({
    path: "productFavs",
    populate: {
      path: "owner",
      model: "users",
      select: "name rating",
    },
  });
  return user;
};

const search = async (query) => {
  const user = await userModel.findOne(query);
  return user;
};

module.exports = {
  create,
  getAll,
  upDate,
  get,
  search,
};

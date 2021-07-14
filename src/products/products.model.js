const mongoose = require("mongoose");
require("../users/users.model");
require("../categories/categories.model");

const ProductsSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String }, //det llargada
  images: [{ type: mongoose.Schema.Types.String }],
  shippingFee: { type: mongoose.Schema.Types.Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  usersFavs: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  status: { type: mongoose.Schema.Types.Boolean },
});

const ProductsModel = mongoose.model("products", ProductsSchema);

const getAll = async () => {
  const products = await ProductsModel.find();
  return products;
};

const getUsersProducts = async (id) => {
  const products = await ProductsModel.find({ owner: id });
  return products;
};

const create = async (product) => {
  const productCreated = await ProductsModel.create(product);
  return productCreated;
};

const getById = async (id) => {
  const productById = await ProductsModel.findById(id).populate(
    "sellerId",
    "name"
  ); //TODO: es pot posar un array per pillar tot el que volem
  return productById;
};

const searchWord = async (query) => {
  const products = await ProductsModel.findOne(query);
  return products;
};

const search = async (query) => {
  const products = await ProductsModel.find(query);
  return products;
};

const updateById = async (id, body) => {
  const updateProductById = await ProductsModel.findByIdAndUpdate(id, body); //MIRARRRRR

  return updateProductById;
};

module.exports = {
  getAll,
  create,
  getById,
  searchWord,
  updateById,
  search,
  getUsersProducts,
};

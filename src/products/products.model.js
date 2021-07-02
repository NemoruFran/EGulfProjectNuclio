const mongoose = require("mongoose");
require("mongoose-type-url"); //asegura que sea una url
require("../users/users.model");

const ProductsSchema = new mongoose.Schema({
  name: String,
  description: String,
  startPrice: Number,
  images: [{ type: mongoose.SchemaTypes.Url }],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  isActive: { type: mongoose.Schema.Types.Boolean, default: true },
  productState: String,
  timestamp: { type: Date, default: Date.now },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "bids" }],
  finalPrice: { type: mongoose.Schema.Types.ObjectId, ref: "bids" },
});

const ProductsModel = mongoose.model("products", ProductsSchema);

const getAll = async () => {
  const products = await ProductsModel.find();
  return products;
};

const create = async (product) => {
  const productCreated = await ProductsModel.create(product);
  return productCreated;
};

const getById = async (id) => {
  const productById = await ProductsModel.findById(id);
  return productById;
};

const searchWord = async (query) => {
  const products = await ProductsModel.findOne(query);
  return products;
};

const getState = async (productStatus) => {
  const state = await ProductsModel.find({
    isActive: productStatus,
  });
  return state;
};

const updateById = async (id, body) => {
  const updateProductById = await ProductsModel.findByIdAndUpdate(id, body);
  return updateProductById;
};

module.exports = {
  getAll,
  create,
  getById,
  searchWord,
  getState,
  updateById,
};

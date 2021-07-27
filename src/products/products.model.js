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
  auctions: [{ type: mongoose.Schema.Types.ObjectId, ref: "auctions" }],
  currentPrice: { type: mongoose.Schema.Types.Number, default: 0 },
});

const ProductsModel = mongoose.model("products", ProductsSchema);

const getAll = async () => {
  const products = await ProductsModel.find().populate("auctions");
  return products;
};

const getUsersProducts = async (id) => {
  const products = await ProductsModel.find({ owner: id }).populate("auctions");
  return products;
};

const create = async (product) => {
  const productCreated = await ProductsModel.create(product).populate(
    "auctions"
  );
  return productCreated;
};

const getById = async (id) => {
  const productById = await ProductsModel.findById(id).populate(
    "owner",
    "auctions"
  ); //TODO: es pot posar un array per pillar tot el que volem
  return productById;
};

const searchWord = async (query) => {
  const products = await ProductsModel.findOne(query).populate("auctions");
  return products;
};

const search = async (query) => {
  const products = await ProductsModel.find(query).populate("auctions");
  return products;
};

const updateById = async (id, body) => {
  const updateProductById = await ProductsModel.findByIdAndUpdate(
    id,
    body
  ).populate("auctions"); //MIRARRRRR

  return updateProductById;
};

const getByIdSimple = async (id) => {
  const product = await ProductsModel.findById(id).populate("auctions");
  return product;
};

const updateAuctionsReference = async (productId, auction) => {
  const product = await ProductsModel.findById(productId);
  product.auctions = [...product.auctions, auction._id];
  const updatedProduct = await product.save();
};

module.exports = {
  getAll,
  create,
  getById,
  searchWord,
  updateById,
  getByIdSimple,
  search,
  getUsersProducts,
  updateAuctionsReference,
};

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  shippingFee: Number,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});

const CategoryModel = mongoose.model("categories", CategorySchema);

//CREAR CATEGORIAS
const create = async (category) => {
  const categoryCreated = await CategoryModel.create(category);
  return categoryCreated;
};

const getAll = async () => {
  const categories = await CategoryModel.find();
  return categories;
};

const findById = async (id) => {
  const category = await CategoryModel.findById(id);
  return category;
};

//GET DE SUBCATEGORIAS A PARTIR DE CATEGORIA
const getSubcategories = async (parentId) => {
  const subcategories = await CategoryModel.find({ parentCategory: parentId });
  return subcategories;
};

module.exports = {
  create,
  getSubcategories,
  getAll,
  findById,
};

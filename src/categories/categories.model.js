const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  parentCategory: String, //{ type: mongoose.Schema.Types.ObjectId, ref: "categories" },
});

const CategoryModel = mongoose.model("categories", CategorySchema);

//CREAR CATEGORIAS
const create = async (category) => {
  const categoryCreated = await CategoryModel.create(category);
  return categoryCreated;
};
/* //GET DE PRODUCTOS A PARTIR DE CATEGORIA
const getProductCategory = async (query) => {
  const productByCategory = await CategoryModel.findOne(query);
  return productByCategory;
};
//GET DE SUBCATEGORIAS A PARTIR DE CATEGORIA
const getSubcategory = async (query) => {
  const subcategories = await CategoryModel.findOne(query);
  return subcategories;
}; */

module.exports = {
  create,
};

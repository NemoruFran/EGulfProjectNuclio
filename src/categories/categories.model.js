const mongoose = require("mongoose");
require("../products/products.model");

const CategoriesSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String },
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const CategoriesModel = mongoose.model("categories", CategoriesSchema);

const getAll = async () => {
  const categories = await CategoriesModel.find();
  return categories;
};

const create = async (category) => {
  const categoryCreated = await CategoriesModel.create(category);
  return categoryCreated;
};

const getById = async (id) => {
  const categoryById = await CategoriesModel.findById(id);
  return categoryById;
};

<<<<<<< HEAD
const searchWord = async (query) => {
  const category = await CategoriesModel.findOne(query);
  return category;
};
=======
 const searchWord = async (query) => {
    const category = await CategoriesModel.findOne(query);
    return category;
}
>>>>>>> development

const updateById = async (id, body) => {
  const updateCategoryById = await CategoriesModel.findByIdAndUpdate(id, body);
  return updateCategoryById;
};

module.exports = {
  getAll,
  create,
  getById,
  searchWord,
  updateById,
};

const mongoose = require("mongoose");
require("../categories/categories.model");

const SubcategoriesSchema = new mongoose.Schema({
  name: String,
  parentCategoriaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});

const subcategoriesModel = mongoose.model("subcategories", SubcategoriesSchema);

const getAll = async () => {
  const subcategories = await subcategoriesModel.find();
  return subcategories;
};

const getById = async (id) => {
  const subcategory = await subcategoriesModel.findById(id);
  return subcategory;
};

const create = async (object) => {
  const subcategoryCreated = await subcategoriesModel.create(object);
  return subcategoryCreated;
};

const getAllfromCategoryId = async (categoryId) => {
  const subcategories = await subcategoriesModel.find({
    parentCategoriaId: categoryId,
  });
  return subcategories;
};

module.exports = {
  getAll,
  getById,
  create,
  getAllfromCategoryId,
};

const subcategoriesModel = require("./subcategories.model");
const categoriesModel = require("../categories/categories.model");

const getAll = async (req, res) => {
  const subcategories = await subcategoriesModel.getAll();
  if (subcategories) {
    return res.status(201).json(subcategories);
  } else {
    return res.status(404).json("There are no subcategories!");
  }
};

const create = async (req, res) => {
  const name = req.body.name;
  const categoryName = req.params.name;
  const category = await categoriesModel.searchWord({ name: categoryName });
  const entity = await subcategoriesModel.create({
    ...req.body,
    parentCategoriaId: category._id,
  });
  if (entity) {
    return res.status(201).json(entity);
  } else {
    return res.status(404).json("The subcategory couldn't be created :c");
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const subcategory = await subcategoriesModel.getById(id);
  if (subcategory) {
    return res.status(201).json(subcategory);
  } else {
    return res.status(404).json("subcategory not found!");
  }
};

const getSubcategories = async (req, res) => {
  const name = req.params.name;
  const category = await categoriesModel.searchWord({ name: name });
  const subcategories = await subcategoriesModel.getAllfromCategoryId(
    category.id
  );
  if (subcategories) {
    return res.status(201).json(subcategories);
  } else {
    return res.status(404).json("something happened :c");
  }
};

module.exports = {
  getAll,
  create,
  getOne,
  getSubcategories,
};

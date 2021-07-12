const CategoryModel = require("./categories.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require("jsonwebtoken");
const productModel = require("../products/products.model");

const create = async (request, response) => {
  const errors = validationResult(request.body.name);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const token = request.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token);

  const categoryCreated = await CategoryModel.create({
    name: request.body.name,
    description: request.body.description,
    createdAt: new Date(),
    parentCategory: request.body.parentCategory,
  });
  response.json(categoryCreated);
};

const getProducts = async (request, response) => {
  const id = request.params.id;
  const products = await productModel.search({ categoryId: id });
  if (products) {
    return response.status(200).json(products);
  } else {
    return response.status(404).json("products by category not found");
  }
};

const getSubcategories = async (request, response) => {
  const id = request.params.id;
  const subcategories = await CategoryModel.getSubcategories(id);
  if (subcategories) {
    return response.status(200).json(subcategories);
  } else {
    return response.status(404).json("no subcategories found");
  }
};

const getAll = async (request, response) => {
  const categories = await CategoryModel.getAll();
  if (categories) {
    return response.status(200).json(categories);
  } else {
    return response.status(404).json("no subcategories");
  }
};

//Esta función te retorna un array de categorías que corresponden a una rama entera. La primera categoría del array es la hoja, la segunda es su padre, la tercera es el padre del padre, ...
const getParents = async (request, response) => {
  const id = request.params.id;
  const parents = [];
  var category = await CategoryModel.findById(id);
  if (!category) {
    return response.status(404).json("There's a problem with the id");
  }
  var parentId = category.parentCategory;
  parents.push(category);
  while (parentId) {
    category = await CategoryModel.findById(parentId);
    if (!category) {
      return response
        .status(404)
        .json("there has been a problem finding the parent category");
    }
    parents.push(category);
    parentId = category.parentCategory;
  }
  return response.status(200).json(parents);
};

module.exports = {
  create,
  getProducts,
  getSubcategories,
  getAll,
  getParents,
};

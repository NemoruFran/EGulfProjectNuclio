const ProductsModel = require("./products.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userModel = require("./../users/users.model");

const all = async (request, response) => {
  const product = await ProductsModel.getAll();
  response.json(product); //TODO: limitar el num de productos que pedimos
};

const create = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const token = request.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token);

  const productCreated = await ProductsModel.create({
    name: request.body.name,
    description: request.body.description,
    startPrice: request.body.startPrice,
    images: request.body.images,
    productState: request.body.productState,
    usersFavs: request.body.userFavs,
    sellerId: tokenDecoded.id,
    categoryId: request.body.categoryId,
  });
  response.json(productCreated);
};
const genericSearch = async (request, response) => {
  const userId = request.params.id;
  const productsById = await ProductsModel.getUsersProducts(userId);
  if (productsById) {
    return response.status(200).json(productsById);
  } else {
    return response.status(404).json("couldn't find product!");
  }
};
const getOne = async (request, response) => {
  const productById = await ProductsModel.getById(request.params.id);
  if (productById) {
    return response.status(200).json(productById);
  } else {
    return response.status(404).json("couldn't find product!");
  }
};

const search = async (req, res) => {
  const text = req.params.text;
  const filteredProducts = await ProductsModel.searchWord({
    name: { $regex: text },
  });
  res.json(filteredProducts);
};

const update = async (request, response) => {
  const id = request.params.id;
  const product = await ProductsModel.getById(id);
  console.log(product);
  const body = request.body;

  if (!product.isActive) {
    const updateProduct = await ProductsModel.updateById(id, body);
    return updateProduct;
  } else {
    return response.status(404).json("you cannot update an active product!");
  }
};

const addFav = async (req, res) => {
  // puede que desde la pagina haya que sacar el id de usuario de tokenDecoded.user._id y que el actual no funcione
  const token = req.headers.authorization.replace("Bearer ", "");
  const tokenDecoded = jwt.decode(token);
  const userId = tokenDecoded.id;
  const id = req.params.id;

  if (id) {
    const updateFavs = await ProductsModel.updateById(id, {
      $addToSet: { usersFavs: userId },
    });
    const updateUserFavs = await userModel.upDate(userId, {
      $addToSet: { favoriteProducts: id },
    });
    return res.status(200).json({ products: updateFavs, user: updateUserFavs });
  } else {
    return res
      .status(404)
      .json("you cannot update user favorites without product id");
  }
};

const removeFav = async (req, res) => {
  // puede que desde la pagina haya que sacar el id de usuario de tokenDecoded.user._id y que el actual no funcione
  const token = req.headers.authorization.replace("Bearer ", "");
  const tokenDecoded = jwt.decode(token);
  const userId = tokenDecoded.id;
  const id = req.params.id;

  if (id) {
    const updateFavs = await ProductsModel.updateById(id, {
      $pull: { usersFavs: userId },
    });
    const updateUserFavs = await userModel.upDate(userId, {
      $pull: { favoriteProducts: id },
    });
    return res.status(200).json({ products: updateFavs, user: updateUserFavs });
  } else {
    return res
      .status(404)
      .json("you cannot remove user favorites without product id");
  }
};

module.exports = {
  all,
  create,
  getOne,
  search,
  update,
  addFav,
  removeFav,
  genericSearch,
};

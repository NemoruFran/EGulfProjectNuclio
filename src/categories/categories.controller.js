const CategoryModel = require("./categories.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require("jsonwebtoken");

const create = async (request, response) => {
  const errors = validationResult(request);
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


module.exports = {
  create,
};

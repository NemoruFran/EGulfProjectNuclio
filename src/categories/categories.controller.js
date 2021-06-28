const CategoriesModel = require ("./categories.model");
const jwt = require ("jsonwebtoken");

const all = async (request, response) => {
    const category = await CategoriesModel.getAll();
    response.json(category);
} 

const create = async (request, response) => {

    const token = request.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);

    const categoryCreated = await CategoriesModel.create({
        name: request.body.name,
        description: request.body.description,
    })
    response.json(categoryCreated)
}

const getOne = async (request, response) => {
    const categoryById = await CategoriesModel.getById(request.params.id);
    if (categoryById) {
        return response.status(200).json(categoryById)
    } else {
        return response.status(404).json("couldn't find product!")
    }
}

const search = async (req, res) => {
    const text= req.params.text;
    const filteredCategories = await CategoriesModel.searchWord({name:{'$regex': text}});
    res.json(filteredCategories);
};

const update = async (request, response) => {
    const id = request.params.id;
    const body= request.body;

    const updateCategory = await CategoriesModel.updateById(id, body);
    if (updateCategory) {
        return response.status(200).json("yay! product updated")
    } else {
        return response.status(404).json ("sorry, couldn't update product")
    }
   }

module.exports = {
    all,
    create,
    getOne,
    search,
    update,
}
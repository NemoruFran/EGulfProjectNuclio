const ProductsModel = require("./products.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require('jsonwebtoken');


const all = async (request, response) => {
    const product = await ProductsModel.getAll();
    response.json(product); //TODO: limitar el num de productos que pedimos
} 

const create = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    const token = request.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    
   const productCreated = await ProductsModel.create({
       name: request.body.name,
       description: request.body.description,
       startPrice: request.body.startPrice,
       images: request.body.images,
       productState: request.body.productState,
       sellerId: tokenDecoded.id  
   })
   response.json(productCreated)
}

const getOne = async (request, response) => {
    const productById = await ProductsModel.getById(request.params.id);
    if (productById) {
        return response.status(200).json(productById)
    } else {
        return response.status(404).json("couldn't find product!")
    }
}
const search = async (req, res) => {
    const text= req.params.text;
    const filteredProducts = await ProductsModel.searchWord({name:{'$regex': text}});
    res.json(filteredProducts);
};


const update = async (request, response) => {
    const isActive = request.isActive;
    const id = request.params.id;
    const body= request.body;

    if (isActive) {
        return response.status(404).json ("you cannot update an active product!")
    } else {
        const updateProduct = await ProductsModel.updateById(id, body);
            return response.status(200).json("yay! product updated")
    }
   }


module.exports = {
    all,
    create,
    getOne,
    search,
    update,
}
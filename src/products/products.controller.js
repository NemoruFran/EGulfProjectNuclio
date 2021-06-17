const ProductsModel = require("./products.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require('jsonwebtoken');


const all = async (request, response) => {
    const product = await ProductsModel.getAll();
    response.json(product); //EEEEEEP!!! NO VOLEM QUE ENS HO MOSTRI TOOOOT, VOLEM ALGUNS, NOMÉS, PQ SI NO SERIEN MOLTS PRODUCTES
} 

const create = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    const token = request.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    console.log(tokenDecoded);
    
   const productCreated = await ProductsModel.create({
       name: request.body.name,
       description: request.body.description,
       startPrice: request.body.startPrice,
       images: request.body.images,
       productState: request.body.productState   
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
const search = async (query) => {
    console.log('query contains:', query);
    const products = await ProductsModel.findOne(query);
    console.log('products contains:', products);
    return products
}


/* 
const update = async (request, response) => {

    const id = request.params.id;
    const body= request.body;

    const updateProduct = await ProductsModel.updateById(id, body);
    if (updateProduct) {
        return response.status(200).json("yay! board updated")
    } else {
        return response.status(404).json ("sorry, couldn't update board")
    } */ //EEEEEPPP!!! NOMÉS ES POT FER UPDATE D'UN PRODUCTE SI AQUEST NO TÉ CAP PUJA! MIRAR COM ÉS EL TEMA PUJAS





module.exports = {
    all,
    create,
    getOne,
    search,
   // update,
}
const ProductsModel = require("./products.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require('jsonwebtoken');


const all = async (request, response) => {
    const product = await ProductsModel.getAll();
    response.json(product); //EEEEEEP!!! NO VOLEM QUE ENS HO MOSTRI TOOOOT, VOLEM ALGUNS, NOMÉS, PQ SI NO SERIEN MOLTS PRODUCTES
} 

const create = async (request, response) => {
    /* const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      } */ //SI S'AFEGEIXEN VALIDACIONS!!!!!!!! MIRAR SI CAL

    const token = request.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    console.log(tokenDecoded);

    const product = await ProductsModel.create({
    ...request.body,
    userId: tokenDecoded.id,  
    });
    response.status(201).json(product)
}

const getOne = async (request, response) => {
    const productById = await ProductsModel.getById(request.params.id);
    if (productById) {
        return response.status(200).json(productById)
    } else {
        return response.status(404).json("couldn't find product!")
    }
}

/* const remove = async (request, response) => {
    const deleteProductdById = await boardsModel.deleteById(request.params.id);
    if (deleteProductdById) {
        return response.status(200).json("yay! product deleted" )
    } else {
        return response.status(404).json("sorry! couldn't delete product")
    }
} */ //NO ENS CAL PERQUÈ NO ES POT ELIMINAR



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



    //CONST UPDATE DE LA LISTA DE PUJAS!!!


module.exports = {
    all,
    create,
    getOne,
    //remove,
   // update,
}
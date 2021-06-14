const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    name: String,
    description: String, //dat llargada
    startPrice: Number,
    images: { type: Buffer, contentType: Array}, //repasar
    category: String, //filtro con opciones
    caracteristicas: String, //det llargada
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    finalPrice: Number,
    state: String, //Revisar porq no será string. Filtro con opciones
    productState: String //Revisar porq no será string. Filtro con 2 opciones
});

const ProductsModel = mongoose.model('products', ProductsSchema);

const getAll = async () => {
    const products = await ProductsModel.find();
    return products;
}

const create = async (product) => {
    const productCreated = await ProductsModel.create(product);
    return productCreated;
}

const getById = async (id) => {
    const productById = await ProductsModel.findById(id);
    return productById;
}

const deleteById = async (id) => {
    const deleteProductdById = await ProductsModel.findByIdAndDelete(id);
    return deleteProductdById;
} //NO ENS CAL PERQUÈ NO ES POT ELIMINAR

const updateById = async (id, body) => {
    const updateProductById = await ProductsModel.findByIdAndUpdate(id, body);
    return updateProductById;
} 


module.exports = {
    getAll,
    create, 
    getById,
    deleteById,
    updateById,
}








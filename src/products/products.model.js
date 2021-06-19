const mongoose = require("mongoose");
require ("../users/users.model");

const categoriesSchema = new mongoose.Schema ({
    name: {type: mongoose.Schema.Types.String},
    description: {type: mongoose.Schema.Types.String},
    productId: [{type: mongoose.Schema.Types.ObjectId, ref: "products"}]
});

const ProductsSchema = new mongoose.Schema({
    name: String,
    description: String, //det llargada
    startPrice: Number,
    images: { type: Buffer, contentType: Array}, //repasar
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    state: {type: mongoose.Schema.Types.ObjectId, ref: "bids"}, //MIRAR COM CRIDAR-HO QUAN L'ALBERT HO TINGUI
    productState: String,
    timestramp: {type: Date, default: Date.now},
    bids: [{type: mongoose.Schema.Types.ObjectId, ref: "bids"}], //MIRAR
    finalPrice: {type: mongoose.Schema.Types.ObjectId, ref: "bids"}, //MIRAR COM. VE DE L'ALBERT QUAN ACABA LA PUJA
    categories: [categoriesSchema]
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

 const searchWord = async (query) => {
    const products = await ProductsModel.findOne(query);
    return products;
}


const updateById = async (id, body) => {
    const updateProductById = await ProductsModel.findByIdAndUpdate(id, body).populate ("bids", "state");
    return updateProductById;
} 

module.exports = {
    getAll,
    create, 
    getById,
   searchWord,
    updateById,
}








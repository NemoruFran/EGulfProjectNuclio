const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    name: String,
    description: String, //det llargada
    startPrice: Number,
    images: { type: Buffer, contentType: Array}, //repasar
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    state: {type: mongoose.Schema.Types.ObjectId, ref: "bids"}, //MIRAR COM CRIDAR-HO QUAN L'ALBERT HO TINGUI
    productState: String,
    timestramp: {type: Date, default: Date.now},
    finalPrice: {type: mongoose.Schema.Types.ObjectId, ref: "bids"}, //MIRAR COM. VE DE L'ALBERT QUAN ACABA LA PUJA
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

const search = async (query) => {
        const products = await ProductsModel.findOne(query);
        return products
}


const updateById = async (id, body) => {
    const updateProductById = await ProductsModel.findByIdAndUpdate(id, body);
    return updateProductById;
} 


module.exports = {
    getAll,
    create, 
    getById,
    search,
    updateById,
}








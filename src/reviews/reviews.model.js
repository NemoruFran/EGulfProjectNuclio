const mongoose = require("mongoose");

//dejamos productOwnerId para que la query de todas las reviews de un usario sean más sencilla
const ReviewSchema = new mongoose.Schema({
    productOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, 
    userReviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    body: String,
    score: String,
    creationDate: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model('review', ReviewSchema, );

const create = async (review) => {
    return await ReviewModel.create(review);
};

const get = async (id) => {
    return await ReviewModel.findById(id);
};

const remove = async (id) => {
    return await ReviewModel.findByIdAndDelete(id);
};

const getAllReviewsByOwnerId = async (ownerId) => {
    return await ReviewModel.find({ productOwnerId: ownerId })
};

const getAllReviewsByProductId = async (productId) => {
    return await ReviewModel.find({ productId: productId })
};


module.exports = {
    create,
    get,
    remove,
    getAllReviewsByOwnerId,
    getAllReviewsByProductId
}; 


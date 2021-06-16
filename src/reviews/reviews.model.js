const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }], 
    userMakerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    body: String,
    score: String,
    date: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model('review', ReviewSchema, );

const create = async (review) => {
    const reviewCreated = await ReviewModel.create(review);
    return reviewCreated;
};

const get = async (id) => {
    const reviewById = await ReviewModel.findById(id);
    return reviewById;
};

const remove = async (id) => {
    const removeReviewById = await ReviewModel.findByIdAndDelete(id);
    return removeReviewById;
};
const update = async (id, body) => {
    const updateReviewById = await ReviewModel.findByIdAndUpdate(id, body);
    return updateReviewById;
};

const getAll = async (id) => {
    const reviewsById = await ReviewModel.findById(id);
    return reviewsById;
};

module.exports = {
    create,
    get,
    remove,
    update,
    getAll
    
}; 
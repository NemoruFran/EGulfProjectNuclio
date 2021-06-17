const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    productOwnerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }], 
    userReviewerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
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

//Todavía no tengo un update!!!
//versión larga del update
/* const update = async (id, body) => {
    const updateReviewById = await ReviewModel.findByIdAndUpdate(id, body);
    return updateReviewById;
}; */

//versión corta del update
/* const update = async (id, body) => {
    return await ReviewModel.findByIdAndUpdate(id, body);
}; */

//Este getAll ya no sirve para nada???

/* const getAll = async (userId) => {
    const reviewsByUserId = await ReviewModel.findById(userId);
    return reviewsByUserId;
}; */

const getAllReviewsByOwnerId = async (userId) => {
    return await ReviewModel.find({ productOwnerId: userId })
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

/* update,
getAll, */
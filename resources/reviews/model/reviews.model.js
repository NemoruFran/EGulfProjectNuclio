const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');

const ReviewSchema = new mongoose.Schema({
    // para userId necesito sacar el usuario al que pertenece el producto en cuestión, 
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }], 
    userMakerId: String,
    productId: String,
    review: [{
        body:'',
        score:'',
        timestamp:'',
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }]

});

const ReviewModel = mongoose.model('review', ReviewSchema, );

const create = async (user) => {
    const reviewCreated = await ReviewModel.create(review);
    return reviewCreated;
};


module.exports = {
    create
}; 
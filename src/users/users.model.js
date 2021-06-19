const mongoose = require("mongoose");
//require("../ratings/ratings.model");
require("../products/products.model");
//require("../bids/bids.model");
//require("../rating/rating.model");
//require("../categories/categories.model");




const UsersShema = new mongoose.Schema({
    name: String,
    email: {type: String, required : true},
    password: String,
    gender: String,
    profilePhoto: String,
    address: String, 
    born: Date, 
    role: { type: String, default: 'user' },
    /* interests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories"}], */
    productsViews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products"
    }],
   /* todo bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"bids"
    }], */
    /* todo ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ratings"}], */
    createDate: { type: Date, default: Date.now }

});

const userModel = mongoose.model("users", UsersShema);

const create = async (user) =>  {
    const userCreated = await userModel.create(user);
    return userCreated;
}
const upDate = async (id, body) => {
    const user = await userModel.findByIdAndUpdate(id,body);
    return user;
}

const get = async (id) =>  {
    const user = await userModel.findById(id);
    return user;
}

const search = async (query) =>  {
    const user = await userModel.findOne(query);
    return user;
}




module.exports  = {
    create,
    upDate,
    get,
    search,
};
const mongoose = require("mongoose");
//require("../ratings/ratings.model");
//require("../products/products.model");


const UsersShema = new mongoose.Schema({
    name: String,
    email: {type: String, required : true},
    password: String,
    gender: String,
    profilePhoto: String,
    address: String, 
    born: Date, 
    interests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories"}],
    productsViews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products"
    }],
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ratings"}],
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
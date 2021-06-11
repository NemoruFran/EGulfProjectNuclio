const mongoose = require("mongoose");
//require("../ratings/ratings.model");
//require("../products/products.model");


const UsersShema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    profilePhoto: String,
    address: String, 
    born: Date, 
    interests:[String],
    role: String,
    /* productsViews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products"
    }], */
    /* bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }], */
    ratings: [String],
    Created_at: { type: Date, default: Date.now }

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




module.exports  = {
    create,
    upDate,
};
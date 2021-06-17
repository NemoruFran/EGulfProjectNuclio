const mongoose = require("mongoose")

const BidSchema = new mongoose.Schema({
    currentBid: Number,
    maxBid: Number,
    endCost: Number,
    startDate: Date,
    endDate: Date,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    Creation_Date: { type: Date, default: Date.now }
});

const BidModel = mongoose.model("bids", BidSchema)

const getAll = async () => {
    const bids = await BidModel.find()
    return bids
};

const create = async (bid) => {
    const bidCreated = await BidModel.create(bid)
    return bidCreated
};

const getBidById = async (id) => {
    const bidById = await BidModel.findById(id)
    return bidById
};

module.exports = {
    getAll,
    create,
    getBidById
};

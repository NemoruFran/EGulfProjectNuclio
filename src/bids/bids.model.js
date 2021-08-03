const mongoose = require("mongoose");
require("../auction/auction.model")
require("../products/products.model")
require("../users/users.model")

const BidSchema = new mongoose.Schema({
  bidAmount: Number,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auctions",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const BidModel = mongoose.model("bids", BidSchema);

const getAll = async () => {
  const bids = await BidModel.find();
  return bids;
};

const create = async (bid) => {
  const bidCreated = await BidModel.create(bid);
  return bidCreated;
};

const getBidById = async (id) => {
  const bidById = await BidModel.findById(id);
  return bidById;
};

const bidsByAuction = async (query) => {
  const bids = await BidModel.find(query);
  return bids;
};

const bidsByUser = async (query) => {
  const bids = await BidModel.find(query).populate("auctionId", ["productId endingDateTime"])
  .populate({
    path: "auctionId",
    populate: {
      path: "productId", 
      model: "products",
      select: "owner name images currentPrice",
      populate : {
        path: "owner",
        model: "users",
        select: "name rating"
      }
    }
  }).populate({
    path:"auctionId",
    populate: {
      path: "bidsAuction",
      model: "bids",
      select: "bidAmount userId"
    }
  })
  
  return bids;
};





module.exports = {
  getAll,
  create,
  getBidById,
  bidsByAuction,
  bidsByUser,
};

const mongoose = require("mongoose");

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

module.exports = {
  getAll,
  create,
  getBidById,
};

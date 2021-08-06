const mongoose = require("mongoose");
const ProductModel = require("../products/products.model");
require ("../bids/bids.model")


const AuctionSchema = new mongoose.Schema({
  startingDateTime: Date,
  endingDateTime: Date,
  startingPrice: Number,
  shippingFee: Number,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  bidsAuction: [{type: mongoose.Schema.Types.ObjectId, ref: "bids"}],
});

const AuctionModel = mongoose.model("auctions", AuctionSchema);

const create = async (auction) => {
  const auctionCreated = await AuctionModel.create(auction);
  await ProductModel.updateAuctionsReference(
    auctionCreated.productId,
    auctionCreated
  );
  return auctionCreated;
};

const getAll = async () => {
  const auctions = await AuctionModel.find()
    .populate("productId", ["name", "description", "images"])
    .populate({
      path: "productId",
      populate: {
        path: "owner",
        model: "users",
      },
    });
  return auctions;
};

const getById = async (id) => {
  const auctionById = await AuctionModel.findById(id)
    .populate("productId", ["name", "description"])
    .populate({
      path: "productId",
      populate: {
        path: "owner",
        model: "users",
        select: "name rating",
      },
    });
  return auctionById;
};
const updateById = async (id, body) => {
  return updateAuctionById;
};

const getOneByQuery = async (query) => {
  const auctions = await AuctionModel.findOne(query);
  return auctions;
};


const updateBids = async (id, body) => {
  const auction = await AuctionModel.findByIdAndUpdate(
    id,
    body
  )
  return auction;
};



module.exports = {
  create,
  getById,
  updateById,
  getOneByQuery,
  getAll,
  updateBids,
};

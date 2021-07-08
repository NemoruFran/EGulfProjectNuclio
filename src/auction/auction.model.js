const mongoose = require("mongoose");
require("../products/products.model");


const AuctionSchema = new mongoose.Schema({
  startingDateTime: Date,
  endingDateTime: Date,
  startingPrice: Number,
  shippingFee: Number,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});

const AuctionModel = mongoose.model("auctions", AuctionSchema);

const create = async (auction) => {
  const auctionCreated = await AuctionModel.create(auction);
  return auctionCreated;
};

const getAll = async () => {
  const auctions = await AuctionModel.find().populate("productId", ["name", "description","images"]).populate({
    path: "productId",
    populate: {
      path: "sellerId",
      model: "users",
      select: "name rating"
    }
  })
  return auctions;
};

const getById = async (id) => {
  const auctionById = await AuctionModel.findById(id);
  return auctionById;
};
const updateById = async (id, body) => {
  const updateAuctionById = await AuctionModel.findByIdAndUpdate(id, body);
  return updateAuctionById;
};

module.exports = {
  create,
  getById,
  updateById,
  getAll,
};

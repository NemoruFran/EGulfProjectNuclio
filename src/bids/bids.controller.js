const bidModel = require("./bids.model");
const jwt = require("jsonwebtoken");

const all = async (request, response) => {
  const bids = await bidModel.getAll();
  response.json(bids);
};

const findBid = async (request, response) => {
  const bidByAuctionId = await bidModel.getBidById(request.params.id);

  if (bidByAuctionId) {
    return response.status(200).json(bidByAuctionId);
  } else {
    return response.status(404).json("No bid found");
  }
};

module.exports = {
  all,
  findBid,
};

const AuctionModel = require("./auction.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require("jsonwebtoken");
const bidModel = require("./../bids/bids.model");

const create = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const token = request.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token);

  const auctionCreated = await AuctionModel.create({
    startingDateTime: request.body.startingDateTime,
    endingDateTime: request.body.endingDateTime,
    startingPrice: request.body.startingPrice, // ??
    shippingFee: request.body.shippingFee,
    createdAt: new Date(),
    productId: request.body.productId,
    sellerId: tokenDecoded.id, // No se si caldría
  });
  response.json(auctionCreated);
};

const getOne = async (request, response) => {
  const auctionById = await AuctionModel.getById(request.params.id);
  if (auctionById) {
    return response.status(200).json(auctionById);
  } else {
    return response.status(404).json("couldn't find auction!");
  }
};

const getAll = async (req, res) => {
  const auctions = await AuctionModel.getAll();
  return res.status(200).json(auctions);
};

const update = async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const updateAuction = await AuctionModel.updateById(request.params.id, {
    ...request.body,
    updatedAt: new Date(),
  });
  if (updateAuction) {
    return response.status(200).json("Ok! product updated");
  } else {
    return response.status(404).json("sorry, couldn't update auction");
  }
};

const createBid = async (request, response) => {
  const paramId = request.params.id;

  const auctionById = await AuctionModel.getById(paramId);

  const bidById = await bidModel.bidsByAuction({
    auctionId: paramId,
  });

  if (
    request?.body?.bidAmount > bidById[bidById.length - 1]?.bidAmount ||
    (!bidById[bidById.length - 1]?.bidAmount &&
      request?.body?.bidAmount > auctionById?.startingPrice)
  ) {
    const token = request.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    const userTokenId = tokenDecoded.user._id;

    const bid = await bidModel.create({
      ...request.body,
      userId: userTokenId,
      auctionId: paramId,
    });

    return response.status(201).json(bid);
  } else {
    return response
      .status(404)
      .json(
        "you cannot create bid because the bid is too low or doesn't exist"
      );
  }
};

const auctionAndBids = async (request, response) => {
  const paramId = request.params.id;

  const auctionById = await AuctionModel.getById(paramId);

  const bidById = await bidModel.bidsByAuction({
    auctionId: paramId,
  });

  if (auctionById || bidById) {
    return response.status(200).json({ auctions: auctionById, bids: bidById });
  } else {
    return response.status(404).json("couldn't find auction and bids!");
  }
};

// TODO ir a buscarlo a la base de datos
const getByUserId = async (req, res) => {
  const userId = req.params.id;
  const auctions = await AuctionModel.getAll();
  const auctionsByUser = auctions.filter(
    (auction) => auction.productId.owner.id === userId
  );
  return res.status(200).json(auctionsByUser);
};

module.exports = {
  create,
  getOne,
  update,
  getAll,
  createBid,
  auctionAndBids,
  getByUserId,
};

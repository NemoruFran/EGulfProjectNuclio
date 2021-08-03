const userModel = require("./users.model");
const bidModel = require("./../bids/bids.model");
const auctionModel = require("../auction/auction.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { validationResult } = require("express-validator");

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = bcrypt.genSaltSync(10);
  const entities = await userModel.create({
    name: req.body.name,
    avatar: req.body.avatar,
    rating: req.body.rating,
    address: req.body.address,
    gender: req.body.gender,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  const token = jwt.sign({ id: entities.id }, process.env.TOKEN_SECRET);
  res.status(201).json({ token: token });
};

const getAll = async (req, res) => {
  const users = await userModel.getAll();
  return res.status(200).json(users);
};

const upDate = async (req, res) => {
  const user = await userModel.upDate(req.params.id);
  const id = req.params.id;
  if (user) {
    const body = req.body;
    userModel.upDate(id, body);
    return res.status(200).json(body);
  }
  return res.status(404).json({ error: "user not found" });
};

const get = async (req, res) => {
  const user = await userModel.get(req.params.id);
  const id = req.params.id;
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ error: "user not found" });
};

const getFav = async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Your petition has no authorization" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  const tokenDecoded = jwt.decode(token);
  const userId = tokenDecoded.user._id;
  const user = await userModel.get(userId);
  if (user) {
    return res.status(200).json(user.productFavs);
  } else {
    return res.status(404).json({ error: "user favorites not found" });
  }
};

/* const auctionswin = async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Your petition has no authorization" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  const tokenDecoded = jwt.decode(token);
  const userId = tokenDecoded.user._id;
  const user = await userModel.get(userId);
  if (user) {
    const bidsUser = await 

    return res.status(200).json(user.productFavs);
  } else {
    return res.status(404).json({ error: "user favorites not found" });
  }
}; */

const bidsByUser = async (req, res)  =>  {
  const bidByIdUser = await bidModel.bidsByUser({
    userId: "60e7f052df5a6d070e1ad960",
  });

  const subastasUser = [];
  const subastasObjeto =[];
  const subastasActivasGanando  = [];
  const subastasActivasPerdidas = [];
  const subastasTerminadasPerdidas = [];
 /*  let contadorActivasGanando = 0;
  let contadorActivasPerdidas = 0;
  let contadorTerminadasPerdidas = 0; */
 
  
  bidByIdUser.forEach( (bid) => {
    if (!subastasUser.includes(bid.auctionId._id)) {
      subastasUser.push(bid.auctionId._id);
      subastasObjeto.push(bid)

    }
  });
  
  subastasObjeto.forEach((subasta) => {
  
    if (new Date(subasta.auctionId.endingDateTime) > new Date()) {
      console.log("subasta viva")
      console.log(subasta.auctionId.productId.currentPrice)
      console.log("la subasta final es de" + subasta.auctionId.bidsAuction[subasta.auctionId.bidsAuction.length -1].userId)
      if ("60e7f052df5a6d070e1ad960" == subasta.auctionId.bidsAuction[subasta.auctionId.bidsAuction.length -1].userId){
        console.log("vas ganando cabroncete")
        //contadorActivasGanando = contadorActivasGanando +1;
        subastasActivasGanando.push(subasta)
      }
      else{
        console.log("Metele pasta que pierdes")
        //contadorActivasPerdidas = contadorActivasPerdidas +1;
        subastasActivasPerdidas.push(subasta)
      }
    } 
    else {
      console.log("subasta cerrada")
      if ("60e7f052df5a6d070e1ad960" !== subasta.auctionId.bidsAuction[subasta.auctionId.bidsAuction.length -1].userId){
        //contadorTerminadasPerdidas  = contadorTerminadasPerdidas + 1;
        subastasTerminadasPerdidas.push(subasta)
        console.log("perdiste")
        console.log("la subasta se cerro en "  + subasta.auctionId.productId.currentPrice)
      } 
    }  
 
  })
  /* console.log("subastasActivasGanando" + subastasActivasGanando.length)
  console.log("activa perdidas" + subastasActivasPerdidas.length)
  console.log("muertas perdidas" +  subastasTerminadasPerdidas.length) */

  
  

  return res.status(200).json({activas:subastasActivasGanando,perdiendo:subastasActivasPerdidas,perdidas:subastasTerminadasPerdidas})
  

}

module.exports = {
  create,
  getAll,
  upDate,
  get,
  getFav,
  bidsByUser,
};

const bidModel = require("./bids.model")
const jwt = require("jsonwebtoken")

const all = async (request, response) => {
  const bids = await bidModel.getAll()
  response.json(bids)
}

const create = async (request, response) => {
 
  const token = request.headers.authorization.split(" ")[1]
  const tokenDecoded = jwt.decode(token)

  const bid = await bidModel.create({
    ...request.body,
    userId: tokenDecoded.id,  
  })

  response.status(201).json(bid)
}

const find = async (request, response) => {

  const bidById = await bidModel.getBidById(request.params.id)

  if (bidById) {
    return response.status(200).json(bidById)
  } else {
    return response.status(404).json("No bid found")
  }
}

module.exports = {
  all,
  create, 
  find
}
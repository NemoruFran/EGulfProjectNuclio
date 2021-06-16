const reviewModel = require('./reviews.model')
/* 
const controller = {
}

controller.reviews = (request, response) => {
     response.status(200).json("Soy un test! OOOOOK")
} */

const createReview = async (req, res) => {
     const review = await reviewModel.create(req.body);
     res.status(201).json(review)
};

const getReview = async (req, res) => {
     const review = await reviewModel.get(req.body.id);
     return res.status(200).json(review);
};  
 
const removeReview = async (req, res) => {
     const review = await pinModel.remove(req.params.id);
     res.status(200).json(review)
};  

const updateReview = async (req, res) => {
     const body = req.body;
     const id = req.params.id;
     const review = await reviewModel.update(id, body);
     res.status(200).json(review)
};

const getAllReviews = async (req, res) => {
     const reviews = await reviewModel.getAllReviews ();
     res.json(reviews);
};

module.exports = {
     createReview,
     getReview,
     removeReview,
     updateReview,
     getAllReviews
} 

/* controller */
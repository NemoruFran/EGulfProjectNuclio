const reviewModel = require('./reviews.model')

const createReview = async (req, res) => {
     const reviewToCreate = {
          productOwnerId: req.body.ownerId,
          userReviewerId: req.body.reviewerId,
          productId: req.body.productId,
          ...req.body,
     }
     const review = await reviewModel.create(reviewToCreate);
     res.status(201).json(review)
};

const getReview = async (req, res) => {
     const review = await reviewModel.get(req.params);
     res.status(201).json(review)
};

const removeReview = async (req, res) => {
     const review = await reviewModel.remove(req.params.reviewId);
     res.status(201).json(review)
};

const getAllReviewsByOwnerId = async (req, res) => {
     const reviews = await reviewModel.getAllReviewsByOwnerId(req.params.ownerId);
     res.status(201).json(reviews)
};

const getAllReviewsByProductId = async (req, res) => {
     const reviews = await reviewModel.getAllReviewsByProductId(reviewsToGetByProductId);
     res.status(201).json(reviews)
};

module.exports = {
     createReview,
     getReview,
     removeReview,
     getAllReviewsByOwnerId,
     getAllReviewsByProductId
} 


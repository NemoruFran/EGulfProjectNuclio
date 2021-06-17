const reviewModel = require('./reviews.model')

// esto de abajo revisarlo y replicarlo para los otros controllers.
const createReview = async (req, res) => {
     const reviewToCreate = {
          userReviewerId: req.params.userId,
          ...req.body,
     }
     const review = await reviewModel.create(reviewToCreate);
     res.status(201).json(review)
};

/* 
const getReview = async (req, res) => {
     const reviewId = await reviewModel.get(req.params.reviewId);
     return res.status(200).json(reviewId);
};  
 */

const getReview = async (req, res) => {
     const reviewToGet = {
          reviewId: req.params.reviewId,
          ...req.body,
     }
     const review = await reviewModel.get(reviewToGet);
     res.status(201).json(review)
};

/* const removeReview = async (req, res) => {
     const reviewId = await reviewModel.remove(req.params.req.params.reviewId);
     res.status(200).json(reviewId)
};   */

const removeReview = async (req, res) => {
     const reviewToRemove = {
          reviewId: req.params.reviewId,
          ...req.body,
     }
     const review = await reviewModel.get(reviewToRemove);
     res.status(201).json(review)
};


/* const updateReview = async (req, res) => {
     const body = req.body;
     const reviewId = req.params.reviewId;
     const review = await reviewModel.update(reviewId, body);
     res.status(200).json(review)
};
 */

// pongo el update comentado por ahora
/* const updateReview = async (req, res) => {
     const reviewToUpdate = {
          body: req.body,
          reviewId: req.params.reviewId,
          ...req.body,
     }
     const review = await reviewModel.update(reviewToUpdate);
     res.status(201).json(review)
}; */

/* const getAllReviewsByUserId = async (req, res) => {
     const reviewsByUserId = await reviewModel.getAllReviewsByUserId(req.params.userId);
     res.json(reviewsByUserId);
}; */

const getAllReviewsByOwnerId = async (req, res) => {
     const reviewsToGetByOwnerId = {
          productOwnerId: req.params.userId,
          ...req.body,
     }
     const reviews = await reviewModel.getAllReviewsByOwnerId(reviewsToGetByOwnerId);
     res.status(201).json(reviews)
};

/* const getAllReviewsByProductId = async (req, res) => {
     const reviewsByProductId = await reviewModel.getAllReviewsByProductId(req.params.productId);
     res.json(reviewsByProductId);
}; */

const getAllReviewsByProductId = async (req, res) => {
     const reviewsToGetByProductId = {
          productId: req.params.productId,
          ...req.body,
     }
     const reviews = await reviewModel.getAllReviewsByProductId(reviewsToGetByProductId);
     res.status(201).json(reviews)
};

module.exports = {
     createReview,
     getReview,
     removeReview,
     getAllReviewsByProductId,
     getAllReviewsByOwnerId
} 
//npm startupdateReview,
/* controller */
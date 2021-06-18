const reviewModel = require('./reviews.model')

/* const createReview = async (req, res) => {
     const reviewToCreate = {
          userReviewerId: req.params.reviewerId,
          ...req.body,
     }
     const review = await reviewModel.create(reviewToCreate);
     res.status(201).json(review)
};
 */
//prueba createReview
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
     const reviewToGet = {
          productOwnerId: req.body.ownerId,
          userReviewerId: req.body.reviewerId,
          productId: req.body.productId,
          reviewId: req.params.reviewId,
          ...req.body,
     }
     const review = await reviewModel.get(reviewToGet);
     res.status(201).json(review)
};

const removeReview = async (req, res) => {
     const reviewToRemove = {
          reviewId: req.params.reviewId,
          ...req.body,
     }
     const review = await reviewModel.get(reviewToRemove);
     res.status(201).json(review)
};

const getAllReviewsByOwnerId = async (req, res) => {
     const reviewsToGetByOwnerId = {
          productOwnerId: req.params.ownerId,
          ...req.body,
     }
     const reviews = await reviewModel.getAllReviewsByOwnerId(reviewsToGetByOwnerId);
     res.status(201).json(reviews)
};

const getAllReviewsByUserReviewerId = async (req, res) => {
     const reviewsToGetByUserReviewerId = {
          userReviewerId: req.params.reviewerId,
          ...req.body,
     }
     const reviews = await reviewModel.getAllReviewsByUserReviewerId(reviewsToGetByUserReviewerId);
     res.status(201).json(reviews)
};

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
     getAllReviewsByOwnerId,
     getAllReviewsByUserReviewerId,
     getAllReviewsByProductId,
    
} 



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
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required.'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({checkFalsy: true, max: 5, min: 1})
      .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
]

// get reviews made by current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviewList = await Review.findAll({ where: { userId } });
  const Reviews = [];
  for (let i = 0; i < reviewList.length; i++) {
    let review = reviewList[i];
    let user = await review.getUser({ attributes: { exclude: ["username"] }, });
    let spot = await review.getSpot({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    spot = spot.toJSON();
    let previewImage = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
    });
    spot.previewImage = previewImage ? previewImage.toJSON().url : null;
    let reviewImages = await review.getReviewImages({
      attributes: { exclude: ["reviewId", "createdAt", "updatedAt"] },
    });
    const ReviewImages = [];
    for (let i = 0; i < reviewImages.length; i++) {
      let image = reviewImages[i];
      image = image.toJSON();
      ReviewImages.push(image);
    }
    review = review.toJSON();
    review.User = user.toJSON();
    review.Spot = spot;
    review.ReviewImages = ReviewImages;
    Reviews.push(review);
  }

  return res.json({ Reviews });


})
// add an image based on review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const reviewId = split[split.length - 2];
    const review = await Review.findByPk(reviewId)
    if(!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        next(err)
    }
    const images = await ReviewImage.findAll({
        where: {reviewId: reviewId}
    })
    if(images.length >= 9) {
        const err = new Error("Maximum number of images for this resource was reached")
        err.status = 403
        next(err)
    }
    const { url } = req.body;
    const reviewImage = await ReviewImage.create({reviewId, url})
    return res.json(reviewImage);
})

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const split = req.url.split('/')
    const reviewId = split[split.length - 1];
    const { review, stars } = req.body;
    const rev = await Review.findByPk(reviewId);
    if(!rev){
        const err = new Error("Review couldn't be found")
        err.status = 404
        next(err)
    }
    rev.set({review, stars});
    rev.save();
    return res.json(rev)
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const reviewId = split[split.length - 1];
    const review = await Review.findByPk(reviewId);
    if(!review){
        const err = new Error("Review couldn't be found")
        err.status = 404
        next(err)
    }
    await review.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})

module.exports = router;

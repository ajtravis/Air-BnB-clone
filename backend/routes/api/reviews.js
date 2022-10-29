const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

// get reviews made by current user
router.get('/current', async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        where: {userId: user.id}
    });
    res.json(reviews)
})

router.post('/:reviewId/images', async (req, res) => {
    const split = req.url.split('/')
    const reviewId = split[split.length - 2];
    const { url } = req.body;
    const reviewImage = await ReviewImage.create({reviewId, url})
    return res.json(reviewImage);
})

module.exports = router;

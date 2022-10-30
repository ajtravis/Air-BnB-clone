const express = require('express')


const { User, Spot, SpotImage, Review, ReviewImage} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

// delete review image by id
router.delete('/:imageId', async (req, res) => {
    const split = req.url.split('/')
    const imageId = split[split.length - 1];
    const reviewImage = await ReviewImage.findByPk(imageId);
    await reviewImage.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})


module.exports = router;

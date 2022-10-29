const express = require('express')


const { User, Spot, SpotImage, Review, ReviewImage} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

router.delete('/:imageId', async (req, res) => {
    const split = req.url.split('/')
    const imageId = split[split.length - 1];
    const spotImage = await SpotImage.findByPk(imageId);
    await spotImage.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router;

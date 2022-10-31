const express = require('express')


const { User, Spot, SpotImage, Review, ReviewImage} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

router.delete('/:imageId', async (req, res, next) => {
    const split = req.url.split('/')
    const imageId = split[split.length - 1];
    const spotImage = await SpotImage.findByPk(imageId);
    if(!spotImage){
      const err = new Error("Spot Image couldn't be found")
      err.status = 404
      next(err)
  }
    await spotImage.destroy();
    res.message = "Successfully deleted";
    res.status = 200;
    return res.json({
        "message": res.message,
        "statusCode": res.status
      })
})

module.exports = router;

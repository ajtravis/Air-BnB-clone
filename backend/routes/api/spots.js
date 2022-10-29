const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

// get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    return res.json(spots)
});

// get spots for current user
router.get('/current', async (req, res) => {
    restoreUser;
    const { user } = req;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })
    return res.json(spots)
});

// get spot details by id
router.get('/:spotId', async (req, res) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findByPk(spotId);
    return res.json(spot)
})

// create a spot
router.post('/', async (req, res) => {
   restoreUser;
   const { user } = req;
   const { address, city, state, country, lat, lng, name, description, price } = req.body;
   const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price })

    return res.json(spot)
})

// add spot image
router.post('/:spotId/images', async (req, res) => {
    const split = req.url.split('/')
    const id = split[split.length - 2];
    const { url, preview } = req.body;
    const image = await SpotImage.create({spotId: id, url, preview})
    return res.json(image)
})

// edit a spot
router.put('/:spotId', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findOne(
        {
            where: {id: spotId}
        }
    );
    spot.set({ address, city, state, country, lat, lng, name, description, price })
    await spot.save();
    return res.json(spot)
})

// delete a spot
router.delete('/:spotId', async (req, res) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findByPk(spotId);
    await spot.destroy();
    res.message = "successfully deleted";
    res.statusCode = 200;
    console.log(res.body)
    return res.json(
        {
        "message": "Successfully deleted",
        "statusCode": 200
      }
      )
});

// get reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 2];
    const reviews = await Review.findAll({
        where: {spotId: spotId}
    })
    return res.json(reviews)
})

// create a review based on spot id
router.post('/:spotId/reviews', async (req, res) => {
    const { review, stars } = req.body
    const { user } = req;
    const split = req.url.split('/')
    const spotId = split[split.length - 2];
    const newReview = await Review.create({userId: user.id, spotId: spotId, review, stars})
    return res.json(newReview)
})



module.exports = router;

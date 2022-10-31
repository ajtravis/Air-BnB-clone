const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required.'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required.'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required.'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required.'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid.'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid.'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage('Name must be less than 50 characters.'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required.'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required.'),
    handleValidationErrors
];

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
router.get('/:spotId', async (req, res, next) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    } else{return res.json(spot)}


})

// create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
   const { user } = req;
   const { address, city, state, country, lat, lng, name, description, price } = req.body;


   const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price })

   res.statusCode = 201;
   return res.json(spot)
})

// add spot image
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const id = split[split.length - 2];

    const { user } = req.body;

    const spot = await Spot.findByPk(id);
    if(!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }


    const { url, preview } = req.body;
    const image = await SpotImage.create({spotId: id, url, preview})

    return res.json({
        "id": image.id,
        "url": image.url,
        "preview": image.preview
      })
})

// edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
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
router.delete('/:spotId', requireAuth, async (req, res) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findByPk(spotId);
    await spot.destroy();
    res.message = "successfully deleted";
    res.status = 200;
    return res.json({
        "message": res.message,
        "statusCode": res.status
    })
});

// get reviews by a spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 2];

    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }

    const reviews = await Review.findAll({
        where: {spotId: spotId}
    })
    return res.json(reviews)
})

// create a review based on spot id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body
    const { user } = req;
    const split = req.url.split('/')
    const spotId = split[split.length - 2];
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
    const reviews = await Review.findAll({
        where:{spotId: spotId, userId: user.id}
    })
    if(reviews) {
        const err = new Error("User already has a review for this spot")
        err.status = 403
        next(err)
    }
    const newReview = await Review.create({userId: user.id, spotId: spotId, review, stars})
    return res.json(newReview)
})

// get bookings based on spot id
router.get('/:spotId/bookings', async (req, res) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 2];
    const { user } = req;
    const bookings = await Booking.findAll({
        where: {spotId: spotId}
    })
    return res.json(bookings)
})

// create booking based on spot id
router.post('/:spotId/bookings', async (req, res) => {
    const split = req.url.split('/');
    const spotId = split[split.length - 2];
    const { startDate, endDate } = req.body;
    const { user } = req;
    const newBooking = await Booking.create({
        spotId: spotId,
        userId: user.id,
        startDate,
        endDate
    })
    return res.json(newBooking)
})

module.exports = router;

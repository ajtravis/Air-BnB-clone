const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking, ReviewImage, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
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

const validateFilters = [
    query('page')
    .isInt({ min: 0, max: 10 })
    .withMessage('Page must be greater than or equal to 1'),
  query('size')
    .isInt({ min: 0, max: 10 })
    .withMessage('Size must be greater than or equal to 1'),
  query('minLat')
    .optional()
    .isDecimal({ min: -90, max: 90 })
    .withMessage('Maximum/minimum latitude is invalid'),
  query('minLng')
    .optional()
    .isDecimal({ min: -180, max: 180 })
    .withMessage('Maximum/minimum longitude is invalid'),
  query('minPrice')
    .optional()
    .isDecimal({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  query('maxPrice')
    .optional()
    .isDecimal({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
handleValidationErrors
]

// get all spots
router.get('/', validateFilters, async (req, res) => {

  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (isNaN(page)) page = 1;
  if (isNaN(size)) size = 20;

  let where = {}

   if(minLat) where.lat = {[Op.gte]: parseFloat(minLat)}
   if(maxLat) where.lat = {[Op.lte]: parseFloat(maxLat)}
   if(minLng) where.lng = {[Op.gte]: parseFloat(minLng)}
   if(maxLng) where.lng = {[Op.lte]: parseFloat(maxLng)}
   if(minPrice) where.price = {[Op.gte]: parseFloat(minPrice)}
   if(maxPrice) where.price = {[Op.lte]: parseFloat(maxPrice)}

  let pagination = {};
  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const spotList = []
  const spots = await Spot.findAll({
    where,
    ...pagination
  })
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i]
    const averageRating = await spot.getReviews({
      attributes:
        [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]], raw: true, nest: true
    })
    const image = await spot.getSpotImages({where: {preview: true}, attributes: ["url"], raw: true, nest: true })

    let previewImg
    if(image.length > 0){
       previewImg = image[0].url
    } else previewImg = ""

    const spotDetails = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: averageRating[0].avgStarRating,
      previewImage: previewImg
    }

    spotList.push(spotDetails)
  }

  res.json({Spots: spotList, page, size })
});

// get spots for current user
router.get('/current', async (req, res) => {
    restoreUser;
    const { user } = req;
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                "avgRating"
                ],
                [sequelize.col("SpotImages.url"), 'previewImage']
            ],
        },
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: SpotImage,
            attributes: []
        }
    ],
        where: {
            ownerId: user.id
        },
        group: 'Spot.id'
    })
    const result = {"Spots": spots}
    return res.json(result)
});

// get spot details by id
router.get('/:spotId', async (req, res, next) => {

    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId,
        {
            attributes: {
                include: [
                    [
                        sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                    ],
                    [
                        sequelize.fn('count', sequelize.col("Reviews.id")),
                    "numReviews"
                    ],
                ],
            },
            include: [{
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: 'Owner'
            }
        ],
        group: 'Spot.id'
        });

        // const cnt = await Review.count({
        //     where: {
        //         spotId: spot.id
        //     }
        // })

    if(!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    } else{
        return res.json(spot)
    }


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
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findOne(
        {
            where: {id: spotId}
        }
    );
    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
    spot.set({ address, city, state, country, lat, lng, name, description, price })
    await spot.save();
    return res.json(spot)
})

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 1];
    const spot = await Spot.findByPk(spotId);
    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
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
        where: {spotId: spotId},
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        },
        ]
    })
    return res.json({Reviews: reviews})
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
    const reviews = await Review.findOne({
        where:{spotId: spotId, userId: user.id}
    })
    if(reviews) {
        const err = new Error("User already has a review for this spot")
        err.status = 403
        return next(err)
    }
    const newReview = await Review.create({userId: user.id, spotId: spotId, review, stars})
    return res.json(newReview)

})

// get bookings based on spot id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const spotId = split[split.length - 2];
    const { user } = req;
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
    if(spot.ownerId !== user.id){
        const bookings = await Booking.findAll({
            where: {spotId: spotId},
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({"Bookings": bookings})
    }else {
        const bookings = await Booking.findAll({
            where: {spotId: spotId},
            include: {model: User}
    })
    return res.json({"Bookings": bookings})}
})

// create booking based on spot id
router.post('/:spotId/bookings', requireAuth,  async (req, res, next) => {
    const split = req.url.split('/');
    const spotId = split[split.length - 2];
    const { startDate, endDate } = req.body;
    const { user } = req;

    const start = new Date(startDate)
    const end = new Date(endDate)

    if(start >= end) {
        const err = new Error("endDate cannot be on or before startDate")
        err.status = 400;
        next(err)
    }
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }

    const bookings = await Booking.findAll({
        attributes: ["startDate", "endDate"],
      });
      for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];

        let { startDate, endDate } = booking;
        startDate = new Date(startDate.toDateString()).getTime();
        endDate = new Date(endDate.toDateString()).getTime();

        if (start >= startDate && start <= endDate) {
          const err = new Error(
            "Sorry, this spot is already booked for the specified dates"
          );
          err.title = " Booking conflict";
          err.errors = ["Start date conflicts with an existing booking"];
          err.status = 403;
          return next(err);
        }

        if (end >= startDate && end <= endDate) {
          const err = new Error(
            "Sorry, this spot is already booked for the specified dates"
          );
          err.title = " Booking conflict";
          err.errors = ["End date conflicts with an existing booking"];
          err.status = 403;
          return next(err);
        }
      }

    const newBooking = await Booking.create({
        spotId: spotId,
        userId: user.id,
        startDate,
        endDate
    })
    return res.json({
        newBooking
})
})

module.exports = router;

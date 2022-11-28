const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

// get bookings of current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
  const bookings = await Booking.findAll({ where: { userId } });
  const Bookings = [];
  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    let spot = await booking.getSpot({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (spot) {
      spot = spot.toJSON();
      let previewImage = await SpotImage.findOne({
        where: { preview: true, spotId: spot.id },
      });
      spot.previewImage = previewImage ? previewImage.toJSON().url : null;
      booking = booking.toJSON();
      booking.Spot = spot;
      Bookings.push(booking);
    } else {
      Bookings.push(booking);
    }
  }
  return res.json({ Bookings });
})

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const bookingId = split[split.length - 1];
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(bookingId);
    if(!booking){
        const err = new Error("Booking couldn't be found")
        err.status = 404;
        next(err)
    }
    booking.set({startDate, endDate})
    booking.save();
    return res.json(booking)
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const split = req.url.split('/')
    const bookingId = split[split.length - 1];
    const booking = await Booking.findByPk(bookingId);
    if(!booking){
        const err = new Error("Booking couldn't be found")
        err.status = 404;
        next(err)
    }
    await booking.destroy();
    res.message = "successfully deleted";
    res.status = 200;
    return res.json({
        "message": res.message,
        "statusCode": res.status
    })
})

module.exports = router;

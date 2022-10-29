const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

// get bookings of current user
router.get('/current', async (req, res) => {
    const { user } = req;
    const bookings = await Booking.findAll({
        where: {userId: user.id}
    })
    return res.json(bookings)
})


module.exports = router;

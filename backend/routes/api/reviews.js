const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review } = require('../../db/models');
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



module.exports = router;

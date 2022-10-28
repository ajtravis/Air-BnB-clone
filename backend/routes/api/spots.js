const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
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

// create a spot
router.post('/', async (req, res) => {
   restoreUser;
   const { user } = req;
   const { address, city, state, country, lat, lng, name, description, price } = req.body;
   const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price })

    return res.json(spot)
})

module.exports = router;

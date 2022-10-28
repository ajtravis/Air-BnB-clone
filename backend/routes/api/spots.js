const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    return res.json(spots)
});

router.get('/current', async (req, res) => {
    
})

module.exports = router;

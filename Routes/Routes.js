const express = require('express');
const restaurantController = require('../Controllers/Restaurants');

const router = express.Router();

router.post('/filterRestaurants', restaurantController.filterRestaurants);

module.exports = router;  
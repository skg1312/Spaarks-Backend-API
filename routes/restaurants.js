const express = require('express');
const {
  getAllRestaurants,
  createRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  getNearbyRestaurants,
  getRestaurantsInRange
} = require('../controllers/restaurantController');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

// Authenticate Middleware to check for User

router.get('/nearby', authenticate, getNearbyRestaurants); // Get nearby restaurants
router.get('/range', authenticate, getRestaurantsInRange); // Get restaurants within a specified range
router.get('/', authenticate, getAllRestaurants); // Get all restaurants
router.post('/', authenticate, createRestaurants); // Create a new restaurant
router.get('/:id', authenticate, getRestaurant); // Get a specific restaurant by ID
router.put('/:id', authenticate, updateRestaurant); // Update a restaurant by ID
router.delete('/:id', authenticate, deleteRestaurant); // Delete a restaurant by ID

module.exports = router;
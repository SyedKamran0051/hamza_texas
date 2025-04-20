const express = require('express');
const router = express.Router();
const { 
  getAllLocations, 
  getLocationById, 
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locationController');

// Get all locations
router.get('/', getAllLocations);

// Get location by ID
router.get('/:id', getLocationById);

// Create new location
router.post('/', createLocation);

// Update location
router.put('/:id', updateLocation);

// Delete location
router.delete('/:id', deleteLocation);

module.exports = router;

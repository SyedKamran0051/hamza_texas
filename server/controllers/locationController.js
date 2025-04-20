const Location = require('../models/Location');

// Get all locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new location
exports.createLocation = async (req, res) => {
  const location = new Location(req.body);
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update location
exports.updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete location
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

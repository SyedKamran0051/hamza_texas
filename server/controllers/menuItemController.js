const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get menu items by category
exports.getMenuItemsByCategory = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ category: req.params.category });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new menu item
exports.createMenuItem = async (req, res) => {
  const menuItem = new MenuItem(req.body);
  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

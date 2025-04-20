const express = require('express');
const router = express.Router();
const { 
  getAllMenuItems, 
  getMenuItemById, 
  getMenuItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuItemController');

// Get all menu items
router.get('/', getAllMenuItems);

// Get menu item by ID
router.get('/:id', getMenuItemById);

// Get menu items by category
router.get('/category/:category', getMenuItemsByCategory);

// Create new menu item
router.post('/', createMenuItem);

// Update menu item
router.put('/:id', updateMenuItem);

// Delete menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;

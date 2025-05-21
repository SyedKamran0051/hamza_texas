const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Temporary in-memory data
const locations = [
  {
    id: 1,
    name: 'Lake Conroe',
    address: '15260 Highway 105 W Suite 116',
    city: 'Montgomery',
    state: 'TX',
    zip: '77356',
    phone: '(936) 588-7070',
    hours: {
      'Monday-Thursday': '11:00 AM - 10:00 PM',
      'Friday-Saturday': '11:00 AM - 11:00 PM',
      'Sunday': '11:00 AM - 9:00 PM'
    }
  }
];

const menuItems = [
  {
    id: 1,
    name: "BYOB",
    price: 9.99,
    description: "Delicious BYOB.",
    category: "other",
    image: "/images/new_food_menu_images/BYOB.png",
    isPopular: false
  },
  {
    id: 2,
    name: "Wings",
    price: 9.99,
    description: "Delicious Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/wings.png",
    isPopular: false
  },
  {
    id: 3,
    name: "BBQ Bird Dog",
    price: 9.99,
    description: "Delicious BBQ Bird Dog.",
    category: "other",
    image: "/images/new_food_menu_images/bbq bird dog.png",
    isPopular: false
  },
  {
    id: 4,
    name: "Baxters Eggs",
    price: 9.99,
    description: "Delicious Baxters Eggs.",
    category: "sides",
    image: "/images/new_food_menu_images/baxters eggs.png",
    isPopular: false
  },
  {
    id: 5,
    name: "Cheese Curds",
    price: 9.99,
    description: "Delicious Cheese Curds.",
    category: "sides",
    image: "/images/new_food_menu_images/cheese-curds.png",
    isPopular: false
  },
  {
    id: 6,
    name: "Naked Wings",
    price: 9.99,
    description: "Delicious Naked Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/naked wings.png",
    isPopular: false
  },
  {
    id: 7,
    name: "Pig Wings",
    price: 9.99,
    description: "Delicious Pig Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/pig wings.png",
    isPopular: false
  },
  {
    id: 8,
    name: "Sausage Dog",
    price: 9.99,
    description: "Delicious Sausage Dog.",
    category: "other",
    image: "/images/new_food_menu_images/sausage dog.png",
    isPopular: false
  },
  {
    id: 9,
    name: "Single Wing",
    price: 9.99,
    description: "Delicious Single Wing.",
    category: "wings",
    image: "/images/new_food_menu_images/single wing.png",
    isPopular: false
  },
  {
    id: 10,
    name: "Onion Rings",
    price: 9.99,
    description: "Delicious Onion Rings.",
    category: "sides",
    image: "/images/new_food_menu_images/onion-rings-copy.png",
    isPopular: false
  },
  {
    id: 11,
    name: "Mushrooms",
    price: 9.99,
    description: "Delicious Mushrooms.",
    category: "sides",
    image: "/images/new_food_menu_images/mushrooms.jpg",
    isPopular: false
  },
  {
    id: 12,
    name: "Craft Chicken",
    price: 9.99,
    description: "Delicious Craft Chicken.",
    category: "wings",
    image: "/images/new_food_menu_images/craft chicken.png",
    isPopular: false
  },
  {
    id: 13,
    name: "Border Taters",
    price: 9.99,
    description: "Delicious Border Taters.",
    category: "sides",
    image: "/images/new_food_menu_images/border taters.png",
    isPopular: false
  },
  {
    id: 14,
    name: "Battered Wings",
    price: 9.99,
    description: "Delicious Battered Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/battered wings.png",
    isPopular: false
  },
  {
    id: 15,
    name: "Onion Strings",
    price: 9.99,
    description: "Delicious Onion Strings.",
    category: "sides",
    image: "/images/new_food_menu_images/onion strings.png",
    isPopular: false
  },
  {
    id: 16,
    name: "Fried Pickles",
    price: 9.99,
    description: "Delicious Fried Pickles.",
    category: "sides",
    image: "/images/new_food_menu_images/fried pickles.jpg",
    isPopular: false
  },
  {
    id: 17,
    name: "Boneless Wings",
    price: 9.99,
    description: "Delicious Boneless Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/boneless wings.png",
    isPopular: false
  },
  {
    id: 18,
    name: "Teriyaki Wings",
    price: 9.99,
    description: "Delicious Teriyaki Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/terryaki wings.png",
    isPopular: false
  },
  {
    id: 19,
    name: "Border Bird Dog",
    price: 9.99,
    description: "Delicious Border Bird Dog.",
    category: "other",
    image: "/images/new_food_menu_images/border bird dog.png",
    isPopular: false
  },
  {
    id: 20,
    name: "Buffalo Taters",
    price: 9.99,
    description: "Delicious Buffalo Taters.",
    category: "sides",
    image: "/images/new_food_menu_images/buffalo taters.png",
    isPopular: false
  },
  {
    id: 21,
    name: "Chicken Tenders",
    price: 9.99,
    description: "Delicious Chicken Tenders.",
    category: "sides",
    image: "/images/new_food_menu_images/chicken tenders.png",
    isPopular: false
  },
  {
    id: 22,
    name: "Piggy Wings",
    price: 9.99,
    description: "Delicious Piggy Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/piggy wings 2.png",
    isPopular: false
  },
  {
    id: 23,
    name: "Fried Jalepenos",
    price: 9.99,
    description: "Delicious Fried Jalepenos.",
    category: "sides",
    image: "/images/new_food_menu_images/fried Jalepenos.png",
    isPopular: false
  },
  {
    id: 24,
    name: "Fried Mushrooms",
    price: 9.99,
    description: "Delicious Fried Mushrooms.",
    category: "sides",
    image: "/images/new_food_menu_images/fried mushrooms.png",
    isPopular: false
  },
  {
    id: 25,
    name: "El Diablo Bird Dog",
    price: 9.99,
    description: "Delicious El Diablo Bird Dog.",
    category: "other",
    image: "/images/new_food_menu_images/el diable bird dog.png",
    isPopular: false
  },
  {
    id: 26,
    name: "Buff Flatbread",
    price: 9.99,
    description: "Delicious Buff Flatbread.",
    category: "other",
    image: "/images/new_food_menu_images/buff flatbread.png",
    isPopular: false
  },
  {
    id: 27,
    name: "BBQ Flatbread",
    price: 9.99,
    description: "Delicious BBQ Flatbread.",
    category: "other",
    image: "/images/new_food_menu_images/bbq flatbread.png",
    isPopular: false
  },
  {
    id: 28,
    name: "Naked Battered Wing",
    price: 9.99,
    description: "Delicious Naked Battered Wing.",
    category: "wings",
    image: "/images/new_food_menu_images/naked battered wing.png",
    isPopular: false
  },
  {
    id: 29,
    name: "Naked Grilled Wings",
    price: 9.99,
    description: "Delicious Naked Grilled Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/naked grilled wings.png",
    isPopular: false
  },
  {
    id: 30,
    name: "Double Fried Wings",
    price: 9.99,
    description: "Delicious Double Fried Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/double fried wings.png",
    isPopular: false
  },
  {
    id: 31,
    name: "Buffalo Bone In Wings",
    price: 9.99,
    description: "Delicious Buffalo Bone In Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/buffalo bone in.png",
    isPopular: false
  },
  {
    id: 32,
    name: "Naked Double Fried",
    price: 9.99,
    description: "Delicious Naked Double Fried.",
    category: "wings",
    image: "/images/new_food_menu_images/naked double fried.png",
    isPopular: false
  },
  {
    id: 33,
    name: "Border Flatbread",
    price: 9.99,
    description: "Delicious Border Flatbread.",
    category: "other",
    image: "/images/new_food_menu_images/border flatbread.png",
    isPopular: false
  },
  {
    id: 34,
    name: "Bacon Cheeseburger",
    price: 9.99,
    description: "Delicious Bacon Cheeseburger.",
    category: "burgers",
    image: "/images/new_food_menu_images/bacon cheeseburger.png",
    isPopular: false
  },
  {
    id: 35,
    name: "Buffalo Bird Dog",
    price: 9.99,
    description: "Delicious Buffalo Bird Dog.",
    category: "other",
    image: "/images/new_food_menu_images/buffalo bird dog 2.png",
    isPopular: false
  },
  {
    id: 36,
    name: "El Jalepeno Special",
    price: 9.99,
    description: "Delicious El Jalepeno Special.",
    category: "other",
    image: "/images/new_food_menu_images/el jalepeno.png",
    isPopular: false
  },
  {
    id: 37,
    name: "BBQ Rodeo Burger",
    price: 9.99,
    description: "Delicious BBQ Rodeo Burger.",
    category: "burgers",
    image: "/images/new_food_menu_images/bbq rodeo Burger.png",
    isPopular: false
  },
  {
    id: 38,
    name: "Naked Boneless Wings",
    price: 9.99,
    description: "Delicious Naked Boneless Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/naked boneless wings.png",
    isPopular: false
  },
  {
    id: 39,
    name: "Special Dish IMG 1732",
    price: 9.99,
    description: "Delicious Special Dish IMG 1732.",
    category: "other",
    image: "/images/new_food_menu_images/IMG_1732 copy.png",
    isPopular: false
  },
  {
    id: 40,
    name: "El Jalepeno Burger",
    price: 9.99,
    description: "Delicious El Jalepeno Burger.",
    category: "burgers",
    image: "/images/new_food_menu_images/el jalepeno burger.png",
    isPopular: false
  },
  {
    id: 41,
    name: "Buffalo Sausage Dog",
    price: 9.99,
    description: "Delicious Buffalo Sausage Dog.",
    category: "other",
    image: "/images/new_food_menu_images/buffalo sausage dog.png",
    isPopular: false
  },
  {
    id: 42,
    name: "Naked Cauliflower Bites",
    price: 9.99,
    description: "Delicious Naked Cauliflower Bites.",
    category: "sides",
    image: "/images/new_food_menu_images/naked cauliflower bites.png",
    isPopular: false
  },
  {
    id: 43,
    name: "Nashville Hot Chicken",
    price: 9.99,
    description: "Delicious Nashville Hot Chicken.",
    category: "wings",
    image: "/images/new_food_menu_images/nashville hot chicken.png",
    isPopular: false
  },
  {
    id: 44,
    name: "Buffalo Cauliflower Bites",
    price: 9.99,
    description: "Delicious Buffalo Cauliflower Bites.",
    category: "sides",
    image: "/images/new_food_menu_images/buffalo cauliflower bites.png",
    isPopular: false
  },
  {
    id: 45,
    name: "Naked Double Fried Wings",
    price: 9.99,
    description: "Delicious Naked Double Fried Wings.",
    category: "wings",
    image: "/images/new_food_menu_images/naked double fried wings.png",
    isPopular: false
  }
];

// Initialize express app
const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from multiple directories
app.use('/images', express.static(path.join(__dirname, '../assets/images')));
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../client/public')));

// API routes
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/api/menu/:id', (req, res) => {
  const item = menuItems.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Menu item not found' });
  res.json(item);
});

app.get('/api/menu/category/:category', (req, res) => {
  const items = menuItems.filter(item => item.category === req.params.category);
  res.json(items);
});

app.get('/api/locations', (req, res) => {
  res.json(locations);
});

app.get('/api/locations/:id', (req, res) => {
  const location = locations.find(loc => loc.id === parseInt(req.params.id));
  if (!location) return res.status(404).json({ message: 'Location not found' });
  res.json(location);
});

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Export the app for Vercel
module.exports = app;

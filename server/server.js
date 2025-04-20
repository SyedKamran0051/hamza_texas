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
  // Wings Category
  {
    id: 1,
    name: 'Traditional Wings',
    description: 'Fresh, never frozen wings tossed in your choice of sauce',
    category: 'wings',
    prices: {
      '6 pc': 13.99,
      '9 pc': 19.99,
      '18 pc': 34.99
    },
    price: 13.99,
    image: '/images/battered-wings-e1694751568381-custom_crop.png',
    isPopular: true
  },
  {
    id: 2,
    name: 'BBQ Wings',
    description: 'Classic wings with our signature BBQ sauce',
    category: 'wings',
    prices: {
      '6 pc': 13.99,
      '9 pc': 19.99,
      '18 pc': 34.99
    },
    price: 13.99,
    image: '/images/chiken_wings_bbq_sauce_3-copy-e1682088042401.png',
    isPopular: true
  },
  {
    id: 3,
    name: 'Double Fried Wings',
    description: 'Extra crispy double-fried wings with your choice of sauce',
    category: 'wings',
    prices: {
      '6 pc': 14.99,
      '9 pc': 21.99,
      '18 pc': 36.99
    },
    price: 14.99,
    image: '/images/double-fried-wings-e1694794972623-custom_crop.png',
    isPopular: true
  },
  {
    id: 4,
    name: 'Thai Chili Wings',
    description: 'Grilled wings tossed in sweet Thai chili sauce',
    category: 'wings',
    prices: {
      '6 pc': 13.99,
      '9 pc': 19.99,
      '18 pc': 34.99
    },
    price: 13.99,
    image: '/images/thai-chili-grilled-wing-single-custom_crop.png',
    isPopular: false
  },
  {
    id: 5,
    name: 'Buffalo Wings',
    description: 'Crispy wings tossed in buffalo sauce',
    category: 'wings',
    prices: {
      '6 pc': 14.99,
      '9 pc': 21.99,
      '18 pc': 36.99
    },
    price: 14.99,
    image: '/images/hot-wings-isolated-white-copy-custom_crop.png',
    isPopular: false
  },
  {
    id: 6,
    name: 'Boneless Wings',
    description: 'Hand-breaded boneless wings with your choice of sauce',
    category: 'wings',
    prices: {
      '6 pc': 12.99,
      '9 pc': 18.99,
      '18 pc': 31.99
    },
    price: 12.99,
    image: '/images/battered-buffalo-sauce-above-e1694794879661-custom_crop.png',
    isPopular: true
  },
  {
    id: 7,
    name: 'Pig Wings',
    description: 'Tender pork wings with your choice of sauce',
    category: 'wings',
    prices: {
      '6 pc': 14.99,
      '9 pc': 21.99,
      '18 pc': 36.99
    },
    price: 14.99,
    image: '/images/Pig-wings-custom_crop.png',
    isPopular: false
  },
  {
    id: 8,
    name: 'Chicken Tenders',
    description: 'Fresh, hand-breaded chicken tenders served with your choice of sauce',
    category: 'wings',
    prices: {
      '6 pc': 11.99,
      '9 pc': 17.99,
      '18 pc': 30.99
    },
    price: 11.99,
    image: '/images/chicken-tenders-copy-e1694794894123-custom_crop.png',
    isPopular: false
  },

  // Burgers Category
  {
    id: 9,
    name: 'Classic Bacon Cheeseburger',
    description: 'Fresh beef patty with crispy bacon, cheddar cheese, lettuce, and tomato',
    category: 'burgers',
    prices: {
      'Single': 12.99,
      'Double': 15.99
    },
    price: 12.99,
    image: '/images/bacon-cheeseburger-e1694709498252-custom_crop.png',
    isPopular: true
  },
  {
    id: 10,
    name: 'Craft Chicken Sandwich',
    description: 'Hand-breaded chicken breast with lettuce, tomato, and mayo',
    category: 'burgers',
    prices: {
      'Regular': 11.99,
      'Spicy': 12.99
    },
    price: 11.99,
    image: '/images/craft-chicken-e1694709518839-custom_crop.png',
    isPopular: false
  },
  {
    id: 11,
    name: 'Buffalo Dirty Bird',
    description: 'Crispy chicken sandwich tossed in buffalo sauce',
    category: 'burgers',
    price: 12.99,
    image: '/images/buffalo-dirty-bird-side-view-e1694794842910-custom_crop.png',
    isPopular: false
  },
  {
    id: 12,
    name: 'El Diablo Dirty Bird',
    description: 'Extra spicy chicken sandwich with jalapeños',
    category: 'burgers',
    price: 13.99,
    image: '/images/el-diablo-dirty-bird-above-custom_crop.png',
    isPopular: false
  },
  {
    id: 13,
    name: 'Jalapeño Burger',
    description: 'Spicy burger topped with fresh jalapeños and pepper jack cheese',
    category: 'burgers',
    prices: {
      'Single': 12.99,
      'Double': 15.99
    },
    price: 12.99,
    image: '/images/el-jalepeno-e1694186986476-custom_crop.png',
    isPopular: false
  },
  {
    id: 14,
    name: 'Border Dirty Dog',
    description: 'Premium hot dog loaded with toppings',
    category: 'burgers',
    price: 8.99,
    image: '/images/Border-dirty-dog-above-custom_crop.png',
    isPopular: false
  },
  {
    id: 15,
    name: 'Sausage Dog',
    description: 'Grilled sausage with sautéed onions and peppers',
    category: 'burgers',
    price: 9.99,
    image: '/images/Sausage-dog-custom_crop.png',
    isPopular: false
  },

  // Sides Category
  {
    id: 16,
    name: 'Buffalo Loaded Fries',
    description: 'Crispy fries topped with buffalo sauce and cheese',
    category: 'sides',
    price: 8.99,
    image: '/images/buffalo-loaded-fries-custom_crop.png',
    isPopular: false
  },
  {
    id: 17,
    name: 'Cheese Curds',
    description: 'Wisconsin white cheddar cheese curds, lightly breaded',
    category: 'sides',
    price: 7.99,
    image: '/images/cheese-curds-custom_crop.png',
    isPopular: false
  },
  {
    id: 18,
    name: 'Onion Rings',
    description: 'Crispy battered onion rings served with your choice of sauce',
    category: 'sides',
    price: 6.99,
    image: '/images/onion-rings-copy-e1694794957291-custom_crop.png',
    isPopular: false
  },
  {
    id: 19,
    name: 'Border Taters',
    description: 'Seasoned potato wedges served with ranch dressing',
    category: 'sides',
    price: 7.99,
    image: '/images/border-taters-e1694750825414-custom_crop.png',
    isPopular: false
  },
  {
    id: 20,
    name: 'Buffalo Cauliflower',
    description: 'Crispy cauliflower florets tossed in buffalo sauce',
    category: 'sides',
    price: 8.99,
    image: '/images/buffalo-cauliflower-sauced-above-e1694794866420-custom_crop.png',
    isPopular: false
  },
  {
    id: 21,
    name: 'Baxters Deviled Eggs',
    description: 'Classic deviled eggs with a spicy twist',
    category: 'sides',
    price: 6.99,
    image: '/images/baxters-deviled-eggs-above-e1694794915175-custom_crop.png',
    isPopular: false
  },
  {
    id: 22,
    name: 'Border Flatbread',
    description: 'Fresh flatbread topped with your choice of ingredients',
    category: 'sides',
    price: 9.99,
    image: '/images/border-flatbread-e1694750858465-custom_crop.png',
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const seedProducts = [
  {
    name: 'iPhone 14',
    description: 'Latest Apple smartphone with A15 Bionic chip.',
    price: 120000,
    stock: 25,
  },
  {
    name: 'Samsung Galaxy S22',
    description: 'Samsung flagship with 120Hz AMOLED display.',
    price: 80000,
    stock: 30,
  },
  {
    name: 'OnePlus Nord CE',
    description: 'Midrange killer with fast charging.',
    price: 30000,
    stock: 50,
  },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    process.exit();
  })
  .catch(err => console.error(err));

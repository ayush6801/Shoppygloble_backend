const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const authMiddleware = require('./middleware/auth');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', authMiddleware, cartRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

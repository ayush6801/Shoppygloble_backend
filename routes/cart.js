const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Get cart for logged-in user
router.get('/', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  res.json(cart || { items: [] });
});

// Add to cart
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const existing = cart.items.find(item => item.productId.equals(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Update quantity
router.put('/:productId', async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });
  const item = cart?.items.find(i => i.productId.equals(req.params.productId));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

// Remove item
router.delete('/:productId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter(i => !i.productId.equals(req.params.productId));
  await cart.save();
  res.json(cart);
});

module.exports = router;

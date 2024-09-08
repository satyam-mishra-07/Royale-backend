const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart-controller.js"); // Adjust the path if needed

// Route to add item to cart
router.post("/add-to-cart", addToCart);

// Route to remove item from cart
router.post("/remove-from-cart", removeFromCart);
router.delete("/clear-cart", clearCart);


module.exports = router;

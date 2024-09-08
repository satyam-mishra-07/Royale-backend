const express = require("express");
const router = express.Router();
const User = require("../models/user-models");
const Menu = require('../models/menu-models'); // Use the Menu model

// Add item to cart
const addToCart = async (req, res) => {
  const { userId, foodId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure cart is a Map
    if (!user.cart || !(user.cart instanceof Map)) {
      user.cart = new Map();
    } else {
      user.cart = new Map(Object.entries(user.cart)); // Convert plain object to Map if necessary
    }

    // Update the cart object
    if (user.cart.has(foodId)) {
      user.cart.set(foodId, user.cart.get(foodId) + 1); // Increment quantity
    } else {
      user.cart.set(foodId, 1); // Add item with quantity 1
    }

    console.log('Updated cart:', Array.from(user.cart.entries()));

    // Convert Map to plain object before saving
    user.cart = Object.fromEntries(user.cart);

    // Save the user document
    await user.save();

    // Send the updated cart back in the response
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, foodId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure cart is a Map
    if (user.cart && user.cart instanceof Map) {
      user.cart = new Map(Object.entries(user.cart)); // Convert plain object to Map if necessary
    } else {
      user.cart = new Map();
    }

    // Update the cart object
    if (user.cart.has(foodId)) {
      if (user.cart.get(foodId) > 1) {
        user.cart.set(foodId, user.cart.get(foodId) - 1); // Decrement quantity
      } else {
        user.cart.delete(foodId); // Remove item if quantity is 1
      }
    }

    console.log('Updated cart:', Array.from(user.cart.entries()));

    // Convert Map to plain object before saving
    user.cart = Object.fromEntries(user.cart);

    // Save the user document
    await user.save();

    // Send the updated cart back in the response
    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const clearCart = async (req, res) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.cart.clear(); 

    await user.save();

    res.status(200).json({ message: "Cart cleared", cart: user.cart });

  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart:", error });
  }
}


module.exports = { addToCart, removeFromCart, clearCart };

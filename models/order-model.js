const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  cart: {
    type: Map,
    of: Number,
    default: {},
  },
  paymentType: {
    type: String,
    require: true,
  },
  payment: {
    type: Boolean,
    require: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

const Order = require("../models/order-model");
const User = require("../models/user-models");
const generateUniqueId = require("generate-unique-id");

const order = async (req, res) => {
  try {
    const { userId, cart, paymentType, payment } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderId = generateUniqueId({
      length: 11,
    });

    Order.create({
      orderId,
      userId,
      cart,
      paymentType,
      payment
    });

    res.status(201).json({
      message: "Order Placed Succesfully",
      orderID: orderId,
    });
  } catch (error) {
    res.status(404).json(`Internal Server error: ${err}`);
  }
};

const orderHistory = async (req, res) => {  
  try {
    const { userID } = req.query;

    const response = await Order.find(
      { userId: userID },
      { _id: 0, __v: 0 }
    );

    console.log('Backend response:', response);  // Log the response

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }
}


module.exports = { order, orderHistory };

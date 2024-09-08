const User = require("../models/user-models");
const Contact = require("../models/contact-model");
const Order = require("../models/order-model");

const getAllUsers = async (req, res, next) => {
  try {
    const response = await User.find({}, { password: 0, __v: 0 });

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(response);
    if (req.admin) {
      res.status(201).json({ message: response });
    } else {
      res
        .status(401)
        .json({ message: "You are Unauthorized to access this page" });
    }
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const response = await Contact.find({}, { __v: 0 });

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No issues Found" });
    }

    console.log(response);
    if (req.admin) {
      res.status(201).json({ message: response });
    } else {
      res
        .status(401)
        .json({ message: "You are Unauthorized to access this page" });
    }
  } catch (error) {
    next(error);
  }
};

deleteUser = async (req, res, next) => {
  try {
    const response = await User.deleteOne({ _id: req.params.id });

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

deleteIssue = async (req, res, next) => {
  try {
    console.log("jere");
    const response = await Contact.deleteOne({ _id: req.params.id });

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

getUser = async (req, res, next) => {
  try {
    const response = await User.findOne(
      { _id: req.params.id },
      { password: 0, __v: 0 }
    );

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
};

updateUserByID = async (req, res, next) => {
  try {
    const updatedUserData = req.body;
    const response = await User.updateOne(
      { _id: req.params.id },
      { $set: updatedUserData }
    );

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
};

getAllOrder = async (req, res, next) => {
  try {
    const response = await Order.find({}, { _id: 0, __v: 0 });

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    if (req.admin) {
      res.status(201).json({ message: response });
    } else {
      res
        .status(401)
        .json({ message: "You are Unauthorized to access this page" });
    }
  } catch (error) {
    next(error);
  }
};

getOrder = async (req, res, next) => {
  try {
    const response = await Order.findOne({orderID: req.params.orderID}, { _id: 0, __v: 0 });

    if (!response) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
    try {
      const updatedOrderData = req.body;
      
      const response = await Order.updateOne(
        { orderId: req.params.orderId },
        { $set: updatedOrderData }
      );
  
      if (!response) {
        return res.status(404).json({ message: "Order not found or not updated" });
      }
  
      res.status(201).json({ message: "Order updated successfully", order: response });
    } catch (error) {
      next(error); // Pass the error to the next middleware or error handler
    }
  };
  

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUser,
  deleteIssue,
  getUser,
  updateUserByID,
  getAllOrder,
  getOrder,
  updateOrder
};

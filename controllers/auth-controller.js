const { default: mongoose } = require("mongoose");
const User = require("../models/user-models");
const bcrypt = require("bcryptjs");

//* User Logic
//* To send user Data

const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({userData})
  } catch (err) {
    res.status(404).send(`Error 404: ${err}`);
  }
};

//* Register page Logic

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, phone, address , password, isAdmin } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "This email is already registered with us" });
    }

    const userCreated = await User.create({
      name,
      email,
      phone,
      address,
      password,
      isAdmin,
    });

    res.status(201).json({
      message: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (err) {
    res.status(404).json(`Internal Server error: ${err}`);
  }
};

//* Login Page Logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const userValid = await bcrypt.compare(password, userExist.password);

    if (userValid) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(404).json(`Internal Server Error: ${error}`);
  }
};

//* Update Page Logic

const update = async (req, res) => {
  try {
    const { _id, name, email, phone, address } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userExist = await User.findById(_id);

    if (!userExist) {
      return res.status(400).json({ message: "No such user exists" });
    }

    const userUpdated = await User.updateOne({ _id: _id }, {
      $set: {
        name,
        email,
        phone,
        address,
      }
    },);

  console.log(userUpdated);
  console.log(userUpdated.modifiedCount);

    if (userUpdated.modifiedCount > 0) {
      res.status(201).json({
        message: "Update Successful",
      });
    } else {
      res.status(400).json({
        message: "No changes were made",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





module.exports = {register, login, update, user };

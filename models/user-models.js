const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: { type: Map, of: Number, default: {} }
});

//? secure the password with the bcrypt
userSchema.pre("save", async function (next) {
  // console.log(this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        phone: this.phone,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SIGNATURE,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error(error);
  }
};

userSchema.methods.passwordCompare = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
};

//? define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;

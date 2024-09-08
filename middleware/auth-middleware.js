const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    // If you attempt to use an expired token, you'll recieve "401 unathoized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>", removing the "Bearer" prefix
  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SIGNATURE);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);
    // In Express.js (request) object that contains information about the HTTP request. By adding custom properties to req, you can pass information between middleware function or make it available in your route handlers
    req.user = userData;
    req.admin = userData.isAdmin;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }
};

module.exports = authMiddleware;

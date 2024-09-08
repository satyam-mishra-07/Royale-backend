const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Admin Access Denied" });
    }
    next();
    // return res.status(200).json({message: "Admin Access Granted"});
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }
};

module.exports = adminMiddleware;

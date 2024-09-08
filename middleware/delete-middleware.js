const deleteMiddleware = (req, res, next) => {
  try {
    console.log(req.user._id);
    console.log(req.params.id);
    if(req.user._id == req.params.id) {
      return res.status(401).json({message: "You cannot delete yourself"});
    }else {
      next();
    }
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = deleteMiddleware;
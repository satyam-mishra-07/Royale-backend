const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
  
    return res.status(status).json({ message });
  };
  
  module.exports = errorMiddleware;
  
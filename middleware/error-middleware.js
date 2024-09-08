const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    // const extraDetails = err.extraDetails || "Error From Backend";

    return res.status(status).json({message})

    // Now we just need to call the next middleWare anyware an error is caught and pass the error to it
};

module.exports = errorMiddleware;
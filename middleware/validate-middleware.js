const validate = (Schema) => async (req, res, next) => {
  try {
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody;
    return next();
  } catch (err) {
    console.log(err);
    const status = 404;
    const message = err.errors[0].message;

    const error = { status, message };

    next(error);
    // res.status(400).json({ message: message });
  }
};

module.exports = validate;

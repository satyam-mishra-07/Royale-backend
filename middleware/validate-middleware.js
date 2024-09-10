const validate = (Schema) => async (req, res, next) => {
  try {
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    console.log(err);
    // Use status 400 for validation errors
    const status = 400;
    const message = err.errors.map(error => error.message).join(', '); // Combine all error messages if there are multiple

    const error = { status, message };
    next(error); // Pass the error to the error middleware
  }
};

module.exports = validate;

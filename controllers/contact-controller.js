const Contact = require("../models/contact-model");

const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({ message: "Issue Submitted Successfully" });
  } catch (error) {
    res.status(404).json({ message: `Internal Server Error ${error}` });
  }
};

module.exports = contact;

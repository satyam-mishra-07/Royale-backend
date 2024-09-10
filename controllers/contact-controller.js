const Contact = require("../models/contact-model");
const Reservation = require("../models/reservation-model");

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

const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
    });

    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation' });
  }
};

module.exports = {contact, createReservation};

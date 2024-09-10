const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contact-controller");
const {contactSchema, reservationSchema} = require("../validators/contact-validator");
const validate = require("../middleware/validate-middleware");

router.route("/contact").post(validate(contactSchema), contactControllers.contact);
router.route("/reservation").post(validate(reservationSchema), contactControllers.createReservation);

module.exports = router;
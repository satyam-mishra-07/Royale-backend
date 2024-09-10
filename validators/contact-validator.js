const { z } = require("zod");

// Define the Zod schema for contact form validation
const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(500, { message: "Message cannot exceed 500 characters." })
});

// schemas/reservationSchema.js

const { z } = require('zod');

const reservationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  time: z.string().min(1, { message: "Time is required" }),
  guests: z.number().min(1, { message: "At least one guest is required" }),
});


module.exports = {contactSchema, reservationSchema};

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

module.exports = reservationSchema;

const { z } = require("zod");

// Creating an Object Schema
const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast of 10 characters" })
    .max(12, { message: "Phone must not be more than 12 characters" }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(3, { message: "Address must be atleast of 3 characters" })
    .max(255, { message: "Address must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be atleast of 8 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z.string({ required_error: "Password is required" }),
});

module.exports = { signupSchema, signinSchema };

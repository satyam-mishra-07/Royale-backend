require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require('./utils/db');
const auth = require('./routers/authRoute');
const menu = require('./routers/menuRoute');
const cart = require('./routers/cartRoute');
const order = require('./routers/orderRoute');
const admin = require('./routers/adminRoute');
const contact = require('./routers/contactRoute');
const cors = require('cors');
const errorMiddleware = require('./middleware/error-middleware');

const allowedOrigins = [
  "https://royale-nine.vercel.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request if the origin is in the allowed list
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request otherwise
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};

// Use the correct CORS options
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', auth);
app.use("/api/data", menu);
app.use("/api/form", contact);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/admin", admin);
app.use(errorMiddleware);

const PORT = 3000;


const uri = process.env.MONGODB_URI;

connectDB(uri).then(() => {
  app.listen(PORT, () => {
    console.log("Connected to Database, running on port ", PORT);
  });
});

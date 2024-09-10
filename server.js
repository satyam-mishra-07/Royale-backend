require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require('./utils/db');
const auth = require('./routers/authRoute');
const menu = require('./routers/menuRoute');
const cart = require('./routers/cartRoute');
const order = require('./routers/orderRoute')
const admin = require('./routers/adminRoute');
const contact = require('./routers/contactRoute');
const cors = require('cors');

const corsOption = {
  origin: "https://royale-nine.vercel.app/",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}

app.use(cors(corsOption));
app.use(express.json());
app.use('/api/auth', auth);
app.use("/api/data", menu);
app.use("/api/form", contact);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/admin", admin);

const PORT = 3000;

const uri = process.env.MONGODB_URI;

connectDB(uri).then(() => {
  app.listen(PORT, () => {
    console.log("Connected to Database, running on port ", PORT);
  });
});

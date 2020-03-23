const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

//Connect DataBase
connectDB();

//Cors Configuration
app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));

//Routes
app.use(express.static("uploads"));
app.use("/cards", require("./routes/cards"));

//PORT
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log("Listening at", PORT));

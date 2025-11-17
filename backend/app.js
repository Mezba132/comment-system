const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./Routes/Auth");
const userRoutes = require("./Routes/User");

const app = express();

mongoose
  .connect(process.env.DB, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Database is connected successfully"))
  .catch(() => console.log("Check your DB"));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

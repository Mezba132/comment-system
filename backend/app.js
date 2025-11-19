const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./Routes/Auth");
const userRoutes = require("./Routes/User");
const commentRoutes = require("./Routes/Comment");

const app = express();

mongoose
  .connect(process.env.DB, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Database is connected successfully"))
  .catch(() => console.log("Check your DB"));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", commentRoutes);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);
io.on("connection", (socket) => {
  console.log("A user connected to socket.io:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

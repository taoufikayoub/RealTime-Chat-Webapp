const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const CLIENTURI = "http://localhost:3000";

const router = require("./router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.group("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on Port ${PORT}`);
});

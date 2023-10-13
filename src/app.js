require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// CONNECT TO MONGODB & START THE SERVER
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("mongodb connected");
    app.listen(port, () => {
      console.log("server is running on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

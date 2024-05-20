const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },

  () => console.log("connected to db")
);
//middleware
app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.listen(8000, () => console.log("server Up and running"));

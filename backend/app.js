const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userSchema");

// require dotenv and db conn
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/conn");

//convert json into object
app.use(express.json());
app.use(require("./router/auth")); //require router file

// process port from env
const PORT = process.env.PORT;

// pages
// app.get("/", (req, res) => res.send("Hello World!"));

// server
app.listen(PORT, () => console.log(`listening to port ${PORT}!`));

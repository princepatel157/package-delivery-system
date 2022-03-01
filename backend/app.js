const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userSchema");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// require dotenv and db conn
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/conn");

// middleware paths and cors
const rtsIndex = require("./router/auth");
const bodyParser = require("body-parser");
const cors = require("cors");

//convert json into object
app.use(express.json());
// app.use(require("./router/auth")); //require router file

// middleware paths and cors
// STEP 1
app.use(bodyParser.json());
app.use(cors());
app.use("/api", rtsIndex); //require router pages

// process port from env
const PORT = process.env.PORT;

// pages
// app.get("/", (req, res) => res.send("Hello World!"));

// server
app.listen(PORT, () => console.log(`listening to port ${PORT}!`));

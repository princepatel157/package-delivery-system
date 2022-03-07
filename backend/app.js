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
const routeReq = require("./router/auth");
const bodyParser = require("body-parser");
const cors = require("cors");

//convert json into object
app.use(express.json());

// middleware paths and cors
// STEP 1
app.use(bodyParser.json());
app.use(cors());
app.use("/api", routeReq); //require router pages

// process port from env
const PORT = process.env.PORT;

// server
app.listen(PORT, () => console.log(`listening to port ${PORT}!`));

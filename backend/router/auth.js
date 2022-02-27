const express = require("express");
const app = express();
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send("router home page");
});

// register router page
router.post("/register", async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  if (!name || !username || !email || !phone || !password) {
    return res.status(422).json({ error: "all fields required" });
  }
  try {
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      return res.status(422).json({ error: "user Exist" });
    }
    const user = new User({ name, username, email, phone, password });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({ message: "registered succesfully" });
    } else {
      return res.status(500).json({ error: "please try again" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login router page
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: "all fields required" });
  }
  try {
    const userLogin = await User.findOne({ username: username });
    if (userLogin) {
      // check password
      const matchPass = await bcrypt.compare(password, userLogin.password);

      //set json web-token
      let token = await userLogin.generateAuthToken();

      console.log("Token: ", token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589000000),
        httpOnly: true,
      });

      if (!matchPass) {
        res.status(400).json({ message: "wrong credential" });
      } else {
        res.json({ message: `${userLogin.name} logged-in succesfully` });
        console.log(userLogin.name);
      }
    } else {
      return res.status(422).json({ error: "please try again" });
    }
  } catch (err) {
    console.log(err);
  }
});

// middleware
router.get("/getInfo", authenticate, (req, res) => {
  res.send("middleware");
  res.send(req.rootUser);
});

module.exports = router;

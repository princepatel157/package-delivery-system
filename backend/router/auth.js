const express = require("express");
const app = express();
const router = express.Router();
require("../db/conn");
const { User, Order } = require("../models/userSchema");
const bcrypt = require("bcryptjs");

// twilio connection
const client = require("twilio")(
  "ACe43d09d8b78e78f9d4fc05e104872432",
  "8c4c0f609312e3e63213d5c6fba7e89a",
  {
    lazyLoading: true,
  }
);

// all routing requests from client

router.get("/", (req, res) => {
  res.send("router home page");
});

// register router page
router.post("/register", async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    return res.status(422).json({ message: "all fields required" });
  }
  try {
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      return res.status(401).json({ error: "user Exist" });
    }
    const user = new User({ username, email, phone, password });
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
      if (!matchPass) {
        res.status(400).json({ message: "wrong credential" });
      } else {
        res.json({ message: `${userLogin.username} logged-in succesfully` });
        console.log(userLogin.username);
      }
    } else {
      return res.status(422).json({ error: "please try again" });
    }
  } catch (err) {
    console.log(err);
  }
});

// order router
router.post("/order", async (req, res) => {
  const { username, parcelType, weight, pickup, drop, cost } = req.body;
  try {
    const order = new Order({
      username,
      parcelType,
      weight,
      pickup,
      drop,
      cost,
    });
    const orderSave = await order.save();
    if (orderSave) {
      return res.status(201).json({ message: "order success" });
    } else {
      return res.status(500).json({ error: "please try again" });
    }
  } catch (err) {
    console.log(err);
  }
});

// order router
router.get("/order", async (req, res) => {
  const username = req.query.usename;
  try {
    const userExist = await Order.findOne({
      username: username,
    });
    console.log(username);
    res.json({
      parcelType: userExist.parcelType,
      weight: userExist.weight,
      pickup: userExist.pickup,
      drop: userExist.drop,
      cost: userExist.cost,
    });
  } catch (err) {
    console.log(err);
  }
});

// delete order when checkout
router.post("/deleteOrder", async (req, res) => {
  const { username } = req.body;
  try {
    const deleteOrder = await Order.deleteMany({ username: username });
  } catch (err) {
    console.log(err);
  }
});

// checkout router
router.post("/checkout", async (req, res) => {
  const { trackingId, username, parcelType, weight, pickup, drop, cost } =
    req.body;
  try {
    const findUser = await User.findOne({ username: username });
    if (findUser) {
      const checkOut = await findUser.addOrder(
        trackingId,
        parcelType,
        weight,
        pickup,
        drop,
        cost
      );
      await findUser.save();
      res.status(201).json({ message: "order placed" });
    }
  } catch (err) {
    console.log(err);
  }
});

// history router
router.get("/history", async (req, res) => {
  const username = req.query.usename;
  try {
    const userExist = await User.findOne({
      username: username,
    });
    // console.log(username);
    // console.log(userExist.history);
    res.json({
      orders: userExist.history,
    });
  } catch (err) {
    console.log(err);
  }
});

// otp verify
router.get("/sms", (req, res) => {
  const phone = req.query.phone;
  const otp = req.query.otp;
  // console.log(phone);
  // console.log(otp);
  sendTextMessage(phone, otp);
});

function sendTextMessage(phone, otp) {
  client.messages
    .create({
      body: "Your verification code is: " + otp,
      to: "+91" + phone,
      from: "+1 901 446 0305",
    })
    .then((message) => console.log(message))
    // here you can implement your fallback code
    .catch((error) => console.log(error));
}

module.exports = router;

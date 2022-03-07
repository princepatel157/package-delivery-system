const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: Number,
  password: {
    type: String,
    required: true,
  },
  history: [
    {
      trackingId: String,
      parcelType: String,
      weight: Number,
      pickup: String,
      drop: String,
      cost: Number,
    },
  ],
});

const orderDetail = new mongoose.Schema({
  username: String,
  parcelType: String,
  weight: Number,
  pickup: String,
  drop: String,
  cost: Number,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.addOrder = async function (
  trackingId,
  parcelType,
  weight,
  pickup,
  drop,
  cost
) {
  try {
    this.history = this.history.concat({
      trackingId,
      parcelType,
      weight,
      pickup,
      drop,
      cost,
    });
    await this.save();
    return this.history;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderDetail);
module.exports = { User, Order };

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      min: 4,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: 8,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccesToken = async (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
    },
    process.env.ACCESS_JWT_TOKEN_SECRET
  );
};

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;

      let usernameAlreadyExist = await User.find({ username }).exec();
      console.log("FAK", usernameAlreadyExist);

      if (usernameAlreadyExist.length > 0) {
        throw { code: 400, message: "USERNAME_ALREADY_EXIST" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let user = new User({
        username,
        password: hashedPassword,
      });
      let saveUser = await user.save();
      const token = await generateAccesToken({ id: saveUser._id, username });

      return res.status(201).json({
        status: true,
        message: "USER_CREATED",
        token,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const [checkUser, _] = await User.find({ username }).exec();
      if (!checkUser) {
        throw { code: 404, message: "User not Found" };
      }

      const isPasswordValid = await bcrypt.compareSync(
        password,
        checkUser.password
      );

      if (!isPasswordValid) {
        throw { code: 400, message: "PASSWORD_INVALID" };
      }
      const token = await generateAccesToken({ id: checkUser._id, username });

      return res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(200)
        .json({
          status: true,
          message: "LOGIN_SUCCESS",
          username: username,
          token,
        });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new AuthController();

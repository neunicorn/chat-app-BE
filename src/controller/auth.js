require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const generateAccesToken = async (payload) => {
  return jwt.sign(
    {
      id: payload,
    },
    process.env.ACCESS_JWT_TOKEN_SECRET
  );
};

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;

      let usernameAlreadyExist = await UserModel.getOneUser(
        "username",
        username
      );
      if (usernameAlreadyExist) {
        throw { code: 400, message: "USERNAME_ALREADY_EXIST" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newUser = {
        username,
        password: hashedPassword,
      };
      let user = await User.create(newUser);
      if (!user) {
        throw { code: 500, message: "INTERNAL_SERVER_ERROR" };
      }

      const token = await generateAccesToken(user._id);

      return res.cookie(token).status(201).json({
        status: true,
        message: "USER_CREATED",
      });
    } catch (err) {
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new AuthController();

class User {
  async profile(req, res) {
    try {
      const { jwt } = req;
      const { id, username } = jwt;
      //   const token = req.cookies?.token;
      //   if (!token) {
      //     throw { code: 401, message: "UNAUTHORIZED" };
      //   }
      //   console.log("TOKEN: ", token);
      //   const result = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);

      return res.status(200).json({
        status: true,
        message: "USER_PROFILE",
        result: {
          id,
          username,
        },
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new User();

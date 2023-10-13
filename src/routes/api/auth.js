const express = require("express");
const router = express.Router();
const AuthController = require("../../controller/auth");

router.post("/register", AuthController.register);

module.exports = router;

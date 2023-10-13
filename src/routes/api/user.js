const express = require("express");
const router = express.Router();
const userController = require("../../controller/user");
const jwtAuth = require("../../middleware/jwtAuth");

router.get("/profile", jwtAuth(), userController.profile);

module.exports = router;

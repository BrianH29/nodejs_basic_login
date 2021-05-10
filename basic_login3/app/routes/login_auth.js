const express = require("express");
const user = require("../controller/login_controller");

const router = express.Router();

router.post("/join", user.create);

//router.post("/login", user.login);

module.exports = router;

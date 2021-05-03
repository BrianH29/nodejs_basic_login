const express = require("express");
const user = require("../controller/login_controller");

const router = express.Router();

router.post("/join", user.create);

module.exports = router;

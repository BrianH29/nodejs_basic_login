const express = require("express");
const user = require("../controller/login_controller");
const {isLoggedIn, isNotLoggedIn} = require("../controller/login_authenticate");

const router = express.Router();

router.post("/join", isNotLoggedIn, user.create);

router.post("/login", isNotLoggedIn, user.login);

router.get('/logout', isLoggedIn, user.logout); 

module.exports = router;

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("layout", { title: "welcome" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "Join" });
});

router.get('/home', (req,res,next) => {
  res.render('home',{nick: req.user.nick});
})

module.exports = router;

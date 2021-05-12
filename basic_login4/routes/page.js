const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('layout', {title: 'Welcome'});
})

router.get('/join', (req, res) => {
    res.render('join'); 
})

router.get('/home', (req,res) => {
    console.log("path to home", req.user); 
    res.render('home',{nick: req.user.nick})
})

module.exports = router; 
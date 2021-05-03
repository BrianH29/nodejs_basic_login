const express = require('express');

const router = express.Router(); 

router.get('/', (req,res,next) => {
    res.render('layout', {title: 'basic_login'})
});

router.get('/join', (req,res) => {
    res.render('join');
})

router.get('/home', (req,res) => {
    res.render('home', {name: req.session.email})
})

module.exports = router; 
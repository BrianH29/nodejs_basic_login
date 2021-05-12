const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('layout', {title: 'Welcome'});
})

router.get('/join', (req, res) => {
    res.render('join'); 
})

module.exports = router; 
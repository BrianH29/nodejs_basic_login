const express = require('express');
const bcrypt = require('bcrypt');
const db_config = require('../config/database');
const conn = db_config.init(); 

db_config.connect(conn); 
const router = express.Router(); 

router.post('/join', async (req,res,next) => {
    const sql = 'INSERT INTO USERS (email, nick, password) VALUES (?,?,?)';
    const body = req.body; 
    const hash = await bcrypt.hash(body.password, 12); 
    const params = [body.name, body.nick, hash];

    //중복 체크?
    try{
        conn.query(sql, params, (err) => {
            if(err) console.error(`query is not executed, insert fail...${err}`)
            else res.redirect('/');
        })
    }catch(err){
        console.error(err); 
    }
})

router.post('/login', (req,res,next) => {
    const {email,password} = req.body;
    const sql = 'SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?';
    
    if(email && password) {
        conn.query(sql,[email,password], (err,result,fields) => {
            if(result.length > 0){
                req.session.loggedIn = true;
                req.session.email = email;
                res.redirect('/home');
            } else {
                res.send('Incorrect email or password'); 
            }
            res.end(); 
        });
    } else {
        res.send('please enter email and password');
        res.end();
    }
});

module.exports = router;
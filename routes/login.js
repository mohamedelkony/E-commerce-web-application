const express = require("express");
const sessions = require('express-session');
const login=express.Router();
const usersDB=require('../models/usersDB');
login.post('/', (req, res) => {
    try {
        const user = usersDB.ofMail(req.body.email);
        if (user != null && user.password === req.body.password) {
            req.session.username = user.username;
            res.redirect(`/profile/${user.username}`);
        }
        else
            res.send('wrong email or password');
    }
    catch (err) {
        res.send("Error in logging in" + res.req.toString());
    }
})
login.get('/', (req, res) => {
    if (req.session.username)
        res.redirect(`/profile/${req.session.username}`);
    else
        res.render('login.ejs');
})
module.exports=login;
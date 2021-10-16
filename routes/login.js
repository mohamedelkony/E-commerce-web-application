const express = require("express");
const sessions = require('express-session');
const login=express.Router();
const usersDB=require('../models/users');
const bcrypt=require('bcrypt')
login.post('/',async (req, res) => {
    try {
        const [password,username] =await usersDB.getPassword(req.body.email);
        if (password &&await bcrypt.compare(req.body.password,password)) {
            req.session.username = username;
            res.redirect(`/profile/${username}`);
        }
        else
            res.send('wrong email or password');
    }
    catch (err) {
        res.status(500).send("Error in logging in" + err.toString());
    }
})
login.get('/', (req, res) => {
    if (req.session.username)
        res.redirect(`/profile/${req.session.username}`);
    else
        res.render('login.ejs');
})
module.exports=login;
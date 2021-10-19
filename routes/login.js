const express = require("express");
const login = express.Router();
const usersModel = require('../models/users');
const bcrypt = require('bcrypt')
login.post('/', async(req, res) => {
    try {
        const user = await usersModel.getPassword(req.body.email);
        if (user.password && await bcrypt.compare(req.body.password, user.password)) {
            req.session.username = user.username;
            res.redirect(`/profile/${user.username}`);
        } else
            res.send('wrong email or password');
    } catch (err) {
        res.status(500).send("Error in logging in" + err.toString());
    }
})
login.get('/', (req, res) => {
    if (req.session.username)
        res.redirect(`/profile/${req.session.username}`);
    else
        res.render('login.ejs');
})
module.exports = login;
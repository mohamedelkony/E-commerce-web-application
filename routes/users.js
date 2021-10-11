const express = require("express");
const Joi = require('joi');
const sessions = require('express-session');
const usersRouter = express.Router();
const usersDB = require('../models/usersDB');

usersRouter.post('/', async (req, res) => {
    try {
        const tst = await valdiateSignUP(req.body);
        const emailused = usersDB.ofMail(req.body.email);
        if (emailused != undefined)
            res.status(301).send('email already used!');
        else {
            req.session.username = req.body.username;
            usersDB.addUser(req.body);
            res.redirect(`/profile/${req.body.username}`);
        }
    } catch (error) {
        console.log("not valid data :" + error.toString());
        res.status(422).send(error.toString());
    }
})
usersRouter.get('/', (req, res) => {
    res.send(usersDB.DB);
})
usersRouter.get('/:username', (req, res) => {
    const user = usersDB.ofUsername(req.params.username);
    if (user == null)
        res.status(404).end();
    res.send(user);
})
async function valdiateSignUP(data) {
    const schema = Joi.object({
        username: Joi.string().token().max(25).required(),
        password: Joi.string().min(3).max(300).required(),
        gender: Joi.string().valid('male', 'female').required(),
        email: Joi.string().email().required(),
        birth: Joi.date().required(),
        repassword: Joi.ref('password')
    });
    return schema.validateAsync(data);
}
module.exports = usersRouter;
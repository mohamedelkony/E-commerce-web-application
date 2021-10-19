const express = require("express");
const Joi = require('joi');
const usersRouter = express.Router();
const usersDB = require('../models/users');

usersRouter.post('/', async(req, res) => {
    try {
        const tst = await valdiateSignUP(req.body);
        const emailused = await usersDB.isEmailUsed(req.body.email);
        if (emailused)
            res.status(301).send('email already used!');
        else {
            await usersDB.addUser(req.body);
            req.session.username = req.body.username;
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
usersRouter.get('/:username', async(req, res) => {
    const user = await usersDB.getByUsername(req.params.username);
    if (user == null)
        res.status(404).end();
    res.send(user);
})
usersRouter.get('/log/:username', async(req, res) => {
    //try {
    let log = await usersDB.getLog(req.params.username)
    res.send(log)
        // }// catch (err) {
        // console.log(err);
        //   throw err;
        // res.status(500).send(err.toString());   
        // }
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
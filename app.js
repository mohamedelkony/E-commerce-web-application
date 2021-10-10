const express = require("express");
const path = require('path');
const Joi = require('joi');
const sessions = require('express-session');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public', 'frontend')));
app.use('/', express.json());
app.use('/', express.urlencoded({ extended: true }));
app.use(sessions({
    secret: '32165asdassdahghgfbdfs875',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

const users = [
    {
        username: 'mohamed_elkony',
        password: '123456',
        gender: 'male',
        email: 'konykony22@gmail.com',
        birth: new Date().toUTCString(),
    }
];
app.post('/users', async (req, res) => {
    try {
        const tst = await valdiateSignUP(req.body);
        const emailused = users.find(e => e.email === req.body.email);
        if (emailused != undefined)
            res.status(301).send('email already used!');
        else {
            users.push(req.body);
            res.redirect(`/profile/${req.body.username}`);
        }
    } catch (error) {
        console.log("not valid data :" + error.toString());
        res.status(422).send(error.toString());
    }
})
app.get('/users', (req, res) => {
    res.send(users);
})
app.get('/users/:username', (req, res) => {
    const user = users.find(e => { return e.username === req.params.username; });
    if (user == undefined) {
        res.status(404);
        res.end();
    }
    res.send(user);
})

app.get('/',(req,res)=>
{
    res.status(530).send();
})
app.post('/login', (req, res) => {
    try {
        const user = users.find(e => e.email === req.body.email);
        if (user != undefined && user.password === req.body.password) {
            req.session.username = user.username;
            res.redirect(`/profile/${user.username}`);
        }
        else
            res.send('wrong email or password');
    }
    catch (err) {
        res.send("ERror" + res.req.toString());
    }
})
app.get('/login', (req, res) => {
    if (req.session.username)
        res.redirect(`/profile/${req.session.username}`);
    else
        res.sendFile(path.join(__dirname, 'public', 'frontend', 'log in.html'));
})
app.get('/logout', (req, res) => {
    if (req.session.username)
        req.session.destroy((err) => {
            if (err)
                res.status(500).send(`error can't logout`);
            else
                res.redirect('/');
        })
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'sign up.html'));
})
app.get('/profile/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'profile.html'));
})
app.listen(3000, function () { console.log(`server started`); });

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
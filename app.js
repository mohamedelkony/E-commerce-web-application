const express = require("express");
const path = require('path');
const Joi = require('joi');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public', 'frontend')));
app.use('/', express.json());
app.use('/', express.urlencoded({ extend: true }));

const users = [
    {
        username: 'mohamed_elkony',
        password: '123456',
        gender: 'male',
        email: 'konykony22@gmail.com',
        birth: new Date().toUTCString(),
    }
];
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'index.html'));
})
app.post('/users', async (req, res) => {
    try {
        const tst = await valdiateSignUP(req.body);
        users.push(req.body);
        res.redirect('/users');
    } catch (error) {
        console.log("not valid data :" + error.toString());
        res.status(422);
        res.send(error.toString());
    }
    res.end();
})
app.post('/login', (req, res) => {
    try {
        const user = users.find(e => e.email === req.body.email);
        if (user != undefined && user.password === req.body.password) {
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
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'log in.html'));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'sign up.html'));
})
app.get('/profile/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'profile.html'));
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
app.listen(3000, function () { console.log(`server started`); });

async function valdiateSignUP(data) {
    const schema = Joi.object({
        username: Joi.string().token().max(25),
        password: Joi.string().min(6).max(100),
        gender: Joi.number(),
        email: Joi.string().email(),
        birth: Joi.date(),
        repassword: Joi.ref('password')
    });
    return schema.validateAsync(data);
}
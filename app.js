const express = require("express");
const path = require('path');
const Joi = require('joi');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public', 'frontend')));
app.use('/', express.json());
app.use('/', express.urlencoded({ extend: true }));

const users = [];
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'index.html'));
})
app.post('/signup', async (req, res) => {
    try {
        const tst = await valdiateSignUP(req.body);
        users.push(req.body);
        res.redirect('/users');
    } catch (error) {
        console.log("XX"+error.toString());
        res.status(410);
        res.send(error.toString());
    }
    res.end();
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'log in.html'));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'sign up.html'));
})

app.get('/users', (req, res) => {
    res.send(JSON.stringify(users));
})

app.listen(3000, function () { console.log(`server started`); });

async function valdiateSignUP(data) {
    const schema = Joi.object({
        name: Joi.string().token().max(25),
        password: Joi.string().min(6).max(100),
        gender: Joi.number(),
        email: Joi.string().email(),
        birth: Joi.date()
    });
    return schema.validateAsync(data);
}
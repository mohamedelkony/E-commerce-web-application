const express = require("express")
const path = require('path')
const sessions = require('express-session')
const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')
const usersDB = require('./models/usersDB')
const app = express()

app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', express.json())
app.use('/', express.urlencoded({ extended: false }))
app.use(sessions({
    secret: '3zq2a165a0sdasx9zabhghgfbdfs8y7c5',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))
app.use('/', (req, res, next) => {
  /*  if (req.session.username) {
        let user = usersDB.getByUsername(req.session.username);
        if (!user.log) {
            user.log = [];
            user.requestsCount = 0;
        }
        else {
            user.log.push('request to ' + req.path + ', at' + new Date().toLocaleTimeString())
            user.requestsCount++
        }
    };*/
    next();
})
app.use('/login', loginRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    if (req.session.username)
        res.redirect(`/profile/${req.session.username}`);
    else
        res.render('home.ejs', { username: req.session.username });
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

app.get('/profile/:username', (req, res) => {
    res.render('profile', { username: req.session.username });
})

app.get('/signup', (req, res) => {
    if (req.session.username)
        res.redirect(`/profile/${req.session.username}`);
    else
        res.render('signup');
})
usersDB.connect().then(() => {
    app.listen(3000, function () { console.log(`server started listing at port :3000 !`); })
}).catch((err) => {
    console.log(err)
    throw err
})
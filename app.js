const express = require("express")
const path = require('path')
const sessions = require('express-session')
const mysqlStore = require('express-mysql-session')(sessions)
const DBconnector = require('./models/connector')

const app = express()

function runServer() {
    const loginRouter = require('./routes/login')
    const usersRouter = require('./routes/users')
    const inventoryRouter = require('./routes/invenotry')
    const usersModel = require('./models/users')

    app.set('view engine', 'ejs')
    app.use('/', express.static(path.join(__dirname, 'public')))
    app.use('/', express.json())
    app.use('/', express.urlencoded({ extended: false }))
    sessionStore = new mysqlStore({}, DBconnector.getConnection())
    app.use(sessions({
        store: sessionStore,
        secret: '3zq29H165a0sdasx9zabtkhgfbdfs8y7c5',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 /*7 days*/ }
    }))
    app.use('/users', usersRouter)
    app.use('/login', loginRouter)
    app.use('/inventory', inventoryRouter)
    app.use('/', async (req, res, next) => {
        try {
            if (req.session.username) {
                await usersModel.log(req.session.username, req.path + ' @' + new Date().toLocaleTimeString())
            };
            next();
        } catch (err) {
            res.send(err.toString())
            throw err;
        }
    })
    app.get('/', (req, res) => {
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
    app.listen(3000, function () {
        console.log(`web server started @port :3000 !`);
    })
}

DBconnector.connect(runServer)


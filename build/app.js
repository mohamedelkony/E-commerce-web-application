"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const login_1 = require("./routes/login");
const users_1 = require("./routes/users");
const invenotry_1 = __importDefault(require("./routes/invenotry"));
const connector_1 = require("./models/connector");
const users_2 = require("./models/users");
const inventory_1 = __importDefault(require("./models/inventory"));
const app = (0, express_1.default)();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const DBconnector = new connector_1.DBConnector();
DBconnector.connect(runServer);
function runServer() {
    app.set('views', path_1.default.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
    app.use('/', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
    app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
    app.use('/', express_1.default.json());
    app.use('/', express_1.default.urlencoded({ extended: false }));
    const usersModel = new users_2.UsersModel(DBconnector);
    const inventoryModel = new inventory_1.default(DBconnector);
    const usersRouter = new users_1.UsersRouter(usersModel).router;
    const loginRouter = new login_1.LoginRouter(usersModel).router;
    const inventoryRouter = new invenotry_1.default(inventoryModel).router;
    const sessionStore = new MySQLStore({}, DBconnector.connection);
    app.use(session({
        store: sessionStore,
        secret: '3zq29H165a0sdasx9zabtkhgfbdfs8y7c5',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 /*7 days*/ }
    }));
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/inventory', inventoryRouter);
    app.use('/', async (req, res, next) => {
        try {
            if ('username' in req.session)
                await usersModel.log(req.session.username, req.path + ' @' + new Date().toLocaleTimeString());
            next();
        }
        catch (err) {
            res.send(err.toString());
            throw err;
        }
    });
    app.get('/', (req, res) => {
        res.render('home.ejs', { username: req.session.username });
    });
    app.get('/logout', (req, res) => {
        if (req.session.username)
            req.session.destroy((err) => {
                if (err)
                    res.status(500).send(`error can't logout`);
                else
                    res.redirect('/');
            });
    });
    app.get('/profile/:username', (req, res) => {
        res.render('profile', { username: req.session.username });
    });
    app.get('/signup', (req, res) => {
        if (req.session.username !== undefined)
            res.redirect(`/profile/${req.session.username}`);
        else
            res.render('signup');
    });
    app.get('/adminPanel', (req, res) => {
        res.render('adminPanel');
    });
    app.get('*', (req, res) => {
        res.send(`404 kosomk ${req.path} not found `);
    });
    app.use(function (err, req, res, next) {
        if (process.env.NODE_ENV === 'production') {
            console.error(err.stack);
            console.log(err);
            res.status(500).send('Something broke!');
        }
        else
            throw err;
    });
    app.listen(3000, function () {
        console.log(`web server started @port :3000 !`);
    });
}

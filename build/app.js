"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const login_1 = __importDefault(require("./routes/login"));
const users_1 = __importDefault(require("./routes/users"));
const invenotry_1 = __importDefault(require("./routes/invenotry"));
const connector_1 = __importDefault(require("./models/connector"));
const users_2 = __importDefault(require("./models/users"));
const inventory_1 = __importDefault(require("./models/inventory"));
const cart_1 = __importDefault(require("./routes/cart"));
const cart_2 = __importDefault(require("./models/cart"));
const morgan_1 = __importDefault(require("morgan"));
let app = (0, express_1.default)();
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let DBconnector = new connector_1.default();
let log_middleware = (0, morgan_1.default)(function (tokens, req, res) {
    let user;
    if (req.session)
        user = '@' + (req.session.user_id === undefined ? 'Annonymes' : req.session.user_id);
    else
        user = '@Annonymes';
    return [
        user,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
});
DBconnector.connect(runServer);
function runServer() {
    let usersModel = new users_2.default(DBconnector);
    let inventoryModel = new inventory_1.default(DBconnector);
    let cartModel = new cart_2.default(DBconnector);
    let usersRouter = new users_1.default(usersModel).router;
    let loginRouter = new login_1.default(usersModel).router;
    let inventoryRouter = new invenotry_1.default(inventoryModel).router;
    let cartRouter = new cart_1.default(cartModel).router;
    let sessionStore = new MySQLStore({}, DBconnector.connection);
    app.set('views', path_1.default.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
    app.use('/', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
    app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
    app.use('/', express_1.default.json());
    app.use('/', express_1.default.urlencoded({ extended: false }));
    app.use(session({
        store: sessionStore,
        secret: '3zq29H165a0sdasx9zabtkhgfbdfs8y7c5',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 /* 7 days */ }
    }));
    if (process.env.NODE_ENV !== 'test')
        app.use(log_middleware);
    app.use('/users', usersRouter);
    app.use('/login', loginRouter);
    app.use('/inventory', inventoryRouter);
    app.use('/cart', cartRouter);
    app.get('/', (req, res) => {
        res.render('home.ejs', { user_id: req.session.user_id });
    });
    app.get('/logout', (req, res) => {
        if (req.session.user_id)
            req.session.destroy((err) => {
                if (err)
                    res.status(500).send(`error while logout`);
                else
                    res.redirect('/');
            });
    });
    app.get('/profile/me', (req, res) => {
        res.render('profile', { user_id: req.session.user_id });
    });
    app.get('/signup', (req, res) => {
        if (req.session.user_id !== undefined)
            res.redirect(`/profile/${req.session.user_id}`);
        else
            res.render('signup');
    });
    app.get('/adminPanel', (req, res) => {
        res.render('adminPanel');
    });
    app.get('*', (req, res) => {
        res.send(`404 error kosomk ${req.path} not found `);
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
exports.default = app; //for testing

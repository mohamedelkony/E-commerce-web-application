"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const orders_1 = __importDefault(require("./controllers/orders"));
const login_1 = __importDefault(require("./controllers/login"));
const users_1 = __importDefault(require("./controllers/users"));
const invenotry_1 = __importDefault(require("./controllers/invenotry"));
const search_1 = __importDefault(require("./controllers/search"));
const cart_1 = __importDefault(require("./controllers/cart"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const session = require('express-session');
const dotenv = require('dotenv');
const compression = require('compression');
const pgSession = require('connect-pg-simple')(session);
const db_1 = __importDefault(require("./util/db"));
//app.use(helmet())
// compress all responses
app.use(compression());
//load environment variables
dotenv.config();
console.log('server is booting ...');
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use('/', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/', express_1.default.json());
app.use('/', express_1.default.urlencoded({ extended: false }));
app.use(session({
    store: new pgSession({
        pool: db_1.default.pool,
    }),
    secret: '3zq29H165a0sdasx9zabtkhgfbdfs8y7c5',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));
let log_middleware = (0, morgan_1.default)(function (tokens, req, res) {
    let user;
    if (req.session)
        user = '@' + (req.session.user_id === undefined ? 'Annonymes' : req.session.user_id);
    else
        user = '@Annonymes';
    return [
        user + ':' + req.socket.remotePort,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ].join(' ');
});
if (process.env.NODE_ENV !== 'test')
    app.use(log_middleware);
let usersController = new users_1.default();
let loginController = new login_1.default();
let inventoryController = new invenotry_1.default();
let cartController = new cart_1.default();
let searchController = new search_1.default();
let ordersController = new orders_1.default();
app.use('/users', usersController.router);
app.use('/login', loginController.router);
app.use('/inventory', inventoryController.router);
app.use('/cart', cartController.router);
app.use('/search', searchController.router);
app.use('/orders', ordersController.router);
app.get('/', (req, res) => {
    res.render('home.ejs', { user_id: req.session.user_id, pageNumber: 1 });
});
app.get('/page', (req, res) => {
    res.render('home.ejs', { user_id: req.session.user_id, pageNumber: req.query.pageNumber });
});
app.get('/s/:name', (req, res) => {
    res.render('search.ejs', { user_id: req.session.user_id, search_query: req.params.name });
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
    }
    else {
        console.log(err);
        throw err;
    }
    res.status(500).send('Something broke!');
});
let port = process.env.PORT || 2401;
if (!module.parent) {
    app.listen(port, async function () {
        console.log(`Web server started@localhost:${port}`);
    });
}
exports.default = app;

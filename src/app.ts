import express from "express"
import path from 'path'
import  LoginRouter  from './routes/login'
import  UsersRouter  from './routes/users'
import InventoryRouter from './routes/invenotry'
import  DBConnector  from './models/connector'
import  UsersModel  from './models/users'
import InventoryModel from "./models/inventory"
import CartRouter from './routes/cart'
import CartModel from "./models/cart"
import morgan from 'morgan'
const app = express()

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const DBconnector = new DBConnector()
DBconnector.connect(runServer)

let log_middleware=morgan(function (tokens, req, res) {
    let user
    if(req.session)
    user='@'+(req.session.user_id===undefined?'Annonymes':req.session.user_id);
    else
    user='@Annonymes'
    return [
        user,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })

function runServer() {
    const usersModel = new UsersModel(DBconnector)
    const inventoryModel = new InventoryModel(DBconnector)
    const cartModel = new CartModel(DBconnector)
    const usersRouter = new UsersRouter(usersModel).router
    const loginRouter = new LoginRouter(usersModel).router
    const inventoryRouter = new InventoryRouter(inventoryModel).router
    const cartRouter = new CartRouter(cartModel).router;
    const sessionStore = new MySQLStore({}, DBconnector.connection)
    
    
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'ejs')
    app.use('/', express.static(path.join(__dirname, '..', 'public')))
    app.use('/public', express.static(path.join(__dirname, '..', 'public')))
    app.use('/', express.json())
    app.use('/', express.urlencoded({ extended: false }))
    
    app.use(session({
        store: sessionStore,
        secret: '3zq29H165a0sdasx9zabtkhgfbdfs8y7c5',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 /* 7 days */ }
    }))
    
    app.use(log_middleware)
    
    app.use('/users', usersRouter)
    app.use('/login', loginRouter)
    app.use('/inventory', inventoryRouter)
    app.use('/cart', cartRouter)
    
    app.get('/', (req, res) => {
        res.render('home.ejs', { user_id: req.session.user_id });
    })
    app.get('/logout', (req, res) => {
        if (req.session.user_id)
            req.session.destroy((err) => {
                if (err)
                    res.status(500).send(`error while logout`);
                else
                    res.redirect('/');
            })
    })
    app.get('/profile/me', (req, res) => {
        res.render('profile', { user_id: req.session.user_id });
    })
    app.get('/signup', (req, res) => {
        if (req.session.user_id !== undefined)
            res.redirect(`/profile/${req.session.user_id}`);
        else
            res.render('signup');
    })
    app.get('/adminPanel', (req, res) => {
        res.render('adminPanel')
    })
    
    app.get('*', (req, res) => {
        res.send(`404 error kosomk ${req.path} not found `)
    })
 
    app.use(function (err, req, res, next) {
        if (process.env.NODE_ENV === 'production') {
            console.error(err.stack)
            console.log(err)
            res.status(500).send('Something broke!')
        }
        else
            throw err
    })
    app.listen(3000, function () {
        console.log(`web server started @port :3000 !`);
    })
}
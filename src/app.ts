import express from "express"
import path from 'path'
import { LoginRouter } from './routes/login'
import { UsersRouter } from './routes/users'
import InventoryRouter from './routes/invenotry'
import { DBConnector } from './models/connector'
import { UsersModel } from './models/users'
import InventoryModel from "./models/inventory"

const app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const DBconnector = new DBConnector()
DBconnector.connect(runServer)

function runServer() {
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'ejs')
    app.use('/', express.static(path.join(__dirname, '..', 'public')))
    app.use('/public', express.static(path.join(__dirname, '..','public')))
    app.use('/', express.json())
    app.use('/', express.urlencoded({ extended: false }))
    const usersModel = new UsersModel(DBconnector)
    const inventoryModel = new InventoryModel(DBconnector)
    const usersRouter = new UsersRouter(usersModel).router
    const loginRouter = new LoginRouter(usersModel).router
    const inventoryRouter = new InventoryRouter(inventoryModel).router
    const sessionStore = new MySQLStore({}, DBconnector.connection)
    app.use(session({
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
            if ('username' in req.session)
                await usersModel.log(req.session.username, req.path + ' @' + new Date().toLocaleTimeString())
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
        if (req.session.username !== undefined)
            res.redirect(`/profile/${req.session.username}`);
        else
            res.render('signup');
    })
    app.get('/adminPanel', (req, res) => {
        res.render('adminPanel')
    })
    app.get('*', (req, res) => {
        res.send(`404 kosomk ${req.path} not found `)
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



import express from "express"
import path from 'path'
import OrdersController from './controllers/orders'
import LoginContoller from './controllers/login'
import UsersController from './controllers/users'
import InventoryController from './controllers/invenotry'
import SearchController from './controllers/search'
import CartController from './controllers/cart'
import morgan from 'morgan'
import helmet from 'helmet'
const app = express()
const session = require('express-session');
const dotenv = require('dotenv');
const compression = require('compression')
const pgSession = require('connect-pg-simple')(session);
import db from './util/db'
//app.use(helmet())
// compress all responses
app.use(compression())
//load environment variables
dotenv.config();

console.log('server is booting ...')

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, '..', 'public')))
app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use('/', express.json())
app.use('/', express.urlencoded({ extended: false }))


app.use(session({
    store:  new pgSession({
        pool : db.pool,
      }),
    secret: '3zq29H165a0sdasx9zabtkhgfbdfs8y7c5',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))

let log_middleware = morgan(function (tokens, req, res) {
    let user
    if (req.session)
        user = '@' + (req.session.user_id === undefined ? 'Annonymes' : req.session.user_id);
    else
        user = '@Annonymes'

    return [
        user + ':' + req.socket.remotePort,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ].join(' ')
})
if (process.env.NODE_ENV !== 'test')
    app.use(log_middleware)

let usersController = new UsersController()
let loginController = new LoginContoller()
let inventoryController = new InventoryController()
let cartController = new CartController()
let searchController = new SearchController()
let ordersController = new OrdersController()

app.use('/users', usersController.router)
app.use('/login', loginController.router)
app.use('/inventory', inventoryController.router)
app.use('/cart', cartController.router)
app.use('/search', searchController.router)
app.use('/orders', ordersController.router)


app.get('/', (req, res) => {
    res.render('home.ejs', { user_id: req.session.user_id,pageNumber:1});
})
app.get('/wordle', (req, res) => {
    res.render('wordle.ejs');
})

app.get('/page', (req, res) => {
    res.render('home.ejs', { user_id: req.session.user_id,pageNumber:req.query.pageNumber});
})

app.get('/s/:name',(req,res)=>{
    res.render('search.ejs', {user_id: req.session.user_id, search_query: req.params.name });
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
    }
    else {
        console.log(err)
        throw err
    }
    res.status(500).send('Something broke!')
})

let port=process.env.PORT||2401
if (!module.parent) {
    app.listen(port, async function () {
        console.log(`Web server started@localhost:${port}`);
    })
}
export default app

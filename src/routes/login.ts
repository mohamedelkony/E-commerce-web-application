import express from "express";
import { UsersModel } from '../models/users';
import bcrypt from 'bcrypt';
export class LoginRouter {
    router: any
    usersModel: UsersModel
    constructor(usersmodel: UsersModel) {
        this.usersModel = usersmodel
        this.router = express.Router()
        this.setupRouter()
    }
    private setupRouter() {
        this.router.post('/', async (req, res) => {
            try {

                const user = await this.usersModel.getPassword(req.body.email);
                if (user.password && await bcrypt.compare(req.body.password, user.password)) {
                    req.session.username = user.username;
                    res.redirect(`/profile/${user.username}`);
                } else
                    res.send('wrong email or password');
            } catch (err) {
                res.status(500).send("Error in logging in" + err.toString());
            }
        })

        this.router.get('/', (req, res) => {
            if (req.session.username)
                res.redirect(`/profile/${req.session.username}`);
            else
                res.render('login.ejs')

        })

    }
}
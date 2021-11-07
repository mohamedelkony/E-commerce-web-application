import express from "express";
import Joi from 'joi';
import { nextTick } from "process";
import { UsersModel } from '../models/users';
export class UsersRouter {
    usersmodel: UsersModel;
    router: any;
    constructor(usersmodel: UsersModel) {
        this.usersmodel = usersmodel;
        this.router = express.Router();
        this.setupRouter();
    }
    private setupRouter() {

        this.router.post('/', async (req, res) => {
            try {
                const tst = await valdiateSignUP(req.body);
                const emailused = await this.usersmodel.isEmailUsed(req.body.email);
                if (emailused)
                    res.status(301).send('email already used!');
                else {
                    await this.usersmodel.addUser(req.body);
                    req.session.username = req.body.username;
                    res.redirect(`/profile/${req.body.username}`);
                }
            } catch (error) {
                console.log("not valid data :" + error.toString());
                res.status(422).send(error.toString());
            }
        })

        this.router.get('/:username', async (req, res) => {
            const user = await this.usersmodel.getByUsername(req.params.username);
            if (user == null)
                res.status(404).send();
            else
                res.send(user);
        })
        this.router.get('/log/:username', async (req, res, next) => {
            try {
                let log = await this.usersmodel.getLog(req.params.username)
                res.send(log)
            } catch (err) {
                next(err)
            }
        })
        async function valdiateSignUP(data) {
            const schema = Joi.object({
                username: Joi.string().token().max(25).required(),
                password: Joi.string().min(3).max(300).required(),
                gender: Joi.string().valid('male', 'female').required(),
                email: Joi.string().email().required(),
                birth: Joi.date().required(),
                repassword: Joi.ref('password')
            });
            return schema.validateAsync(data);
        }
    }
}
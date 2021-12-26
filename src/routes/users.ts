import express from "express";
import Joi from 'joi';
import asyncHandler from "../util/asyncHandler";
import UsersModel from '../models/users';
export default class UsersRouter {
    model: UsersModel;
    router: any;
    constructor(usersmodel: UsersModel) {
        this.model = usersmodel;
        this.router = express.Router();
        this.setupRouter();
    }
    private async valdiateSignUP(data) {
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
    private setupRouter() {
        //POST user
        this.router.post('/', asyncHandler(async (req, res) => {
            try {
                const tst = await this.valdiateSignUP(req.body);
            } catch (error) {
                res.status(400).send('form data not valid:' + error.toString());
                return
            }
            const emailused = await this.model.isEmailUsed(req.body.email);
            if (emailused)
                res.status(301).send('email already used!');
            else {
                await this.model.addUser(req.body)
                req.session.user_id = await this.model.getID(req.body.email)
                res.redirect(`/profile/me`);
            }
        }))

        //GET user
        this.router.get('/:user_id', asyncHandler(async (req, res) => {
            if (req.params.user_id === 'me') {
                if (req.session.user_id) {
                    const user = await this.model.getbyID(req.session.user_id)
                    res.send(user)
                }
                else
                    res.status(403).send()
                return
            }
            const user = await this.model.getbyID(req.params.user_id);
            if (user == null)
                res.status(404).send();
            else
                res.send(user);
        }))
    }
}
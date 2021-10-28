"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
class UsersRouter {
    constructor(usersmodel) {
        this.usersmodel = usersmodel;
        this.router = express_1.default.Router();
        this.setupRouter();
    }
    setupRouter() {
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
            }
            catch (error) {
                console.log("not valid data :" + error.toString());
                res.status(422).send(error.toString());
            }
        });
        this.router.get('/:username', async (req, res) => {
            const user = await this.usersmodel.getByUsername(req.params.username);
            if (user == null)
                res.status(404).end();
            res.send(user);
        });
        this.router.get('/log/:username', async (req, res) => {
            //try {
            let log = await this.usersmodel.getLog(req.params.username);
            res.send(log);
            // }// catch (err) {
            // console.log(err);
            //   throw err;
            // res.status(500).send(err.toString());   
            // }
        });
        async function valdiateSignUP(data) {
            const schema = joi_1.default.object({
                username: joi_1.default.string().token().max(25).required(),
                password: joi_1.default.string().min(3).max(300).required(),
                gender: joi_1.default.string().valid('male', 'female').required(),
                email: joi_1.default.string().email().required(),
                birth: joi_1.default.date().required(),
                repassword: joi_1.default.ref('password')
            });
            return schema.validateAsync(data);
        }
    }
}
exports.UsersRouter = UsersRouter;

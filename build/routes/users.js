"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
class UsersRouter {
    constructor(usersmodel) {
        this.model = usersmodel;
        this.router = express_1.default.Router();
        this.setupRouter();
    }
    setupRouter() {
        //add user
        this.router.post('/', (0, asyncHandler_1.default)(async (req, res) => {
            try {
                const tst = await valdiateSignUP(req.body);
            }
            catch (error) {
                res.status(400).send('form data not valid:' + error.toString());
                return;
            }
            const emailused = await this.model.isEmailUsed(req.body.email);
            if (emailused)
                res.status(301).send('email already used!');
            else {
                await this.model.addUser(req.body);
                req.session.user_id = await this.model.getID(req.username);
                res.redirect(`/profile/${req.session.user_id}`);
            }
        }));
        //get user
        this.router.get('/:user_id', (0, asyncHandler_1.default)(async (req, res) => {
            if (req.params.user_id === 'me') {
                if (req.session.user_id) {
                    const user = await this.model.getbyID(req.session.user_id);
                    res.send(user);
                }
                else
                    res.status(403).send();
                return;
            }
            const user = await this.model.getbyID(req.params.user_id);
            if (user == null)
                res.status(404).send();
            else
                res.send(user);
        }));
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
exports.default = UsersRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
class LoginRouter {
    constructor() {
        this.model = new users_1.default();
        this.router = express_1.default.Router();
        // login user  
        this.router.post('/', (0, asyncHandler_1.default)(async (req, res) => {
            const user = await this.model.getPassword(req.body.email);
            if (user.password && await bcrypt_1.default.compare(req.body.password, user.password)) {
                req.session.user_id = user.id;
                // res.redirect(`/profile/me`) 
                res.send({ 'user_id': user.id });
            }
            else
                res.send('wrong email or password');
        }));
        // get login page
        this.router.get('/', (req, res) => {
            if (req.session.user_id)
                res.redirect(`/profile/me`);
            else
                res.render('login.ejs');
        });
    }
}
exports.default = LoginRouter;

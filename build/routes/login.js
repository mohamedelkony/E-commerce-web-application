"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
class LoginRouter {
    constructor(usersmodel) {
        this.model = usersmodel;
        this.router = express_1.default.Router();
        this.setupRouter();
    }
    setupRouter() {
        // login user  
        this.router.post('/', (0, asyncHandler_1.default)(async (req, res, next) => {
            const user = await this.model.getPassword(req.body.email);
            if (user.password && await bcrypt_1.default.compare(req.body.password, user.password)) {
                req.session.user_id = user.id;
                res.redirect(`/profile/me`);
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

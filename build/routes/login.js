"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginRouter {
    constructor(usersmodel) {
        this.usersModel = usersmodel;
        this.router = express_1.default.Router();
        this.setupRouter();
    }
    setupRouter() {
        this.router.post('/', async (req, res) => {
            try {
                const user = await this.usersModel.getPassword(req.body.email);
                if (user.password && await bcrypt_1.default.compare(req.body.password, user.password)) {
                    req.session.username = user.username;
                    res.redirect(`/profile/${user.username}`);
                }
                else
                    res.send('wrong email or password');
            }
            catch (err) {
                res.status(500).send("Error in logging in" + err.toString());
            }
        });
        this.router.get('/', (req, res) => {
            if (req.session.username)
                res.redirect(`/profile/${req.session.username}`);
            else
                res.render('login.ejs');
        });
    }
}
exports.LoginRouter = LoginRouter;

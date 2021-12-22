"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class InventoryRouter {
    constructor(model) {
        this.model = model;
        this.router = express_1.default.Router();
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/dynamic');
            }, filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        });
        this.upload = (0, multer_1.default)({
            storage: storage,
            fileFilter: function (req, file, cb) {
                var ext = path_1.default.extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return cb(new Error('Only images are allowed'));
                }
                cb(null, true);
            }, limits: {
                fileSize: 5 * 1024 * 1024
            }
        }).single('image');
        this.setupRouter();
    }
    setupRouter() {
        this.router.get("/", async (req, res) => {
            let limit = 25;
            if (req.body.limit)
                limit = req.body.limit;
            let data = await this.model.getProducts(limit);
            res.send(data);
        });
        this.router.post("/cart", async (req, res) => {
            if (req.session.username == undefined) {
                res.status(401).send("user not logged in");
                return;
            }
            await this.model.addToCart(req.body.product_id, req.session.id);
            res.status(200).send();
        });
        this.router.get("/cart", async (req, res) => {
            if (req.session.username == undefined) {
                res.status(401).send('user not authorized');
                return;
            }
            let data = await this.model.getCart(req.session.id);
            res.send(data);
        });
        this.router.delete('/cart', async (req, res, next) => {
            try {
                if (!req.session.username)
                    res.status(401).send('user not logged in');
                await this.model.removeFromCart(req.body.product_id, req.sessionID);
                res.send();
            }
            catch (err) {
                next(err);
            }
        });
        this.router.post('/', (req, res, next) => {
            this.upload(req, res, async (err) => {
                if (err) {
                    next(err);
                }
                else {
                    try {
                        await this.model.addProduct(req.body.product_name, req.body.price, req.body.product_desc, req.file.path);
                        res.redirect(`/adminpanel`);
                    }
                    catch (err) {
                        next(err);
                    }
                }
            });
        });
    }
}
exports.default = InventoryRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
class CartRouter {
    constructor(model) {
        this.model = model;
        this.router = express_1.default.Router();
        this.setupRouter();
    }
    setupRouter() {
        // add cart item
        this.router.post("/", (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return;
            }
            await this.model.addToCart(req.body.product_id, req.session.user_id);
            res.status(201).send();
        }));
        // get cart item
        this.router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id == undefined) {
                res.status(403).send('user not authenticated');
                return;
            }
            let data = await this.model.getCart(req.session.user_id);
            res.send(data);
        }));
        //delete cart item
        this.router.delete('/', (0, asyncHandler_1.default)(async (req, res, next) => {
            if (!req.session.user_id) {
                res.status(403).send('user not authenticated');
                return;
            }
            await this.model.removeFromCart(req.body.product_id, req.session.user_id);
            res.status(200).send();
        }));
    }
}
exports.default = CartRouter;

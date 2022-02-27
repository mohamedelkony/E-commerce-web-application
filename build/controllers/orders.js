"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const orders_1 = __importDefault(require("../models/orders"));
class OrdersController {
    constructor() {
        this.model = new orders_1.default();
        this.router = express_1.default.Router();
        // order items in shoppping cart
        this.router.post("/", (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return;
            }
            let user_id = req.session.user_id;
            let order_id = await this.model.order_cart_items(user_id);
            res.status(201).send({ 'order_id': order_id });
        }));
        // get order_details
        this.router.get("/:order_id", (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return;
            }
            let body = await this.model.get_order(req.params.order_id);
            res.send(body);
        }));
        // get all user orders
        this.router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return;
            }
            let user_id = req.session.user_id;
            let body = await this.model.get_all_orders(user_id);
            res.send(body);
        }));
    }
}
exports.default = OrdersController;

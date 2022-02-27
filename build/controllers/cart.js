"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const cart_1 = __importDefault(require("../models/cart"));
class CartController {
    constructor() {
        this.model = new cart_1.default();
        this.router = express_1.default.Router();
        // add cart item
        this.router.post("/", (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return;
            }
            let product_id = req.body.product_id, user_id = req.session.user_id;
            let exists = await this.model.item_already_in_cart(product_id, user_id);
            if (exists) {
                res.status(400).send({ 'product_id': product_id, 'msg': 'item already added' });
                return;
            }
            await this.model.addToCart(product_id, user_id);
            res.status(201).send({ 'product_id': product_id, 'user_id': user_id });
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
        /*
        update cart item quantity
        
        /cart/ PUT
        
        {
            product_id:513,
            quantity:'down'
        }
        */
        this.router.put('/', (0, asyncHandler_1.default)(async (req, res) => {
            if (req.session.user_id == undefined) {
                res.status(403).send('user not authenticated');
                return;
            }
            let newquantity;
            if (req.body.quantity === 'up')
                newquantity = await this.model.increase_cart_item_qunatity(req.body.product_id, req.session.user_id);
            else
                newquantity = await this.model.decrease_cart_item_qunatity(req.body.product_id, req.session.user_id);
            res.status(200).send({ 'quantity': newquantity });
        }));
        //clear cart 
        this.router.delete('/all', (0, asyncHandler_1.default)(async (req, res, next) => {
            if (!req.session.user_id) {
                res.status(403).send('user not authenticated');
                return;
            }
            await this.model.clearCart(req.session.user_id);
            res.status(200).send({ 'user_id': req.session.user_id });
        }));
        //delete cart item
        this.router.delete('/', (0, asyncHandler_1.default)(async (req, res, next) => {
            if (!req.session.user_id) {
                res.status(403).send('user not authenticated');
                return;
            }
            await this.model.removeFromCart(req.body.product_id, req.session.user_id);
            res.status(200).send({ 'product_id': req.body.product_id, 'user_id': req.session.user_id });
        }));
    }
}
exports.default = CartController;

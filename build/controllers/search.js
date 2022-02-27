"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const search_1 = __importDefault(require("../models/search"));
class CartController {
    constructor() {
        this.model = new search_1.default();
        this.router = express_1.default.Router();
        // get search result
        this.router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
            let products = await this.model.search(req.body.product_name, req.body.from_price, req.body.to_price, req.body.product_desc);
            res.send(products);
        }));
        // get search by name only result
        this.router.get("/:name", (0, asyncHandler_1.default)(async (req, res) => {
            let products = await this.model.search(req.params.name, null, null, null);
            res.send(products);
        }));
    }
}
exports.default = CartController;

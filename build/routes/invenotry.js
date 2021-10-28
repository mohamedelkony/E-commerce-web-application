"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRouter = void 0;
const express_1 = __importDefault(require("express"));
class InventoryRouter {
    constructor(model) {
        this.model = model;
        this.router = express_1.default.Router();
        this.setupRouter();
    }
    setupRouter() {
        this.router.get("/", async (req, res) => {
            let limit = 10;
            if (req.body.limit)
                limit = req.body.limit;
            let data = await this.model.getProducts(limit);
            res.send(data);
        });
        this.router.post("/cart", async (req, res) => {
            if (req.session.username == undefined) {
                res.status(401).send("please sign in first");
                return;
            }
            await this.model.addToCart(req.body.product_id, req.session.id);
            res.status(200).send();
        });
        this.router.get("/cart", async (req, res) => {
            if (req.session.username == undefined) {
                return null;
            }
            let data = await this.model.getCart(req.session.id);
            res.send(data);
        });
    }
}
exports.InventoryRouter = InventoryRouter;

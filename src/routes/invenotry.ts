import express from "express";
import { InventoryModel } from "../models/inventory"
export class InventoryRouter {
    router: any;
    private model: InventoryModel;
    constructor(model: InventoryModel) {
        this.model = model
        this.router=express.Router()
        this.setupRouter()
    }
    private setupRouter() {
        this.router.get("/", async (req, res) => {
            let limit = 10;
            if (req.body.limit)
                limit = req.body.limit
            let data = await this.model.getProducts(limit)
            res.send(data)
        })
        this.router.post("/cart", async (req, res) => {
            if (req.session.username == undefined) {
                res.status(401).send("please sign in first");
                return
            }
            await this.model.addToCart(req.body.product_id, req.session.id)
            res.status(200).send()
        })
        this.router.get("/cart", async (req, res) => {
            if (req.session.username == undefined) {
                return null
            }
            let data = await this.model.getCart(req.session.id)
            res.send(data)
        })
    }
}
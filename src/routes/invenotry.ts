import express from "express";
import { Router } from "express-serve-static-core";
import { InventoryModel } from "../models/inventory"
export class InventoryRouter {
    router: Router;
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
                res.status(401).send("user not logged in");
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
        this.router.delete('/cart',async (req,res)=>{
            if(!req.session.username) res.status(401).send('user not logged in')
            await this.model.removeFromCart(req.body.product_id,req.sessionID)
            res.send()
        })
    }
}
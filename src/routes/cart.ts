import express from "express";
import { Router } from "express-serve-static-core";
import asyncHandler from '../util/asyncHandler'
import CartModel from "../models/cart"

export default class CartRouter  {
    router: Router
    private model: CartModel
    constructor(model: CartModel) {
        this.model = model
        this.router = express.Router()
        this.setupRouter()
    }
    private setupRouter() {
        // add cart item
        this.router.post("/", asyncHandler(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return
            }
            await this.model.addToCart(req.body.product_id, req.session.user_id)
            res.status(201).send()
        }))

        // get cart item
        this.router.get("/",asyncHandler( async (req, res) => {
            if (req.session.user_id == undefined) {
                res.status(403).send('user not authenticated');
                return;
            }
            let data = await this.model.getCart(req.session.user_id)
            res.send(data)
        }))

        //delete cart item
        this.router.delete('/',asyncHandler(async (req, res,next) => {
            if (!req.session.user_id) {
                res.status(403).send('user not authenticated')
                return
            }
            await this.model.removeFromCart(req.body.product_id, req.session.user_id)
           res.status(200).send()
        }))
    }
}
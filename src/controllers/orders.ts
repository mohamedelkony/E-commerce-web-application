import express from "express";
import { Router } from "express-serve-static-core";
import asyncHandler from '../util/asyncHandler'
import OrdersModel from "../models/orders"

export default class OrdersController {
    router: Router
    private model: OrdersModel
    constructor() {
        this.model = new OrdersModel()
        this.router = express.Router()
        // order items in shoppping cart
        this.router.post("/", asyncHandler(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return
            }
            let user_id = req.session.user_id
            let order_id = await this.model.order_cart_items(user_id)
            res.status(201).send({ 'order_id': order_id })
        }))


        // get order_details
        this.router.get("/:order_id", asyncHandler(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return
            }   
            let body = await this.model.get_order(req.params.order_id)
            res.send(body)
        }))

        // get all user orders
        this.router.get("/", asyncHandler(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return
            }
            let user_id = req.session.user_id
            let body = await this.model.get_all_orders(user_id)
            res.send(body)
        }))

    }
}
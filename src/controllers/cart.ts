import express from "express";
import { Router } from "express-serve-static-core";
import asyncHandler from '../util/asyncHandler'
import CartModel from "../models/cart"

export default class CartController {
    router: Router
    private model: CartModel
    constructor(connection) {
        this.model = new CartModel(connection)
        this.router = express.Router()
        // add cart item
        this.router.post("/", asyncHandler(async (req, res) => {
            if (req.session.user_id === undefined) {
                res.status(403).send();
                return
            }
            let product_id = req.body.product_id, user_id = req.session.user_id
            let exists = await this.model.item_already_in_cart(product_id, user_id)
            if (exists) {
                res.status(400).send({'product_id':product_id,'msg':'item already added'})
                return
            }
            await this.model.addToCart(product_id, user_id)
            res.status(201).send({ 'product_id': product_id, 'user_id': user_id })
        }))
        // get cart item
        this.router.get("/", asyncHandler(async (req, res) => {
            if (req.session.user_id == undefined) {
                res.status(403).send('user not authenticated');
                return;
            }
            let data = await this.model.getCart(req.session.user_id)
            res.send(data)
        }))
        /*
        update cart item quantity
        
        /cart/ PUT
        
        {
            product_id:513,
            quantity:'down'
        }
        */
        this.router.put('/', asyncHandler(async (req, res) => {
            if (req.session.user_id == undefined) {
                res.status(403).send('user not authenticated');
                return;
            }
           let newquantity
            if (req.body.quantity === 'up')
            newquantity=await this.model.increase_cart_item_qunatity(req.body.product_id, req.session.user_id)
            else
            newquantity= await this.model.decrease_cart_item_qunatity(req.body.product_id, req.session.user_id)

            res.status(200).send({'quantity':newquantity})
        }))

        //clear cart 
        this.router.delete('/all', asyncHandler(async (req, res, next) => {
            if (!req.session.user_id) {
                res.status(403).send('user not authenticated')
                return
            }
            await this.model.clearCart(req.session.user_id)
            res.status(200).send({ 'user_id': req.session.user_id })
        }))
        //delete cart item
        this.router.delete('/', asyncHandler(async (req, res, next) => {
            if (!req.session.user_id) {
                res.status(403).send('user not authenticated')
                return
            }
            await this.model.removeFromCart(req.body.product_id, req.session.user_id)
            res.status(200).send({ 'product_id': req.body.product_id, 'user_id': req.session.user_id })
        }))

    }
}
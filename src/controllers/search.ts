import express from "express";
import { Router } from "express-serve-static-core";
import asyncHandler from '../util/asyncHandler'
import SearchModel from "../models/search"

export default class CartController {
    router: Router
    private model: SearchModel
    constructor() {
        this.model = new SearchModel()
        this.router = express.Router()

        // get search result
        this.router.get("/", asyncHandler(async (req, res) => {
            let products = await this.model.search(
                req.body.product_name,
                req.body.from_price,
                req.body.to_price,
                req.body.product_desc)
            res.send(products)
        }))
        // get search by name only result
        this.router.get("/:name", asyncHandler(async (req, res) => {
            let products = await this.model.search(
                req.params.name,
                null,
                null,
                null)
            res.send(products)
        }))
    }
}
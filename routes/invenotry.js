const express = require("express");
const inventoryRouter = express.Router();
const inventoryModel = require('../models/inventory');

inventoryRouter.get("/", async(req, res) => {
    let limit = 10;
    if (req.body.limit)
        limit = req.body.limit
    let data = await inventoryModel.getProducts(limit)
    res.send(data)
})
inventoryRouter.post("/cart", async(req, res) => {
    if (req.session.username == undefined) {
        res.status(401).send("please sign in first");
        return
    }
    await inventoryModel.addToCart(req.body.product_id, req.session.id)
    res.status(200).send()
})
inventoryRouter.get("/cart", async(req, res) => {
    if (req.session.username == undefined) {
        return null
    }
    let data = await inventoryModel.getCart(req.session.id)
    res.send(data)
})
module.exports = inventoryRouter
import express from "express";
import { Router } from "express-serve-static-core";
import InventoryModel from "../models/inventory"
import multer from 'multer'
import path from 'path'
import asyncHandler from "../util/asyncHandler";

export default class InventoryRouter {
    router: Router
    private model: InventoryModel
    private upload: any
    constructor(model: InventoryModel) {
        this.model = model
        this.router = express.Router()
        //setup multer 
        const image_storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/dynamic')
            }, filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
            }
        })
        this.upload = multer({
            storage: image_storage,
            fileFilter: function (req, file, cb) {
                var ext = path.extname(file.originalname).toLowerCase();
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return cb(new Error('Only images are allowed'))
                }
                cb(null, true)
            }, limits: {
                fileSize: 5 * 1024 * 1024
            }
        }).single('image')
        this.setupRouter()
    }
    private setupRouter() {

        //get inventory products
        this.router.get("/", asyncHandler(async (req, res) => {
            let limit = 25;
            if (req.body.limit)
                limit = req.body.limit
            let data = await this.model.get_products(limit)
            res.send(data)
        }))

        //add inventory product
        this.router.post('/', (req, res, next) => {
            this.upload(req, res, async (err: any) => {
                if (err) {
                    next(err)
                }
                else {
                    try {
                        let id = await this.model.add_product(req.body.product_name, req.body.price, req.body.product_desc, req.file.path)
                        res.send({ 'id': id })
                        //res.redirect(`/adminpanel`);
                    }
                    catch (err) {
                        next(err)
                    }
                }
            })
        })

        //edit product name
        this.router.put('/name', asyncHandler(async (req, res) => {
            await this.model.edit_product_price(req.body.product_id, req.body.product_name)
            res.send({
                'product_id': req.body.product_id,
                'product_name': req.body.product_name
            })
        }))

        //edit product price
        this.router.put('/price', asyncHandler(async (req, res) => {
            await this.model.edit_product_price(req.body.product_id, req.body.price)
            res.send({
                'product_id': req.body.product_id,
                'price': req.body.price
            })
        }))

        //delete product
        this.router.delete('/', asyncHandler(async (req, res) => {
            await this.model.delete_product(req.body.product_id)
            res.send({
                'product_id': req.body.product_id
            })
        }))


    }
}
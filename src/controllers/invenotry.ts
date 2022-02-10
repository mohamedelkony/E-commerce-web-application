import express from "express";
import { Router } from "express-serve-static-core";
import InventoryModel from "../models/inventory"
import multer from 'multer'
import path from 'path'
import asyncHandler from "../util/asyncHandler";

export default class InventoryController {
    router: Router
    private model: InventoryModel
    private upload: any
    constructor(connection) {
        this.model = new InventoryModel(connection)
        this.router = express.Router()
        //setup multer image storage
        const image_storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/dynamic')
            }, filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
            }
        })
        //setup multer
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

        //get products
        this.router.get("/", asyncHandler(async (req, res) => {
            let limit = 25;
            if (req.body.limit)
                limit = req.body.limit
            let data = await this.model.get_products(limit)
            res.send(data)
        }))

        //get product
        this.router.get("/:product_id", asyncHandler(async (req, res) => {
            let data = await this.model.getProduct(req.params.product_id)
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
                        res.send({ 'product_id': id });
                    }
                    catch (err) {
                        next(err)
                    }
                }
            })
        })

        //edit product name
        this.router.put('/name', asyncHandler(async (req, res) => {
           if(!req.body.product_id || !req.body.product_name)
           {
               res.status(400).send('Error invalid req body')
               return
           }
            await this.model.edit_product_name(req.body.product_id, req.body.product_name)
            res.send({
                'product_id': req.body.product_id,
                'product_name': req.body.product_name
            })
        }))

        //edit product price
        this.router.put('/price', asyncHandler(async (req, res) => {
            if(!req.body.product_id || !req.body.price)
            {
                res.status(400).send('Error invalid req body')
                return
            }
            
            await this.model.edit_product_price(req.body.product_id, req.body.price)
            res.send({
                'product_id': req.body.product_id,
                'price': req.body.price
            })
        }))

       //edit product description
       this.router.put('/description', asyncHandler(async (req, res) => {
        if(!req.body.product_id || !req.body.product_desc)
        {
            res.status(400).send('Error invalid req body')
            return
        }
        await this.model.edit_product_description(req.body.product_id, req.body.product_desc)
        res.send({
            'product_id': req.body.product_id,
            'product_desc': req.body.product_desc
        })
    }))

    //edit product quantity
    this.router.put('/quantity', asyncHandler(async (req, res) => {
        if(!req.body.product_id || !req.body.quantity||req.body.quantity<0)
        {
            res.status(400).send('Error invalid req body')
            return
        }
        
        await this.model.edit_product_quantity(req.body.product_id, req.body.quantity)
        res.send({
            'product_id': req.body.product_id,
            'quantity': req.body.quantity
        })
    }))
        //delete product
        this.router.delete('/', asyncHandler(async (req, res) => {
            if (!req.body.product_id) {
                res.status(400).send('bad request undefiend porduct_id')
                return
            }
            await this.model.delete_product(req.body.product_id)
            res.send({
                'product_id': req.body.product_id
            })
        }))
    }
}
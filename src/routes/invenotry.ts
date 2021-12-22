import express from "express";
import {  Router } from "express-serve-static-core";
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
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null,'./public/dynamic')
            }, filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
            }
        })
        this.upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {
                var ext = path.extname(file.originalname);
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
        this.router.get("/",asyncHandler( async (req, res) => {
            let limit = 25;
            if (req.body.limit)
                limit = req.body.limit
            let data = await this.model.getProducts(limit)
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
                        await this.model.addProduct(req.body.product_name, req.body.price, req.body.product_desc, req.file.path)
                        res.redirect(`/adminpanel`);
                    }
                    catch (err) {
                        next(err)
                    }
                }
            })
        })
    }
}
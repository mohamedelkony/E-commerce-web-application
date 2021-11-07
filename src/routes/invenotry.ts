import express from "express";
import { ParamsDictionary, Router } from "express-serve-static-core";
import InventoryModel from "../models/inventory"
import multer from 'multer'
import path from 'path'
import { ParsedQs } from "qs";

export default class InventoryRouter {
    router: Router;
    private model: InventoryModel;
    private upload: express.RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
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
        this.router.get("/", async (req, res) => {
            let limit = 25;
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
                res.status(401).send('user not authorized');
                return;
            }
            let data = await this.model.getCart(req.session.id)
            res.send(data)
        })
        this.router.delete('/cart', async (req, res, next) => {
            try {
                if (!req.session.username) res.status(401).send('user not logged in')
                await this.model.removeFromCart(req.body.product_id, req.sessionID)
                res.send()
            } catch (err) {
                next(err)
            }
        })
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
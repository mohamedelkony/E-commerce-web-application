"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventory_1 = __importDefault(require("../models/inventory"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
class InventoryController {
    constructor() {
        this.model = new inventory_1.default();
        this.router = express_1.default.Router();
        //setup multer image storage
        const image_storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/dynamic');
            }, filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        });
        //setup multer
        this.upload = (0, multer_1.default)({
            storage: image_storage,
            fileFilter: function (req, file, cb) {
                var ext = path_1.default.extname(file.originalname).toLowerCase();
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return cb(new Error('Only images are allowed'));
                }
                cb(null, true);
            }, limits: {
                fileSize: 5 * 1024 * 1024
            }
        }).single('image');
        /*
        
        get products
        
        /inventory?pageSize=15&pageNumber=2 GET
        
        */
        this.router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
            let pageSize = req.query.pageSize || 25;
            let pageNumber = req.query.pageNumber || 1;
            let data = await this.model.get_products(pageNumber, pageSize);
            res.send(data);
        }));
        //get product
        this.router.get("/:product_id", (0, asyncHandler_1.default)(async (req, res) => {
            let data = await this.model.getProduct(req.params.product_id);
            res.send(data);
        }));
        //add inventory product
        this.router.post('/', (req, res, next) => {
            this.upload(req, res, async (err) => {
                if (err) {
                    next(err);
                }
                else {
                    try {
                        let id = await this.model.add_product(req.body.product_name, req.body.price, req.body.product_desc, req.file.path);
                        res.send({ 'product_id': id });
                    }
                    catch (err) {
                        next(err);
                    }
                }
            });
        });
        //edit product name
        this.router.put('/name', (0, asyncHandler_1.default)(async (req, res) => {
            if (!req.body.product_id || !req.body.product_name) {
                res.status(400).send('Error invalid req body');
                return;
            }
            await this.model.edit_product_name(req.body.product_id, req.body.product_name);
            res.send({
                'product_id': req.body.product_id,
                'product_name': req.body.product_name
            });
        }));
        //edit product price
        this.router.put('/price', (0, asyncHandler_1.default)(async (req, res) => {
            if (!req.body.product_id || !req.body.price) {
                res.status(400).send('Error invalid req body');
                return;
            }
            await this.model.edit_product_price(req.body.product_id, req.body.price);
            res.send({
                'product_id': req.body.product_id,
                'price': req.body.price
            });
        }));
        //edit product description
        this.router.put('/description', (0, asyncHandler_1.default)(async (req, res) => {
            if (!req.body.product_id || !req.body.product_desc) {
                res.status(400).send('Error invalid req body');
                return;
            }
            await this.model.edit_product_description(req.body.product_id, req.body.product_desc);
            res.send({
                'product_id': req.body.product_id,
                'product_desc': req.body.product_desc
            });
        }));
        //edit product quantity
        this.router.put('/quantity', (0, asyncHandler_1.default)(async (req, res) => {
            if (!req.body.product_id || !req.body.quantity || req.body.quantity < 0) {
                res.status(400).send('Error invalid req body');
                return;
            }
            await this.model.edit_product_quantity(req.body.product_id, req.body.quantity);
            res.send({
                'product_id': req.body.product_id,
                'quantity': req.body.quantity
            });
        }));
        //delete product
        this.router.delete('/', (0, asyncHandler_1.default)(async (req, res) => {
            if (!req.body.product_id) {
                res.status(400).send('bad request undefiend porduct_id');
                return;
            }
            await this.model.delete_product(req.body.product_id);
            res.send({
                'product_id': req.body.product_id
            });
        }));
    }
}
exports.default = InventoryController;

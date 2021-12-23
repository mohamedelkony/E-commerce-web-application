"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
class InventoryRouter {
    constructor(model) {
        this.model = model;
        this.router = express_1.default.Router();
        //setup multer 
        const image_storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/dynamic');
            }, filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        });
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
        this.setupRouter();
    }
    setupRouter() {
        //get inventory products
        this.router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
            let limit = 25;
            if (req.body.limit)
                limit = req.body.limit;
            let data = await this.model.get_products(limit);
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
                        await this.model.add_product(req.body.product_name, req.body.price, req.body.product_desc, req.file.path);
                        res.redirect(`/adminpanel`);
                    }
                    catch (err) {
                        next(err);
                    }
                }
            });
        });
        //edit product name
        this.router.put('/name', (0, asyncHandler_1.default)(async (req, res) => {
            await this.model.edit_product_price(req.body.product_id, req.body.product_name);
        }));
        //edit product price
        this.router.put('/price', (0, asyncHandler_1.default)(async (req, res) => {
            await this.model.edit_product_price(req.body.product_id, req.body.price);
        }));
        //edit price name
        this.router.delete('/', (0, asyncHandler_1.default)(async (req, res) => {
            await this.model.delete_product(req.body.product_id);
        }));
    }
}
exports.default = InventoryRouter;

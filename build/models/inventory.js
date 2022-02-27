"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const db_1 = __importDefault(require("../util/db"));
class InventoryModel {
    /*
    @ param page :page number starting from 1
    */
    async get_products(page, size) {
        if (!page)
            page = 1;
        if (!size)
            size = 20;
        const { rows } = await db_1.default.query('select a.id as product_id,a.product_name,a.price,a.product_desc,b.url as image_url,b.image_name, a.quantity as quantity from inventory as a left join products_images as b on a.id=b.its_product_id  order by a.id limit $1 offset $2', [size.toString(), ((page - 1) * size).toString()]);
        return rows;
    }
    async add_product(name, price, desc, image_url) {
        let sql = `insert into inventory(product_name,price,product_desc) values($1,$2,$3) returning id as product_id`;
        let res = await db_1.default.query(sql, [name, price.toString(), desc]);
        let image_sql = 'insert into products_images(url,its_product_id,image_name) values($1,$2,$3)';
        // added '/ to image uri so it can be accessd from any page e.g. /public/dynamic/image.png
        await db_1.default.query(image_sql, ['/' + image_url, res.rows[0]['product_id'], null]);
        return res.rows[0]['product_id'];
    }
    async edit_product_name(product_id, product_name) {
        let sql = `update inventory set product_name=$1 where id=$2;`;
        await db_1.default.query(sql, [product_name, product_id]);
    }
    async edit_product_description(product_id, product_desc) {
        let sql = `update inventory set product_desc=$1 where id=$2;`;
        await db_1.default.query(sql, [product_desc, product_id]);
    }
    async edit_product_quantity(product_id, quantity) {
        let sql = `update inventory set quantity=$1 where id=$2;`;
        await db_1.default.query(sql, [quantity, product_id]);
    }
    async getProduct(product_id) {
        let sql = `select * from inventory where id=$1;`;
        let res = await db_1.default.query(sql, [product_id.toString()]);
        if (res.rowCount > 0)
            return res.rows[0];
        return null;
    }
    async edit_product_price(product_id, price) {
        let sql = `update inventory set price=$1 where id=$2;`;
        await db_1.default.query(sql, [price, product_id]);
    }
    async delete_product(product_id) {
        let image_uri_sql = `select url from products_images where its_product_id=$1;`;
        try {
            let res = await db_1.default.query(image_uri_sql, [product_id]);
            let image_uri = res.rows[0].url;
            /* erase appended forward slash from uri
                because it is save as "/public/dynamic/image_name.jpg"
            */
            image_uri = image_uri.substring(1, image_uri.length);
            await (0, promises_1.unlink)(image_uri);
        }
        catch (err) {
            console.log(err + 'product image deletion error');
        }
        let sql = `delete from inventory  where id=$1;`;
        await db_1.default.query(sql, [product_id]);
    }
}
exports.default = InventoryModel;

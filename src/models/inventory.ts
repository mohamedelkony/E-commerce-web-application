
import { unlink } from 'fs/promises';
import db from '../util/db';

export default class InventoryModel {
    
    /*
    @ param page :page number starting from 1
    */
    async get_products(page: number, size: number) {
        if (!page)
            page = 1
        if (!size)
            size = 20
        const { rows } = await db.query(
            'select a.id as product_id,a.product_name,a.price,a.product_desc,b.url as image_url,b.image_name, a.quantity as quantity from inventory as a left join products_images as b on a.id=b.its_product_id  order by a.id limit $1 offset $2', [size.toString(), ((page - 1) * size).toString()])
        return rows as any;
    }

    async add_product(name, price, desc, image_url) {
        let sql = `insert into inventory(product_name,price,product_desc) values($1,$2,$3) returning id as product_id`;
        let res = await db.query(sql, [name, price.toString(), desc])
        let image_sql = 'insert into products_images(url,its_product_id,image_name) values($1,$2,$3)';
        // added '/ to image uri so it can be accessd from any page e.g. /public/dynamic/image.png
         await db.query(image_sql, ['/' + image_url, (res.rows[0] as any).id, null])
        return (<any>res.rows[0]).product_id
    }
    async edit_product_name(product_id: number, product_name: string) {
        let sql = `update inventory set product_name=$1 where id=$2;`
        await db.query(sql, [product_name, product_id])
    }
    async edit_product_description(product_id: number, product_desc: string) {
        let sql = `update inventory set product_desc=$1 where id=$2;`
        await db.query(sql, [product_desc, product_id])
    }

    async edit_product_quantity(product_id: number, quantity: string) {
        let sql = `update inventory set quantity=$1 where id=$2;`
        await db.query(sql, [quantity, product_id])
    }
    async getProduct(product_id: number) {
        let sql = `select * from inventory where id=$1;`
        let res = await db.query(sql, [product_id.toString()])
        if (res.rowCount > 0)
            return res.rows[0] as any
        return null
    }
    async edit_product_price(product_id: number, price: number) {
        let sql = `update inventory set price=$1 where id=$2;`
        await db.query(sql, [price, product_id])
    }
    async delete_product(product_id: number) {
        let image_uri_sql = `select url from products_images where its_product_id=$1;`
        try {
            let res = await db.query(image_uri_sql, [product_id])
            let image_uri: string = (res.rows[0] as any).url
            /* erase appended forward slash from uri
                because it is save as "/public/dynamic/image_name.jpg"
            */
            image_uri = image_uri.substring(1, image_uri.length)
            await unlink(image_uri)
        } catch (err) {
            console.log(err + 'product image deletion error')
        }
        let sql = `delete from inventory  where id=$1;`
        await db.query(sql, [product_id])
    }
}

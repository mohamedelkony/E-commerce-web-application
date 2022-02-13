
import { unlink } from 'fs/promises';
import { start } from 'repl';
export default class InventoryModel {
    private pool
    constructor(connection) {
        this.pool = connection
    }
    /*
    @ param page :page number starting from 1
    */
    async get_products(page:number, size:number) {
        if (!page)
            page = 1
        if (!size)
            size = 20
        const [res] = await this.pool.execute(
            'select a.id as product_id,a.product_name,a.price,a.product_desc,b.url as image_url,b.image_name, a.quantity as quantity from inventory as a left join products_images as b on a.id=b.its_product_id  order by a.id limit ? offset ?',[size.toString(),((page-1)*size).toString()])
        return res;
    }

    async add_product(name, price, desc, image_url) {
        let sql = `insert into inventory(product_name,price,product_desc) values(?,?,?)`;
        let [res] = await this.pool.execute(sql, [name, price.toString(), desc])
        let [res2] = await this.pool.execute('select last_insert_id() as id')
        let image_sql = 'insert into products_images(url,its_product_id,image_name) values(?,?,?)';
        // added '/ to image uri so it can be accessd from any page e.g. /public/dynamic/image.png
        let [res3] = await this.pool.execute(image_sql, ['/' + image_url, res2[0].id, null])
        return res2[0].id
    }
    async edit_product_name(product_id: number, product_name: string) {
        let sql = `update inventory set product_name=? where id=?;`
        await this.pool.execute(sql, [product_name, product_id])
    }
    async edit_product_description(product_id: number, product_desc: string) {
        let sql = `update inventory set product_desc=? where id=?;`
        await this.pool.execute(sql, [product_desc, product_id])
    }

    async edit_product_quantity(product_id: number, quantity: string) {
        let sql = `update inventory set quantity=? where id=?;`
        await this.pool.execute(sql, [quantity, product_id])
    }
    async getProduct(product_id: number) {
        let sql = `select * from inventory where id=?;`
        let [res] = await this.pool.execute(sql, [product_id.toString()])
        if (res.length > 0)
            return res[0]
        return null
    }
    async edit_product_price(product_id: number, price: number) {
        let sql = `update inventory set price=? where id=?;`
        await this.pool.execute(sql, [price, product_id])
    }
    async delete_product(product_id: number) {
        let image_uri_sql = `select url from products_images where its_product_id=?;`
        try {
            let [res] = await this.pool.execute(image_uri_sql, [product_id])
            let image_uri: string = res[0].url
            /* erase appended forward slash from uri
                because it is save as "/public/dynamic/image_name.jpg"
            */
            image_uri = image_uri.substring(1, image_uri.length)
            await unlink(image_uri)
        } catch (err) {
            console.log(err + 'product image deletion error')
        }
        let sql = `delete from inventory  where id=?;`
        await this.pool.execute(sql, [product_id])
    }


}

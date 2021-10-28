import { DBConnector } from './connector'

export class InventoryModel {
    private conn: any = null
    constructor(connector: DBConnector) {
        this.conn = connector.connection
    }
    async getProducts(limit) {
        let thisLimit = limit;
        if (limit == undefined || limit == null)
            thisLimit = 10;
        const [res, fields] = await this.conn.execute(
            "select a.id as product_id,a.product_name,a.price,a.product_desc,a.quantity,b.url as image_url,b.image_name from inventory as a left join products_images as b on a.id=b.its_product_id order by a.price desc limit ?;", [thisLimit.toString()])
        return res;
    }

    async addToCart(product_id, session_id) {
        let sql = "insert into cart_item(product_id,session_id) values (?,?)"
        await this.conn.execute(sql, [product_id, session_id])
    }
    async getCart(session_id) {
        let sql = "select product_id,product_name,price,url as image_url,product_desc,image_name ,quantity from cart_item as a left join inventory as b on a.product_id=b.id left join products_images as c on a.product_id =c.its_product_id where session_id =?";
        const [res, fields] = await this.conn.execute(sql, [session_id])
        return res;
    }

    async removeFromCart(product_id:number, session_id:string) {
        let sql = "delete from cart_item where product_id =? and session_id=?"
         await this.conn.execute(sql, [product_id, session_id])
    }
}
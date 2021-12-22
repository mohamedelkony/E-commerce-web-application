import  DBConnector  from './connector'
export default class InventoryModel {
    private conn: any = null
    constructor(connector: DBConnector) {
        this.conn = connector.connection
    }
    async getProducts(limit) {
        let thisLimit = limit;
        if (limit == undefined || limit == null)
            thisLimit = 10;
        const [res] = await this.conn.execute(
            "select a.id as product_id,a.product_name,a.price,a.product_desc,b.url as image_url,b.image_name from inventory as a left join products_images as b on a.id=b.its_product_id order by a.price desc limit ?;", [thisLimit.toString()])
        return res;
    }

     async addProduct(name,price,desc,image_url)
    {
        let sql=`insert into inventory(product_name,price,product_desc) values(?,?,?)`;
        let[res]=await this.conn.execute(sql,[name,price.toString(),desc])
        let[res2]=await this.conn.execute('select last_insert_id() as id')
        let image_sql='insert into products_images(url,its_product_id,image_name) values(?,?,?)';
        // added '/ to image uri so it can be accessd from any page e.g. /public/dynamic/image.png
        let[res3]=await this.conn.execute(image_sql,['/'+image_url,res2[0].id,null])
    }

}

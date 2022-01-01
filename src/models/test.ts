export default class InventoryModel {
    private conn
    constructor(connection) {
        this.conn = connection
    }

    async get_quantity_in_inventory_of_cart_items(user_id) {
        let sql =
            `select a.quantity ,a.id as product_id
        from inventory as a
        inner join carts_items as b 
        on  a.id=b.product_id
        where user_id=?
        `
        let [res] = await this.conn.execute(sql, [user_id])
        return res;
    }

    async get_quantity_in_inventory_of_order_items(order_id) {
        let sql =
            `select quantity ,id as product_id from inventory where id in
        (
        select product_id  
        from orders_items as a
        inner join orders as b 
        on  b.id=a.order_id
        where order_id=?
        )
       `
        let [res] = await this.conn.execute(sql, [order_id])
        return res;
    }
    async calculate_order_total_price(order_id: number): Promise<number> {
        let sql = `
        select sum(b.price) as total_price
        from orders_items as a 
        inner join inventory as b
         on a.product_id=b.id 
         where order_id=?
        `
        let [res] = await this.conn.execute(sql, [order_id])
        return res[0].total_price
    }

    async get_random_product_id() {
        let [res] = await this.conn.execute('select id from inventory where quantity >1 limit 1;')
        return res[0].id
    }
}

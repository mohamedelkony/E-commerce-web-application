import db from '../util/db';
export default class TestModel {
    async get_quantity_in_inventory_of_cart_items(user_id:number) {
        let sql =
            `select a.quantity ,a.id as product_id
        from inventory as a
        inner join carts_items as b 
        on  a.id=b.product_id
        where user_id=$1
        `
        let {rows} = await db.query(sql, [user_id])
        return <any>rows 
    }

    async get_quantity_in_inventory_of_order_items(order_id) {
        let sql =
            `select quantity ,id as product_id from inventory where id in
        (
        select product_id  
        from orders_items as a
        inner join orders as b 
        on  b.id=a.order_id
        where order_id=$1
        )
       `
        let {rows} = await db.query(sql, [order_id])
        return <any>rows
    }
    async calculate_order_total_price(order_id: number): Promise<number> {
        let sql = `
        select sum(b.price) as total_price
        from orders_items as a 
        inner join inventory as b
         on a.product_id=b.id 
         where order_id=$1
        `
        let {rows} = await db.query(sql, [order_id])
        return rows[0]['total_price']
    }

    async get_random_product_id() {
            let {rows} = await db.query('select id as product_id from inventory  limit 1')
            let x=rows[0]['product_id']
            return x     
    }
}

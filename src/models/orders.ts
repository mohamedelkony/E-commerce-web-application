export default class OrdersModel {
    private pool
    constructor(connection) {
        this.pool = connection
    }
    async order_cart_items(user_id: number): Promise<boolean> {

        //start transaction
        let conn = await this.pool.getConnection()
        await conn.beginTransaction()
        try {
            //insert new empty order and get its id
            let insert_order_sql = `
            insert into orders(user_id,status)
            values (?,'shipping')`
            let [res] = await conn.execute(insert_order_sql, [user_id])
            let order_id = res.insertId

            let insert_order_items_sql = `
            insert into orders_items(order_id,quantity,product_id)
            select ?, quantity ,product_id from carts_items
            where user_id=?
            `
            await conn.execute(insert_order_items_sql, [order_id, user_id])

            let delete_cart_items_sql = `
            delete from carts_items
            where user_id=?
            and exists 
            (select product_id from orders_items where order_id=?)
            `
            await conn.execute(delete_cart_items_sql, [user_id, order_id])

            let edit_order_quantiity_sql = `
            update orders_items as a
            inner join inventory as b on a.product_id=b.id
            set a.quantity = if(a.quantity>b.quantity,b.quantity,a.quantity)
            where order_id=?  
            `
            await conn.execute(edit_order_quantiity_sql, [order_id])

            let deduct_inventory_quantiity_sql = `
            update inventory as a 
            inner join orders_items as b 
            on a.id=b.product_id
            set a.quantity=a.quantity -b.quantity 
            where order_id=?
            `
            await conn.execute(deduct_inventory_quantiity_sql, [order_id])



            let calculate_order_price_sql = 
            `update orders set total_price =
            (
            select ifnull (sum(b.price),0)
            from orders_items as a 
            inner join inventory as b
             on a.product_id=b.id 
             where order_id=?
             )
             where id=?`
            await conn.execute(calculate_order_price_sql, [order_id,order_id])
            
            await conn.commit()
            return order_id
        }
        catch (error) {
            await conn.rollback()
            throw error
        }

    }

    async get_all_orders(user_id: number):
        Promise<{ 'items': [], 'total_price': number, 'status': string }[]> {
        let get_orders_ids_sql = `
            select id,status,total_price from orders where user_id=?`
        let [orders_metadata] = await this.pool.execute(get_orders_ids_sql, [user_id])
        let orders = []
        for (let metadata of orders_metadata) {
            let get_order_details_sql = `
            select product_id,quantity from orders_items where order_id=?`
            let [order_items] = await this.pool.execute(get_order_details_sql, [metadata.id])
            let order: any = {}
            order.items = order_items
            order.status = metadata.status
            order.total_price = metadata.total_price
            orders.push(order)
        }
        return orders
    }
    async get_order(order_id: number):
        Promise<{ 'items': [], 'total_price': number, 'status': string }> {
        let get_order_details_sql = `
            select product_id,quantity from orders_items where order_id=?`
        let [order_items] = await this.pool.execute(get_order_details_sql, [order_id])
        let order: any = {}
        order.items = order_items
        let get_orders_ids_sql = `
            select status,total_price from orders where id=?`
        let [order_metadata] = await this.pool.execute(get_orders_ids_sql, [order_id])
        order.status = order_metadata[0].status
        order.total_price = order_metadata[0].total_price
        return order
    }

}
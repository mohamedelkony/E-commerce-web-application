"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../util/db"));
class OrdersModel {
    async order_cart_items(user_id) {
        //start transaction
        let client = await db_1.default.pool.connect();
        try {
            await client.query('BEGIN');
            //insert new empty order and get its id
            let insert_order_sql = `
            insert into orders(user_id,status)
            values ($1,'shipping') returning id as order_id`;
            let { rows } = await client.query(insert_order_sql, [user_id]);
            let order_id = rows[0]['order_id'];
            let insert_order_items_sql = `
            insert into orders_items(order_id,quantity,product_id)
            select $1, quantity ,product_id from carts_items
            where user_id=$2
            `;
            await client.query(insert_order_items_sql, [order_id, user_id]);
            let delete_cart_items_sql = `
            delete from carts_items
            where user_id=$1
            and exists 
            (select product_id from orders_items where order_id=$2)
            `;
            await client.query(delete_cart_items_sql, [user_id, order_id]);
            let edit_order_quantiity_sql = `
            update orders_items as a
set quantity = case when a.quantity>b.quantity then b.quantity else a.quantity end
from inventory as b 
where a.product_id=b.id and order_id=$1 
            `;
            await client.query(edit_order_quantiity_sql, [order_id]);
            let deduct_inventory_quantiity_sql = `
            update inventory as a 
            set quantity=a.quantity -b.quantity 
            from  orders_items as b 
            where  a.id=b.product_id
            and order_id=$1
            `;
            await client.query(deduct_inventory_quantiity_sql, [order_id]);
            let calculate_order_price_sql = `update orders set total_price =
            (
            select case when sum(b.price) is null then 0 else sum(b.price) end
            from orders_items as a 
            inner join inventory as b
             on a.product_id=b.id 
             where order_id=$1
             )
             where id=$2`;
            await client.query(calculate_order_price_sql, [order_id, order_id]);
            await client.query('commit');
            return order_id;
        }
        catch (error) {
            await client.query('rollback');
            throw error;
        }
        finally {
            client.release();
        }
    }
    async get_all_orders(user_id) {
        let get_orders_ids_sql = `
            select id from orders where user_id=$1`;
        let id_list = await db_1.default.query(get_orders_ids_sql, [user_id]);
        let orders = [];
        for (let row of id_list.rows)
            orders.push(await this.get_order(row['id']));
        return orders;
    }
    async get_order(order_id) {
        let get_order_details_sql = `
        select  a.product_id,a.quantity,b.price,b.product_desc,b.product_name,c.url as image_url
        from orders_items as a
        inner join inventory as b
        on a.product_id=b.id
        inner join products_images as c 
        on b.id=c.its_product_id 
         where order_id=$1`;
        let res1 = await db_1.default.query(get_order_details_sql, [order_id]);
        let order = {};
        order.items = (res1.rows);
        let get_orders_ids_sql = `
            select status,total_price from orders where id=$1`;
        let res2 = await db_1.default.query(get_orders_ids_sql, [order_id]);
        order.status = res2.rows[0]['status'];
        order.total_price = res2.rows[0]['total_price'];
        order.order_id = order_id;
        return order;
    }
}
exports.default = OrdersModel;

start transaction;

insert into orders(user_id,order_status,total)values (64,'init',0);
select (@order_id :=last_insert_id())as order_id ;

insert into orders_items(order_id,quantity,product_id)
select @order_id, quantity ,product_id from carts_items
where user_id=64;

delete from carts_items
where user_id=64
and exists 
(select product_id from orders_items where order_id=@order_id); 

update orders_items as a
inner join inventory as b on a.product_id=b.id
set a.quantity = if(a.quantity>b.quantity,b.quantity,a.quantity)
where order_id=@order_id;

update inventory as a 
inner join orders_items as b 
on a.id=b.product_id
set a.quantity=a.quantity -b.quantity 
where order_id=@order_id;

update orders set total_price =
(
select ifnull (sum(b.price),0)
from orders_items as a 
inner join inventory as b
 on a.product_id=b.id 
 where order_id=@order_id
 )
 where id=@order_id;

commit;
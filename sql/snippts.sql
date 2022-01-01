create table cart_item(
id int primary key auto_increment,
session_id  varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
product_id	int,
constraint fk_sess_id
foreign key(session_id) references sessions(session_id)
on delete set null
on update set null ,
constraint fk_product_id
foreign key(product_id) references inventory(id)
on delete set null
on update set null 
);

insert into products_images(url,its_product_id,image_name) values("dynamic\\4.jpg",4,"casio watch");
insert into inventory(product_name,price,product_desc) values("w1","599","class high copy");

select * from inventory;
select * from products_images;
select * from sessions;
select * from cart_item;
select * from users;
select * from inventory where quantity >1 limit 1;
select id from inventory where id=4;

select a.id,a.product_name,a.price,a.product_desc,a.quantity,b.url,b.image_name 
from inventory as a 
left join products_images as b
 on a.id=b.its_product_id;

select product_id,product_name,price,url,product_desc,image_name,quantity from cart_item as a
left join inventory as b 
on a.product_id=b.id
left join products_images as c
on a.product_id =c.its_product_id; 

select a.id,a.product_name,a.price,a.product_desc,a.quantity,b.url,b.image_name
from inventory as a
left join products_images as b
on a.id=b.its_product_id
where a.id in (select product_id from cart_item) ;

select id as user_id,username,email,gender,birthdate as birth from users where id=15;
select * from inventory where price between 25 and 500 order by product_name limit 25;
select * from inventory where  price <=50 and  price >= 10  order by product_name limit 25;
select * from inventory where  product_name like '%a%'    order by product_name limit 25;
select * from orders where user_id=64;
select * from orders_items;

select quantity from inventory where id in
        (
        select product_id  
        from orders_items as a
        inner join orders as b 
        on  b.id=a.order_id
        where order_id=1
	);
    
update products_images set url="\\dynamic\\4.jpg" where id=5;
update inventory set quantity =if(id%2=0,3,5) where id>0;


delete from carts_items where product_id =12 and session_id='124';
delete from carts_items where id>0;
delete from inventory where id>8;
delete from sessions where session_id="PlhuULp3-Qi8EUmhPPjzUrON-dIMQErN";
delete  from cart_item where id>0;

alter table cart_item
add unique (product_id,user_id);

alter table inventory
drop constraint inventory_ibfk_1;

alter table inventory
change  product_name product_name varchar(265);

alter table inventory
add foreign key(product_image_id) references products_images(id)
on delete set null on update cascade;

alter table inventory
alter quantity Set default 1;

alter table orders 
drop total;

alter table cart_item
drop constraint cart_item_ibfk_1;

alter table cart_item 
add foreign key (product_id) references inventory(id) on delete cascade on update cascade;

alter table cart_item 
add foreign key (user_id) references users(id) on delete cascade on update cascade;

alter table orders
rename column order_status to status;

alter table orders
add total_priec decimal(10,2);

describe inventory;

truncate cart_item;
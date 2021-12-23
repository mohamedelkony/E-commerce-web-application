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
insert into inventory(product_name,price,product_desc,quantity) values("watch","599","class high copy",3);

select * from inventory;
select * from products_images;
select * from sessions;
select * from cart_item;

delete from cart_item where product_id =12 and session_id='124';
delete from cart_item where id>0;

select a.id,a.product_name,a.price,a.product_desc,a.quantity,b.url,b.image_name from inventory as a left join products_images as b on a.id=b.its_product_id;

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

describe inventory;

delete from products_images where id=2;
delete from sessions where session_id="PlhuULp3-Qi8EUmhPPjzUrON-dIMQErN";
delete  from cart_item where id>0;

update products_images set url="\\dynamic\\4.jpg" where id=5;
update inventory set product_name="Fossil" where id=4;

alter table inventory
drop product_image_id;

alter table inventory
drop constraint inventory_ibfk_1;

alter table inventory
change  product_name product_name varchar(265);

alter table inventory
add foreign key(product_image_id) references products_images(id)
on delete set null on update cascade;

alter table cart_item 
drop session_id;

alter table cart_item
drop constraint cart_item_ibfk_1;

alter table cart_item 
add foreign key (product_id) references inventory(id) on delete cascade on update cascade;

alter table cart_item 
add foreign key (user_id) references users(id) on delete cascade on update cascade;

alter table cart_item
add user_id int;

create database convfourierDB;
use convfourierDB;

create table if not exists users(
	id int auto_increment primary key,
    username varchar(20) not null ,
    password varchar(1024) not null,
    email varchar(255) not null,
    birthdate date not null,
    gender varchar(10) not null
);

create table if not exists sessions(
session_id varchar(128) not null,
expires int unsigned not null,
data mediumtext,
primary key(session_id)
);
create table if not exists inventory (
id int not null primary key auto_increment,
product_name varchar(256) not null,
price decimal(10,2) not null,
product_desc text
);
create table if not exists products_images(
id int primary key auto_increment,
url varchar(1024) default null,
its_product_id int default null,
image_name varchar(256) default null,
foreign key (its_product_id) references inventory(id) on delete cascade on update cascade
);
create table if not exists cart_item(
id int primary key auto_increment,
user_id int,
product_id int default null,
foreign key (product_id)  references inventory(id) on delete set null on update set null,
foreign key (session_id) references sessions(session_id) on delete set null on update set null
);
create table if not exists logs(
value varchar(255) default null,
id int ,
foreign key(id) references users(id)
);
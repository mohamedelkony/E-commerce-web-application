create table if not exists users(
	id int auto_increment primary key,
    username varchar(20) not null ,
    password varchar(1024) not null,
    email varchar(255) not null,
    birthdate date not null,
    gender varchar(10) not null
);
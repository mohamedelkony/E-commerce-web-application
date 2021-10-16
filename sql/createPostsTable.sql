create table if not exists posts
(id int auto_increment primary key,
text varchar(10000),
image varchar(512),
owner int,
constraint post_to_user
foreign key(owner) references users(id)
on update cascade
on delete cascade
);

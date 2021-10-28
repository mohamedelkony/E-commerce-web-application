
create user if not exists 'nodejs' @'%' identified by 'nodejs';
grant all privileges on *.* to 'nodejs'@'%';
flush privileges;
show grants for 'nodejs';
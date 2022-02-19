-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: convfourierDB

--
-- Table structure for table  carts_items 
--
DROP TABLE IF EXISTS  carts_items ;
CREATE TABLE  carts_items  (
   id  serial,
   product_id  int DEFAULT NULL,
   user_id  int DEFAULT NULL,
   quantity  int NOT NULL DEFAULT 1,
  PRIMARY KEY ( id ),
  UNIQUE KEY  product_id  ( product_id , user_id ),
  KEY  user_id  ( user_id ),
  CONSTRAINT  carts_items_ibfk_2  FOREIGN KEY ( product_id ) REFERENCES  inventory  ( id ) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT  carts_items_ibfk_3  FOREIGN KEY ( user_id ) REFERENCES  users  ( id ) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Table structure for table  inventory 
--
DROP TABLE IF EXISTS  inventory ;
CREATE TABLE  inventory  (
   id  serial,
   product_name  text DEFAULT NULL,
   price  decimal(10,2) NOT NULL,
   product_desc  text,
   quantity  int NOT NULL DEFAULT 1,
  PRIMARY KEY ( id )
)

--
-- Table structure for table  orders 
--
DROP TABLE IF EXISTS  orders ;
CREATE TABLE  orders  (
   id serial,
   user_id  int DEFAULT NULL,
   status  text DEFAULT NULL,
   total_price  decimal(10,2) DEFAULT NULL,
  PRIMARY KEY ( id ),
  KEY  user_id  ( user_id ),
  CONSTRAINT  orders_ibfk_1  FOREIGN KEY ( user_id ) REFERENCES  users  ( id ) ON DELETE CASCADE ON UPDATE CASCADE
)

--
-- Table structure for table  orders_items 
--
DROP TABLE IF EXISTS  orders_items ;
CREATE TABLE  orders_items  (
   id  serial,
   order_id  int DEFAULT NULL,
   product_id  int DEFAULT NULL,
   quantity  int DEFAULT NULL,
  PRIMARY KEY ( id ),
  KEY  order_id  ( order_id ),
  KEY  product_id  ( product_id ),
  CONSTRAINT  orders_items_ibfk_1  FOREIGN KEY ( order_id ) REFERENCES  orders  ( id ) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT  orders_items_ibfk_2  FOREIGN KEY ( product_id ) REFERENCES  inventory  ( id ) ON DELETE CASCADE ON UPDATE CASCADE
)

--
-- Table structure for table  products_images 
--
DROP TABLE IF EXISTS  products_images ;
CREATE TABLE  products_images  (
   id  serial,
   url text DEFAULT NULL,
   its_product_id  int DEFAULT NULL,
   image_name  text DEFAULT NULL,
  PRIMARY KEY ( id ),
  KEY  its_product_id  ( its_product_id ),
  CONSTRAINT  products_images_ibfk_1  FOREIGN KEY ( its_product_id ) REFERENCES  inventory  ( id ) ON DELETE CASCADE ON UPDATE CASCADE
) 

--
-- Table structure for table  sessions 
--
DROP TABLE IF EXISTS  sessions ;
CREATE TABLE  sessions  (
   session_id  text NOT NULL,
   expires  int unsigned NOT NULL,
   data  mediumtext,
  PRIMARY KEY ( session_id )
) 

--
-- Table structure for table  users 
--
DROP TABLE IF EXISTS  users ;
CREATE TABLE  users  (
   id  serial,
   username  text NOT NULL,
   password  text NOT NULL,
   email  text NOT NULL,
   birthdate  date NOT NULL,
   gender  text NOT NULL,
  PRIMARY KEY ( id )
) 

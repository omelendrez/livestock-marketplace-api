DROP DATABASE `livestock-market`;

CREATE DATABASE IF NOT EXISTS `livestock-market`  /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE USER IF NOT EXISTS 'livestock-market-user'@'localhost' IDENTIFIED BY 'PHMJ16AP0W8R';

GRANT ALL PRIVILEGES ON * . * TO 'livestock-market-user'@'localhost';

FLUSH PRIVILEGES;

USE `livestock-market`;

DROP TABLE IF EXISTS `profiles`;

CREATE TABLE `profiles` (
    `id` tinyint NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `status_id` TINYINT DEFAULT '1',
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `user_status`;

CREATE TABLE `user_status` (
    `id` tinyint NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255),
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `phone` VARCHAR(255),
    `profile_id` TINYINT NOT NULL,
    `organization_id` INTEGER NOT NULL,
    `user_status_id` TINYINT DEFAULT '1',
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `organization_status`;

CREATE TABLE `organization_status` (
    `id` tinyint NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `organizations`;

CREATE TABLE `organizations` (
    `id` SMALLINT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `profile_id` TINYINT,
    `organization_status_id` TINYINT,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
    `id` smallint NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `category_id` SMALLINT,
    `stock` MEDIUMINT,
    `unit_price` MEDIUMINT,
    `seller_id` MEDIUMINT,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `order_status`;

CREATE TABLE `order_status` (
    `id` tinyint NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `status_message` VARCHAR(255),
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `buyer_id` MEDIUMINT NOT NULL,
    `seller_id` MEDIUMINT NOT NULL,
    `delivery_agent_id` MEDIUMINT,
    `order_status_id` TINYINT,
    `delivery_price` MEDIUMINT DEFAULT '0',
    `order_total` MEDIUMINT DEFAULT '0',
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `order_details`;

CREATE TABLE `order_details` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `date` DATETIME,
    `product_id` INT NOT NULL,
    `quantity` MEDIUMINT DEFAULT '0',
    `unit_price` MEDIUMINT DEFAULT '0',
    `total_price` INT DEFAULT '0',
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `order_tracking`;

CREATE TABLE `order_tracking` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `order_status_id` TINYINT,
    `user_id` MEDIUMINT NOT NULL,
    `date_time` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `rejection_reasons`;

CREATE TABLE `rejection_reasons` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `rejections`;

CREATE TABLE `rejections` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `rejected_reason_id` TINYINT,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `user_id` MEDIUMINT NOT NULL,
    `rating` TINYINT,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=74 DEFAULT CHARSET=UTF8MB4;

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Admin',1), (2,'Seller',1),(3, 'Buyer',1),(4, 'Delivery Agent',1);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user_status` WRITE;
/*!40000 ALTER TABLE `user_status` DISABLE KEYS */;
INSERT INTO `user_status` VALUES (1,'Unverified'), (2,'Active'),(3, 'Inactive'),(4, 'Suspended');
/*!40000 ALTER TABLE `user_status` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `organization_status` WRITE;
/*!40000 ALTER TABLE `organization_status` DISABLE KEYS */;
INSERT INTO `organization_status` VALUES (1,'Unverified'), (2,'Active'),(3, 'Inactive'),(4, 'Suspended');
/*!40000 ALTER TABLE `organization_status` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'Buyer bid','Waiting for seller to confirm'),(2,'Seller confirmed','Waiting for the buyer to chose delivery agent'),(3,'Seller rejected','Order rejected'),(4,'Buyer chosen delivery agent','Waiting for delivery agent to confirm'),(5,'Delivery agent accepted','Waiting for buyer to pay'),(6,'Delivery agent rejected','Waiting for the buyer to chose delivery agent'),(7,'Buyer paid','Waiting for delivery agent to pick item'),(8,'Delivery picked item','Waitign for delivery agent to deliver item'),(9,'Item delivered to buyer','Order closed');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `rejection_reasons` WRITE;
/*!40000 ALTER TABLE `rejection_reasons` DISABLE KEYS */;
INSERT INTO `rejection_reasons` VALUES (1,'No reason'),(2,'Lack of stock'),(3,"Doesn't like buyer");
/*!40000 ALTER TABLE `rejection_reasons` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'abc@gmail.com','Demo Farmers Owerri','0817778999',2,1),(2,'bcd@hotmail.com','Transport Mufasa','0839482281',4,1),(3,'farmers.marketplace@gmail.com','Farmers Marketplace','0949494949',1,1),(4,'','Buyers','',3,1);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mike@gmail.com','123', 'Michael','Ogbona','0817778999',2,1,2),(2,'louis@hotmail.com','123', 'Louis','Friday','0494857576',2,1,2),(3,'joseph@yahoo.com','123', 'Jo','Kenneth','0894848483',4,2,2),(4,'ndubuisi@mail.com','123', 'Ndubuisi','','0949494949',1,3,2),(5,'mr.buyer@yahoo.com','123', '','','0756565642',3,4,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Fish'),(2,'Chicken'),(3,'Goat'),(4,'Cow');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Breeders','Small fishes',1,10,10,1),(2,'Broiler','Big Broiler',2,30,4000,1),(3,'Ram','Big Ram',3,5,75000,1),(4,'Bull','Bull',4,60,250000,1),(5,'Old Layer','Old layer',2,100,4500,2),(6,'Native Goat','Native Goat',3,60,60000,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,5,1,null,3,1500,76500),(2,5,1,3,6,25000,275000),(3,5,1,3,5,4000,44000);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,'2022-11-20',3,1,75000,75000),(2,2,'2022-11-20',4,1,250000,250000),(3,3,'2022-11-20',2,10,4000,40000);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `order_tracking` WRITE;
/*!40000 ALTER TABLE `order_tracking` DISABLE KEYS */;
INSERT INTO `order_tracking` VALUES (1,1,1,5,'2022-11-20 16:30:00'),(2,1,3,1,'2022-11-20 16:40:00'),(3,2,1,5,'2022-11-20 17:00:00'),(4,2,2,1,'2022-11-20 17:10:00'),(5,2,4,5,'2022-11-20 17:11:00'),(6,2,6,3,'2022-11-20 17:15:00'),(7,3,1,5,'2022-11-20 17:15:00'),(8,3,3,2,'2022-11-23 08:00:00'),(9,3,4,5,'2022-11-23 08:04:00'),(10,3,5,3,'2022-11-23 08:04:00');
/*!40000 ALTER TABLE `order_tracking` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `rejections` WRITE;
/*!40000 ALTER TABLE `rejections` DISABLE KEYS */;
INSERT INTO `rejections` VALUES (1,1,1),(2,2,1);
/*!40000 ALTER TABLE `rejections` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,1,1,4),(2,1,3,5),(3,1,5,2);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;


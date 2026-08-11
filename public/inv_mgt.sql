-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: inv_mgt
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Beauty','Makeup, skincare, haircare and glow-up products','2018-03-12 04:45:00'),(2,'Electronics','All products that run on electricity or batteries','2017-06-22 09:00:00'),(3,'Clothing','Apparel for men, women and kids','2016-11-05 04:15:00'),(4,'Home & Kitchen','Cookware, utensils, home d├⌐cor and appliances','2019-01-18 05:50:00'),(5,'Sports','Fitness equipment, activewear and outdoor gear','2018-08-30 10:30:00'),(6,'Books','Fiction, non-fiction, educational and children?s books','2015-04-14 02:40:00'),(7,'Toys','Toys, games and educational play items for all ages','2017-09-25 08:10:00'),(8,'Grocery','Food items, oils, spices and daily essentials','2016-02-28 06:35:00'),(9,'Accessories','Fashion accessories, bags, belts and small gadgets','2019-07-11 09:55:00'),(10,'Footwear','Shoes, sandals, slippers and sports footwear','2018-12-03 05:20:00'),(11,'Health & Wellness','Supplements, personal care and wellness products','2020-05-19 03:45:00'),(12,'Stationery','Office and school supplies, notebooks and pens','2017-03-08 08:30:00'),(13,'Pet Supplies','Food, toys and accessories for pets','2019-10-22 06:05:00'),(14,'Baby Care','Products for infants and toddlers','2018-01-30 11:15:00'),(15,'Automotive','Car accessories, oils and maintenance products','2016-07-17 03:25:00'),(16,'Gardening','Tools, plants, soil and outdoor gardening items','2020-02-14 07:50:00'),(17,'Jewelry','Fashion and imitation jewelry','2019-04-09 04:35:00'),(18,'Bags & Luggage','Backpacks, suitcases and travel bags','2017-11-28 10:10:00'),(19,'Lighting','LED bulbs, lamps and decorative lighting','2018-06-15 06:55:00'),(20,'Furniture','Home and office furniture items','2015-09-01 04:00:00'),(21,'Watches','Wrist watches and smartwatches','2019-08-26 08:45:00'),(22,'Musical Instruments','Guitars, keyboards and related accessories','2016-12-19 06:20:00'),(23,'Camera & Photography','Cameras, lenses and photography gear','2020-03-07 10:40:00'),(24,'Gaming','Consoles, controllers and gaming accessories','2018-05-23 03:10:00'),(25,'Personal Care','Toiletries, oral care and hygiene products','2017-10-11 08:25:00'),(26,'Kitchen Appliances','Mixers, blenders, microwave and small appliances','2019-02-27 04:50:00'),(27,'Outdoor & Camping','Tents, sleeping bags and camping equipment','2016-04-05 09:30:00'),(28,'Art & Craft','Paints, brushes, craft kits and DIY materials','2018-09-14 07:05:00'),(29,'Office Supplies','Printers, paper, binders and office essentials','2015-12-20 03:35:00'),(30,'Seasonal','Festival and seasonal decoration items','2020-11-08 09:20:00');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `purchase_cost` varchar(50) DEFAULT NULL,
  `sell_price` varchar(50) DEFAULT NULL,
  `quantity` varchar(50) DEFAULT NULL,
  `mls` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Amul Milk 1L','MIL-001','Grocery','20.00','50.00','132','1000'),(2,'Wireless Bluetooth Earbuds','SKU-1001','Electronics','450.00','699.00','120','0'),(3,'Smart LED TV 43 Inch','SKU-1002','Electronics','18500.00','24999.00','35','0'),(4,'Cotton Round Neck T-Shirt','SKU-1003','Clothing','180.00','399.00','250','0'),(5,'Mens Slim Fit Jeans','SKU-1004','Clothing','650.00','1299.00','180','0'),(6,'Non-Stick Frying Pan 28cm','SKU-1005','Home & Kitchen','420.00','799.00','95','0'),(7,'Electric Kettle 1.5L','SKU-1006','Home & Kitchen','550.00','999.00','140','1500'),(8,'Vitamin C Face Serum 30ml','SKU-1007','Beauty','320.00','599.00','300','30'),(9,'Herbal Hair Oil 200ml','SKU-1008','Beauty','180.00','349.00','250','200'),(10,'Yoga Mat 6mm Anti-Slip','SKU-1009','Sports','450.00','899.00','110','0'),(11,'Dumbbell Set 10kg Pair','SKU-1010','Sports','1200.00','1899.00','59','0'),(12,'Atomic Habits Paperback','SKU-1011','Books','250.00','450.00','200','0'),(13,'The Psychology of Money','SKU-1012','Books','220.00','399.00','165','0'),(14,'Remote Control Racing Car','SKU-1013','Toys','650.00','1199.00','90','0'),(15,'Building Blocks Set 120 Pcs','SKU-1014','Toys','480.00','899.00','150','0'),(16,'Organic Honey 500g','SKU-1015','Grocery','280.00','449.00','400','0'),(17,'Cold Pressed Coconut Oil 1L','SKU-1016','Grocery','320.00','499.00','350','1000'),(18,'USB-C Fast Charger 65W','SKU-1017','Electronics','550.00','999.00','180','0'),(19,'Noise Cancelling Headphones','SKU-1018','Electronics','3200.00','4999.00','45','0'),(20,'Womens Casual Kurti','SKU-1019','Clothing','350.00','699.00','130','0'),(21,'Cotton Bedsheet Double','SKU-1020','Home & Kitchen','680.00','1299.00','85','0'),(22,'Aloe Vera Gel 150ml','SKU-1021','Beauty','120.00','249.00','310','150'),(23,'Protein Powder 1kg Chocolate','SKU-1022','Sports','1450.00','2299.00','70','0'),(24,'Rich Dad Poor Dad','SKU-1023','Books','200.00','350.00','190','0'),(25,'Soft Plush Teddy Bear','SKU-1024','Toys','380.00','699.00','120','0'),(26,'Basmati Rice 5kg','SKU-1025','Grocery','450.00','699.00','280','0'),(27,'Stainless Steel Water Bottle 750ml','SKU-1026','Home & Kitchen','280.00','499.00','200','750'),(28,'Wireless Mouse Ergonomic','SKU-1027','Electronics','350.00','649.00','160','0'),(29,'Mens Formal Shirt','SKU-1028','Clothing','480.00','999.00','95','0'),(30,'Face Wash Green Tea 100ml','SKU-1029','Beauty','160.00','299.00','275','100'),(31,'Resistance Band Set','SKU-1030','Sports','320.00','599.00','140','0'),(32,'Ikigai Hardcover','SKU-1031','Books','280.00','499.00','110','0'),(33,'Educational Puzzle 1000 Pcs','SKU-1032','Toys','420.00','799.00','75','0'),(34,'Green Tea Bags 100s','SKU-1033','Grocery','180.00','349.00','320','0'),(35,'Power Bank 20000mAh','SKU-1034','Electronics','980.00','1599.00','90','0'),(36,'Womens Running Shoes','SKU-1035','Sports','1450.00','2499.00','55','0'),(37,'Moisturizing Body Lotion 400ml','SKU-1036','Beauty','220.00','399.00','185','400'),(38,'Ceramic Dinner Set 16 Pcs','SKU-1037','Home & Kitchen','1250.00','2199.00','40','0'),(39,'Kids Story Book Collection','SKU-1038','Books','350.00','599.00','130','0'),(40,'Action Figure Superhero','SKU-1039','Toys','290.00','549.00','160','0'),(41,'Olive Oil Extra Virgin 500ml','SKU-1040','Grocery','380.00','599.00','210','500'),(42,'LG Smart TV 55 Inch','LGTV-0078','Electronics','68000.00','84999.00','20','0'),(43,'Leather Wallet Mens','SKU-1041','Accessories','450.00','899.00','145','0'),(44,'Sports Cap Adjustable','SKU-1042','Accessories','120.00','249.00','220','0'),(45,'Running Shoes Mens','SKU-1043','Footwear','1350.00','2299.00','80','0'),(46,'Multivitamin Tablets 60s','SKU-1044','Health & Wellness','280.00','499.00','190','0'),(47,'Notebook A4 200 Pages','SKU-1045','Stationery','80.00','149.00','500','0'),(48,'Dog Food Dry 2kg','SKU-1046','Pet Supplies','450.00','749.00','110','0'),(49,'Baby Diaper Pack Large','SKU-1047','Baby Care','520.00','899.00','95','0'),(50,'Car Phone Holder','SKU-1048','Automotive','180.00','349.00','175','0');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `cost_per_unit` decimal(10,2) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `purchase_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,1,9,30,180.00,5400.00,'2019-08-10 19:23:57'),(2,3,2,50,450.00,22500.00,'2018-03-15 04:50:00'),(3,4,8,100,320.00,32000.00,'2019-05-22 09:05:00'),(4,5,4,200,180.00,36000.00,'2017-11-08 03:45:00'),(5,6,6,40,420.00,16800.00,'2018-07-19 11:10:00'),(6,7,10,60,450.00,27000.00,'2019-02-28 06:20:00'),(7,8,12,150,250.00,37500.00,'2016-09-12 07:55:00'),(8,9,14,80,650.00,52000.00,'2018-12-05 03:15:00'),(9,10,16,120,280.00,33600.00,'2017-04-18 09:40:00'),(10,11,18,90,550.00,49500.00,'2019-08-30 05:00:00'),(11,12,36,40,1450.00,58000.00,'2018-01-22 06:30:00'),(12,13,23,50,1450.00,72500.00,'2019-10-14 08:50:00'),(13,14,47,300,80.00,24000.00,'2017-06-03 04:10:00'),(14,15,48,70,450.00,31500.00,'2018-09-27 10:45:00'),(15,16,49,60,520.00,31200.00,'2019-03-11 05:35:00'),(16,17,50,100,180.00,18000.00,'2016-12-20 08:20:00'),(17,18,7,45,550.00,24750.00,'2018-05-07 02:55:00'),(18,19,43,80,450.00,36000.00,'2019-07-25 10:05:00'),(19,20,45,55,1350.00,74250.00,'2017-10-09 05:25:00'),(20,21,35,70,980.00,68600.00,'2018-11-16 07:10:00'),(21,22,38,25,1250.00,31250.00,'2019-01-30 08:40:00'),(22,23,3,15,18500.00,277500.00,'2016-08-14 03:50:00'),(23,24,19,30,3200.00,96000.00,'2018-02-26 11:15:00'),(24,25,11,40,1200.00,48000.00,'2019-06-18 06:00:00'),(25,26,15,90,480.00,43200.00,'2017-12-01 07:45:00'),(26,27,22,150,120.00,18000.00,'2018-04-23 03:20:00'),(27,28,27,100,280.00,28000.00,'2019-09-05 09:35:00'),(28,29,31,80,320.00,25600.00,'2016-05-29 05:10:00'),(29,30,33,50,420.00,21000.00,'2018-08-12 06:55:00'),(30,1,37,70,220.00,15400.00,'2019-11-20 09:25:00'),(31,2,41,90,380.00,34200.00,'2017-03-07 03:40:00'),(32,3,28,120,350.00,42000.00,'2018-10-28 11:00:00'),(33,4,30,200,160.00,32000.00,'2019-04-16 06:15:00'),(34,5,20,100,350.00,35000.00,'2016-07-21 07:50:00'),(35,6,21,50,680.00,34000.00,'2018-01-09 03:05:00'),(36,7,23,35,1450.00,50750.00,'2019-12-03 10:20:00'),(37,8,24,180,200.00,36000.00,'2017-09-14 04:45:00'),(38,9,25,110,380.00,41800.00,'2018-06-30 06:30:00'),(39,10,26,150,450.00,67500.00,'2019-02-14 09:10:00'),(40,11,42,10,68000.00,680000.00,'2017-11-25 03:55:00');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer` varchar(150) NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `selling_price` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `sale_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,'Harsh Shukla',11,1,1899.00,1899.00,'2019-08-10 19:40:33'),(2,'Ravi Mehta',2,2,699.00,1398.00,'2018-04-12 04:45:00'),(3,'Priya Singh',8,3,599.00,1797.00,'2019-06-25 09:10:00'),(4,'Amit Patel',4,5,399.00,1995.00,'2017-12-08 04:00:00'),(5,'Sneha Reddy',6,1,799.00,799.00,'2018-08-19 10:35:00'),(6,'Vikram Joshi',10,2,899.00,1798.00,'2019-03-14 05:50:00'),(7,'Anjali Nair',12,4,450.00,1800.00,'2016-10-05 08:15:00'),(8,'Rohit Kapoor',14,1,1199.00,1199.00,'2018-01-22 03:25:00'),(9,'Kavita Sharma',16,3,449.00,1347.00,'2017-05-17 09:40:00'),(10,'Suresh Kumar',18,2,999.00,1998.00,'2019-09-09 05:05:00'),(11,'Meera Das',36,1,2499.00,2499.00,'2018-02-28 07:20:00'),(12,'Arjun Iyer',23,2,2299.00,4598.00,'2019-11-03 08:45:00'),(13,'Pooja Verma',47,10,149.00,1490.00,'2017-07-21 04:10:00'),(14,'Karan Malhotra',48,1,749.00,749.00,'2018-10-16 10:55:00'),(15,'Divya Rao',49,2,899.00,1798.00,'2019-04-07 06:20:00'),(16,'Nikhil Shah',50,3,349.00,1047.00,'2016-12-29 07:35:00'),(17,'Shreya Bose',7,1,999.00,999.00,'2018-06-11 02:50:00'),(18,'Aditya Menon',43,2,899.00,1798.00,'2019-08-24 10:05:00'),(19,'Riya Chatterjee',45,1,2299.00,2299.00,'2017-11-13 04:30:00'),(20,'Manish Tiwari',35,1,1599.00,1599.00,'2018-12-20 07:10:00'),(21,'Tanvi Desai',38,1,2199.00,2199.00,'2019-01-15 09:25:00'),(22,'Siddharth Bose',3,1,24999.00,24999.00,'2016-09-02 03:45:00'),(23,'Neha Gupta',19,1,4999.00,4999.00,'2018-03-27 11:00:00'),(24,'Rahul Verma',11,2,1899.00,3798.00,'2019-07-08 06:15:00'),(25,'Priya Sharma',15,3,899.00,2697.00,'2017-01-19 07:50:00'),(26,'Amit Kumar',22,5,249.00,1245.00,'2018-05-04 03:20:00'),(27,'Sneha Patel',27,2,499.00,998.00,'2019-10-22 09:35:00'),(28,'Vikram Singh',31,3,599.00,1797.00,'2016-06-15 05:00:00'),(29,'Anjali Mehta',33,1,799.00,799.00,'2018-09-28 06:45:00'),(30,'Rohit Joshi',37,2,399.00,798.00,'2019-12-11 09:10:00'),(31,'Kavita Reddy',41,3,599.00,1797.00,'2017-04-03 03:30:00'),(32,'Suresh Nair',28,4,649.00,2596.00,'2018-11-17 10:50:00'),(33,'Meera Iyer',30,6,299.00,1794.00,'2019-05-29 06:05:00'),(34,'Arjun Das',20,2,699.00,1398.00,'2016-08-07 08:20:00'),(35,'Pooja Malhotra',21,1,1299.00,1299.00,'2018-02-14 02:55:00'),(36,'Karan Kapoor',9,4,349.00,1396.00,'2019-09-18 10:10:00'),(37,'Divya Rao',13,3,399.00,1197.00,'2017-10-26 04:35:00'),(38,'Nikhil Shah',25,2,699.00,1398.00,'2018-07-09 07:00:00'),(39,'Shreya Banerjee',26,5,699.00,3495.00,'2019-03-21 08:45:00'),(40,'Aditya Menon',42,1,84999.00,84999.00,'2017-12-15 04:20:00'),(41,'Riya Chatterjee',1,10,50.00,500.00,'2018-04-30 10:40:00'),(42,'Manish Tiwari',5,3,1299.00,3897.00,'2019-06-12 05:55:00'),(43,'Tanvi Desai',17,2,499.00,998.00,'2016-11-28 08:10:00'),(44,'Siddharth Bose',29,2,999.00,1998.00,'2018-08-05 03:25:00'),(45,'Harsh Shukla',39,4,599.00,2396.00,'2019-11-27 09:50:00');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Bhupendra Jogi','9998882222','bhupendar123@gmail.com','abc apt, def road, mumbai, maharashtra','2017-05-12 04:30:00'),(2,'Aditya Kumar','7982095837','aditya123@gmail.com','darbhanga, bihar, india','2018-08-19 09:00:00'),(3,'Rajesh Electronics','9876543210','rajesh.electronics@gmail.com','Shop 12, Nehru Place, New Delhi','2016-03-22 03:45:00'),(4,'Beauty World Traders','9123456780','beautyworld@outlook.com','45, Linking Road, Bandra West, Mumbai','2019-01-08 06:15:00'),(5,'Fashion Hub India','9988776655','fashionhub@india.com','Sector 18, Noida, Uttar Pradesh','2017-11-30 10:50:00'),(6,'Home Essentials Co.','9876501234','homeessentials@gmail.com','Industrial Area, Phase 2, Chandigarh','2018-04-15 03:20:00'),(7,'Sports Gear Wholesale','9765432109','sportsgear@wholesale.in','Baner Road, Pune, Maharashtra','2019-07-03 07:40:00'),(8,'Book World Distributors','9654321098','bookworld@dist.com','College Street, Kolkata, West Bengal','2015-09-25 05:05:00'),(9,'Toy Kingdom Suppliers','9543210987','toykingdom@suppliers.com','MG Road, Bengaluru, Karnataka','2018-12-11 09:30:00'),(10,'Organic Groceries Ltd','9432109876','organicgroceries@ltd.in','Whitefield, Bengaluru, Karnataka','2016-06-18 06:55:00'),(11,'Tech Accessories Mart','9321098765','techacc@mart.com','Cyber City, Gurgaon, Haryana','2019-03-29 04:10:00'),(12,'Footwear Factory Outlet','9210987654','footwearfactory@outlet.in','Agra Road, Agra, Uttar Pradesh','2017-08-07 09:25:00'),(13,'Wellness Products Inc','9109876543','wellness@inc.com','Andheri East, Mumbai, Maharashtra','2018-10-21 05:45:00'),(14,'Stationery World','9098765432','stationeryworld@gmail.com','Chandni Chowk, Delhi','2016-01-14 11:15:00'),(15,'Pet Care Distributors','8987654321','petcare@dist.com','Koramangala, Bengaluru','2019-05-16 02:50:00'),(16,'Baby Care India','8876543210','babycareindia@gmail.com','Salt Lake, Kolkata','2017-12-04 08:00:00'),(17,'Auto Parts Hub','8765432109','autopartshub@gmail.com','Pimpri, Pune, Maharashtra','2018-02-28 04:40:00'),(18,'Green Garden Supplies','8654321098','greengarden@supplies.in','Sector 62, Noida','2019-09-12 09:55:00'),(19,'Sparkle Jewelry Co','8543210987','sparklejewelry@co.in','Zaveri Bazaar, Mumbai','2016-10-09 06:30:00'),(20,'Travel Bags Wholesale','8432109876','travelbags@wholesale.com','Commercial Street, Bengaluru','2018-06-25 04:20:00'),(21,'Bright Lighting Solutions','8321098765','brightlighting@solutions.in','Industrial Estate, Ahmedabad','2017-04-17 08:45:00'),(22,'Comfort Furniture Ltd','8210987654','comfortfurniture@ltd.com','Furniture Market, Jodhpur','2019-11-01 06:10:00'),(23,'Timepiece Traders','8109876543','timepiece@traders.in','Connaught Place, New Delhi','2015-07-23 10:35:00'),(24,'Melody Music House','8098765432','melodymusic@house.com','T. Nagar, Chennai','2018-09-08 03:05:00'),(25,'Focus Camera Gear','7987654321','focuscamera@gear.in','Park Street, Kolkata','2019-12-19 08:20:00'),(26,'Game Zone Distributors','7876543210','gamezone@dist.com','Hitech City, Hyderabad','2017-02-11 04:55:00'),(27,'Daily Care Products','7765432109','dailycare@products.in','Borivali West, Mumbai','2018-07-30 09:45:00'),(28,'Kitchen Pro Appliances','7654321098','kitchenpro@appliances.com','Electronic City, Bengaluru','2016-05-06 07:10:00'),(29,'Adventure Outdoor Co','7543210987','adventureoutdoor@co.in','Manali Road, Himachal Pradesh','2019-04-22 03:30:00'),(30,'Creative Art Supplies','7432109876','creativeart@supplies.com','Artists Colony, Jaipur','2017-10-15 08:50:00');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','manager','staff') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'harsh','harsh123@gmail.com','$2b$10$bTUhpVpelsIKkwgFXt0JmuECrLA0J2jgoWLOj86NKc1vNbj1oalzK','admin','2018-08-09 08:08:45'),(2,'Pankaj Rauniyar','pankaj123@gmail.com','$2b$10$ktPJKRiupECNajKV99VqBOaszK6D0sbhXGfBodDG/2tEtCwZ8yroW','manager','2019-08-09 08:17:55'),(3,'abhay rauniyar','abhay123@gmail.com','$2b$10$yVRJ7XaqHiTV/gYE1TtiU.9ztrNXG5VEX1sS.dVAIOX2mN1vq60Oe','staff','2020-08-09 08:23:29'),(4,'Priya Sharma','priya.sharma@gmail.com','$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEF','manager','2017-03-15 04:50:00'),(5,'Rahul Verma','rahul.verma@outlook.com','$2b$10$bcdefghijklmnopqrstuvwxyz1234567890ABCDEFG','staff','2018-06-22 09:15:00'),(6,'Sneha Patel','sneha.patel@yahoo.com','$2b$10$cdefghijklmnopqrstuvwxyz1234567890ABCDEFGH','staff','2019-01-10 03:45:00'),(7,'Amit Kumar','amit.kumar@gmail.com','$2b$10$defghijklmnopqrstuvwxyz1234567890ABCDEFGHI','manager','2016-11-05 11:00:00'),(8,'Neha Gupta','neha.gupta@hotmail.com','$2b$10$efghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ','staff','2020-04-18 06:20:00'),(9,'Vikram Singh','vikram.singh@gmail.com','$2b$10$fghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK','admin','2015-09-28 03:10:00'),(10,'Anjali Mehta','anjali.mehta@gmail.com','$2b$10$ghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKL','staff','2018-12-03 07:55:00'),(11,'Rohit Joshi','rohit.joshi@outlook.com','$2b$10$hijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLM','manager','2017-07-19 09:40:00'),(12,'Kavita Reddy','kavita.reddy@yahoo.com','$2b$10$ijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMN','staff','2019-05-27 04:35:00'),(13,'Suresh Nair','suresh.nair@gmail.com','$2b$10$jklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNO','staff','2016-02-14 07:10:00'),(14,'Meera Iyer','meera.iyer@hotmail.com','$2b$10$klmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOP','manager','2018-09-08 04:25:00'),(15,'Arjun Das','arjun.das@gmail.com','$2b$10$lmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQ','staff','2020-01-21 08:50:00'),(16,'Pooja Malhotra','pooja.malhotra@outlook.com','$2b$10$mnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQR','staff','2017-10-16 06:05:00'),(17,'Karan Kapoor','karan.kapoor@gmail.com','$2b$10$nopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRS','manager','2019-08-02 10:30:00'),(18,'Divya Rao','divya.rao@yahoo.com','$2b$10$opqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRST','staff','2015-12-11 02:55:00'),(19,'Nikhil Shah','nikhil.shah@gmail.com','$2b$10$pqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTU','staff','2018-04-29 08:20:00'),(20,'Shreya Banerjee','shreya.banerjee@hotmail.com','$2b$10$qrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUV','manager','2016-08-07 04:45:00'),(21,'Aditya Menon','aditya.menon@gmail.com','$2b$10$rstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVW','staff','2019-11-14 10:10:00'),(22,'Riya Chatterjee','riya.chatterjee@outlook.com','$2b$10$stuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWX','staff','2017-01-25 06:35:00'),(23,'Manish Tiwari','manish.tiwari@gmail.com','$2b$10$tuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXY','manager','2018-06-13 04:00:00'),(24,'Tanvi Desai','tanvi.desai@yahoo.com','$2b$10$uvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ','staff','2020-03-09 09:25:00'),(25,'Siddharth Bose','siddharth.bose@gmail.com','$2b$10$vwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZa','staff','2016-09-20 05:40:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-11  8:12:00

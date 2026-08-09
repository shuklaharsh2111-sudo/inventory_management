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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Amul Milk','MIL-001','accessories','20','50','132','20'),(2,'Wireless Bluetooth Earbuds','SKU-1001','Electronics','450.00','699.00','120','0'),(3,'Smart LED TV 43 Inch','SKU-1002','Electronics','18500.00','24999.00','35','0'),(4,'Cotton Round Neck T-Shirt','SKU-1003','Clothing','180.00','399.00','250','0'),(5,'Men\'s Slim Fit Jeans','SKU-1004','Clothing','650.00','1299.00','180','0'),(6,'Non-Stick Frying Pan 28cm','SKU-1005','Home & Kitchen','420.00','799.00','95','0'),(7,'Electric Kettle 1.5L','SKU-1006','Home & Kitchen','550.00','999.00','140','1500'),(8,'Vitamin C Face Serum 30ml','SKU-1007','Beauty','320.00','599.00','300','30'),(9,'Herbal Hair Oil 200ml','SKU-1008','Beauty','180.00','349.00','220','200'),(10,'Yoga Mat 6mm Anti-Slip','SKU-1009','Sports','450.00','899.00','110','0'),(11,'Dumbbell Set 10kg Pair','SKU-1010','Sports','1200.00','1899.00','60','0'),(12,'Atomic Habits Paperback','SKU-1011','Books','250.00','450.00','200','0'),(13,'The Psychology of Money','SKU-1012','Books','220.00','399.00','165','0'),(14,'Remote Control Racing Car','SKU-1013','Toys','650.00','1199.00','90','0'),(15,'Building Blocks Set 120 Pcs','SKU-1014','Toys','480.00','899.00','150','0'),(16,'Organic Honey 500g','SKU-1015','Grocery','280.00','449.00','400','0'),(17,'Cold Pressed Coconut Oil 1L','SKU-1016','Grocery','320.00','499.00','350','1000'),(18,'USB-C Fast Charger 65W','SKU-1017','Electronics','550.00','999.00','180','0'),(19,'Noise Cancelling Headphones','SKU-1018','Electronics','3200.00','4999.00','45','0'),(20,'Women\'s Casual Kurti','SKU-1019','Clothing','350.00','699.00','130','0'),(21,'Cotton Bedsheet Double','SKU-1020','Home & Kitchen','680.00','1299.00','85','0'),(22,'Aloe Vera Gel 150ml','SKU-1021','Beauty','120.00','249.00','310','150'),(23,'Protein Powder 1kg Chocolate','SKU-1022','Sports','1450.00','2299.00','70','0'),(24,'Rich Dad Poor Dad','SKU-1023','Books','200.00','350.00','190','0'),(25,'Soft Plush Teddy Bear','SKU-1024','Toys','380.00','699.00','120','0'),(26,'Basmati Rice 5kg','SKU-1025','Grocery','450.00','699.00','280','0'),(27,'Stainless Steel Water Bottle 750ml','SKU-1026','Home & Kitchen','280.00','499.00','200','750'),(28,'Wireless Mouse Ergonomic','SKU-1027','Electronics','350.00','649.00','160','0'),(29,'Men\'s Formal Shirt','SKU-1028','Clothing','480.00','999.00','95','0'),(30,'Face Wash Green Tea 100ml','SKU-1029','Beauty','160.00','299.00','275','100'),(31,'Resistance Band Set','SKU-1030','Sports','320.00','599.00','140','0'),(32,'Ikigai Hardcover','SKU-1031','Books','280.00','499.00','110','0'),(33,'Educational Puzzle 1000 Pcs','SKU-1032','Toys','420.00','799.00','75','0'),(34,'Green Tea Bags 100s','SKU-1033','Grocery','180.00','349.00','320','0'),(35,'Power Bank 20000mAh','SKU-1034','Electronics','980.00','1599.00','90','0'),(36,'Women\'s Running Shoes','SKU-1035','Sports','1450.00','2499.00','55','0'),(37,'Moisturizing Body Lotion 400ml','SKU-1036','Beauty','220.00','399.00','185','400'),(38,'Ceramic Dinner Set 16 Pcs','SKU-1037','Home & Kitchen','1250.00','2199.00','40','0'),(39,'Kids Story Book Collection','SKU-1038','Books','350.00','599.00','130','0'),(40,'Action Figure Superhero','SKU-1039','Toys','290.00','549.00','160','0'),(41,'Olive Oil Extra Virgin 500ml','SKU-1040','Grocery','380.00','599.00','210','500');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'harsh','harsh123@gmail.com','$2b$10$bTUhpVpelsIKkwgFXt0JmuECrLA0J2jgoWLOj86NKc1vNbj1oalzK','admin','2026-08-09 13:38:45'),(2,'Pankaj Rauniyar','pankaj123@gmail.com','$2b$10$ktPJKRiupECNajKV99VqBOaszK6D0sbhXGfBodDG/2tEtCwZ8yroW','manager','2026-08-09 13:47:55'),(3,'abhay rauniyar','abhay123@gmail.com','$2b$10$yVRJ7XaqHiTV/gYE1TtiU.9ztrNXG5VEX1sS.dVAIOX2mN1vq60Oe','staff','2026-08-09 13:53:29');
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

-- Dump completed on 2026-08-09 22:19:40

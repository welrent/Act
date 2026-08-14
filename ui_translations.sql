-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: act-welrent
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ui_translations`
--

DROP TABLE IF EXISTS `ui_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ui_translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang_code` varchar(10) NOT NULL,
  `trans_key` varchar(100) NOT NULL,
  `trans_value` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lang_key` (`lang_code`,`trans_key`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ui_translations`
--

LOCK TABLES `ui_translations` WRITE;
/*!40000 ALTER TABLE `ui_translations` DISABLE KEYS */;
INSERT INTO `ui_translations` VALUES (1,'en','back_to_home','Back to Home'),(2,'en','not_logged_in','You are not logged in'),(3,'en','search_placeholder','Search...'),(4,'en','search_shortcut','K'),(5,'en','terms_of_use','Terms of Use'),(6,'en','terms_desc','Review the rules and guidelines for using the platform.'),(7,'en','accessibility','Accessibility Statement'),(8,'en','accessibility_desc','Our ongoing commitment to digital accessibility for all users.'),(9,'en','privacy','Privacy Statement'),(10,'en','privacy_desc','Information on how we collect, use, and protect your data.'),(11,'en','cookie','Cookie Statement'),(12,'en','cookie_desc','Details regarding our use of cookies and tracking tech.'),(13,'en','car_rental','Car Rental Agreement'),(14,'en','boat_rental','Boat Rental Agreement'),(15,'en','equip_rental','Equipment Rental Agreement'),(16,'en','welcome_msg','Welcome'),(17,'en','welcome_bio','Manage all your rental agreements safely and securely.'),(18,'fr','back_to_home','Retour à l\'accueil'),(19,'fr','not_logged_in','Vous n\'êtes pas connecté'),(20,'fr','search_placeholder','Recherche...'),(21,'fr','search_shortcut','K'),(22,'fr','terms_of_use','Conditions d\'utilisation'),(23,'fr','terms_desc','Consultez les règles et directives d\'utilisation de la plateforme.'),(24,'fr','accessibility','Déclaration d\'accessibilité'),(25,'fr','accessibility_desc','Notre engagement continu envers l\'accessibilité numérique.'),(26,'fr','privacy','Déclaration de confidentialité'),(27,'fr','privacy_desc','Informations sur la collecte, l\'utilisation et la protection de vos données.'),(28,'fr','cookie','Déclaration sur les cookies'),(29,'fr','cookie_desc','Détails concernant notre utilisation des cookies et technologies de suivi.'),(30,'fr','car_rental','Contrat de location de voiture'),(31,'fr','boat_rental','Contrat de location de bateau'),(32,'fr','equip_rental','Contrat de location d\'équipement'),(33,'fr','welcome_msg','Bienvenue'),(34,'fr','welcome_bio','Gérez tous vos contrats de location rapidement et en toute simplicité.');
/*!40000 ALTER TABLE `ui_translations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-02  5:45:53

CREATE DATABASE  IF NOT EXISTS `animal_crossing` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `animal_crossing`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: animal_crossing
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `especies`
--

DROP TABLE IF EXISTS `especies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especies`
--

LOCK TABLES `especies` WRITE;
/*!40000 ALTER TABLE `especies` DISABLE KEYS */;
INSERT INTO `especies` VALUES (1,'Gato','Felinos ágiles y misteriosos, conocidos por su independencia y elegancia'),(2,'Ardilla','Pequeños roedores energéticos que aman las nueces y trepar árboles'),(3,'Pulpo','Cefalópodos inteligentes y misteriosos del océano'),(4,'Ciervo','Elegantes mamíferos con astas majestuosas'),(5,'Oso','Grandes mamíferos adorables con corazones igual de grandes');
/*!40000 ALTER TABLE `especies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `islas`
--

DROP TABLE IF EXISTS `islas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `islas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `hemisferio` enum('Norte','Sur') NOT NULL,
  `fruta` varchar(20) NOT NULL,
  `propietario` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `propietario_UNIQUE` (`propietario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `islas`
--

LOCK TABLES `islas` WRITE;
/*!40000 ALTER TABLE `islas` DISABLE KEYS */;
INSERT INTO `islas` VALUES (1,'Takoyaki Bay','Norte','Manzana','Sofía'),(2,'Starlight','Sur','Cereza','Sakura'),(3,'Paradise Cove','Norte','Durazno','Luna');
/*!40000 ALTER TABLE `islas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `islas_has_vecinos`
--

DROP TABLE IF EXISTS `islas_has_vecinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `islas_has_vecinos` (
  `islas_id` int NOT NULL,
  `vecinos_id` int NOT NULL,
  PRIMARY KEY (`islas_id`,`vecinos_id`),
  KEY `fk_islas_has_vecinos_vecinos1_idx` (`vecinos_id`),
  KEY `fk_islas_has_vecinos_islas1_idx` (`islas_id`),
  CONSTRAINT `fk_islas_has_vecinos_islas1` FOREIGN KEY (`islas_id`) REFERENCES `islas` (`id`),
  CONSTRAINT `fk_islas_has_vecinos_vecinos1` FOREIGN KEY (`vecinos_id`) REFERENCES `vecinos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `islas_has_vecinos`
--

LOCK TABLES `islas_has_vecinos` WRITE;
/*!40000 ALTER TABLE `islas_has_vecinos` DISABLE KEYS */;
INSERT INTO `islas_has_vecinos` VALUES (1,1),(3,1),(2,2),(3,2),(1,3),(3,3),(1,4),(2,4),(2,5);
/*!40000 ALTER TABLE `islas_has_vecinos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vecinos`
--

DROP TABLE IF EXISTS `vecinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vecinos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `personalidad` varchar(20) NOT NULL,
  `cumpleaños` date NOT NULL,
  `frase` varchar(100) DEFAULT NULL,
  `estilo_casa` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vecinos`
--

LOCK TABLES `vecinos` WRITE;
/*!40000 ALTER TABLE `vecinos` DISABLE KEYS */;
INSERT INTO `vecinos` VALUES (1,'Raymond','https://dodo.ac/np/images/2/2a/Raymond_NH.png','Perezoso','2020-03-08','¡Por supuesto!','Oficina'),(2,'Marshal','https://dodo.ac/np/images/d/da/Marshal_NH.png','Esnob','2020-09-29','guaperas','Elegante'),(3,'Zucker','https://dodo.ac/np/images/7/7f/Zucker_NH.png','Perezoso','2020-03-08','bloop','Japonés'),(4,'Fauna','https://dodo.ac/np/images/9/91/Fauna_NH.png','Normal','2020-03-26','corderito','Natural'),(5,'Stitches','https://dodo.ac/np/images/thumb/5/56/Stitches_NH.png/150px-Stitches_NH.png','Perezoso','2020-02-10','retales','Colorido');
/*!40000 ALTER TABLE `vecinos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-29 10:13:57

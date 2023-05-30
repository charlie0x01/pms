CREATE DATABASE  IF NOT EXISTS `pms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pms`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: pms
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `board_columns`
--

DROP TABLE IF EXISTS `board_columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_columns` (
<<<<<<< Updated upstream
  `column_id` int NOT NULL,
  `board_id` int NOT NULL,
=======
  `column_id` int NOT NULL AUTO_INCREMENT,
  `column_board_id` int NOT NULL,
>>>>>>> Stashed changes
  `column_title` varchar(45) NOT NULL,
  PRIMARY KEY (`column_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_columns`
--

LOCK TABLES `board_columns` WRITE;
/*!40000 ALTER TABLE `board_columns` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_columns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
<<<<<<< Updated upstream
  `board_id` int NOT NULL,
  `project_id` int DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
=======
  `board_id` int NOT NULL AUTO_INCREMENT,
  `board_project_id` int NOT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `fk_project_id_idx` (`board_project_id`),
  CONSTRAINT `fk_board_project_id` FOREIGN KEY (`board_project_id`) REFERENCES `projects` (`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> Stashed changes
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,35,'2023-05-30');
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_members`
--

DROP TABLE IF EXISTS `organization_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization_members` (
  `org_id` int NOT NULL,
  `org_member_id` int DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `member_status` tinyint DEFAULT NULL,
  KEY `org_id_idx` (`org_id`),
  KEY `fk_org_member_id_idx` (`org_member_id`),
  CONSTRAINT `fk_org_id` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`org_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_org_member_id` FOREIGN KEY (`org_member_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_members`
--

LOCK TABLES `organization_members` WRITE;
/*!40000 ALTER TABLE `organization_members` DISABLE KEYS */;
INSERT INTO `organization_members` VALUES (11,9,'',1);
/*!40000 ALTER TABLE `organization_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `org_id` int NOT NULL AUTO_INCREMENT,
  `org_name` varchar(45) NOT NULL,
  `org_owner` int NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `joining_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  KEY `fk_org_owner_idx` (`org_owner`),
  CONSTRAINT `fk_org_owner` FOREIGN KEY (`org_owner`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (11,'Devsinc',10,'check description update','e27c8be2');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_members` (
<<<<<<< Updated upstream
  `project_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
=======
  `project_id` int NOT NULL,
  `pm_role_id` int DEFAULT NULL,
>>>>>>> Stashed changes
  `project_member_id` int DEFAULT NULL,
  `member_status` tinyint NOT NULL,
  KEY `fk_project_id_idx` (`project_id`),
  KEY `fk_project_member_id_idx` (`project_member_id`),
  CONSTRAINT `fk_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_project_member_id` FOREIGN KEY (`project_member_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_members`
--

LOCK TABLES `project_members` WRITE;
/*!40000 ALTER TABLE `project_members` DISABLE KEYS */;
INSERT INTO `project_members` VALUES (35,1,11,1),(35,2,9,1);
/*!40000 ALTER TABLE `project_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_org_id` int DEFAULT NULL,
  `project_owner` int DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `project_title` varchar(45) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `joining_code` varchar(8) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `fk_project_owner_idx` (`project_owner`),
  KEY `fk_org_id_idx` (`project_org_id`),
  CONSTRAINT `fk_project_org_id` FOREIGN KEY (`project_org_id`) REFERENCES `organizations` (`org_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_project_owner` FOREIGN KEY (`project_owner`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (35,11,10,'check description update','Project-1','2023-05-28','c1ab878d');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_title` varchar(45) DEFAULT NULL,
  `job_description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_assigned`
--

DROP TABLE IF EXISTS `task_assigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_assigned` (
<<<<<<< Updated upstream
  `assginee_id` int NOT NULL,
  `task_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`assginee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
=======
  `assginee_id` int NOT NULL AUTO_INCREMENT,
  `assigned_task_id` int NOT NULL,
  `assigned_user_id` int NOT NULL,
  PRIMARY KEY (`assginee_id`),
  KEY `fk_assign_task_id_idx` (`assigned_task_id`),
  KEY `fk_assign_user_id_idx` (`assigned_user_id`),
  CONSTRAINT `fk_assigned_task_id` FOREIGN KEY (`assigned_task_id`) REFERENCES `tasks` (`task_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_assigned_user_id` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
>>>>>>> Stashed changes
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_assigned`
--

LOCK TABLES `task_assigned` WRITE;
/*!40000 ALTER TABLE `task_assigned` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_assigned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_title` varchar(45) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `column_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `verified` tinyint DEFAULT NULL,
  `verificationCode` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Abdullah','Tanveer','abdullahtanveer008@gmail.com',NULL,NULL,'$2b$10$vLcp/nFGT7lT8NnU3V3Bw.TBYC4h9O1Ob45SGafHL5KXniEsKHoii',1,'T-782854'),(10,'Zeeshan','Usman','abdullahtanveer56@outlook.com',NULL,NULL,'$2b$10$zF.VZgTytQ3W3dvr3U6UruEf2ECVxSatpGrmcrWWgaI8E8EFNT.wC',1,'T-631628');
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

<<<<<<< Updated upstream
-- Dump completed on 2023-05-28 15:43:54
=======
-- Dump completed on 2023-05-30 22:23:31
>>>>>>> Stashed changes

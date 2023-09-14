-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.34 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 react.bookmark 구조 내보내기
CREATE TABLE IF NOT EXISTS `bookmark` (
  `BOOKMARK_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `POST_NO` int NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`BOOKMARK_NO`),
  KEY `FK_bookmark_user` (`USER_NO`),
  KEY `FK_bookmark_post` (`POST_NO`),
  CONSTRAINT `FK_bookmark_post` FOREIGN KEY (`POST_NO`) REFERENCES `post` (`POST_NO`),
  CONSTRAINT `FK_bookmark_user` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.bookmark:~1 rows (대략적) 내보내기
INSERT INTO `bookmark` (`BOOKMARK_NO`, `USER_NO`, `POST_NO`, `CDATETIME`) VALUES
	(2, 20, 7, '2023-09-14 09:45:36'),
	(3, 20, 6, '2023-09-14 10:15:38');

-- 테이블 react.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `COMMENT_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `POST_NO` int NOT NULL,
  `COMMENT_CONTENT` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`COMMENT_NO`),
  KEY `USER_NO` (`USER_NO`),
  KEY `POST_NO` (`POST_NO`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`POST_NO`) REFERENCES `post` (`POST_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.comment:~7 rows (대략적) 내보내기
INSERT INTO `comment` (`COMMENT_NO`, `USER_NO`, `POST_NO`, `COMMENT_CONTENT`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 20, 7, '집에 가고 싶다ㅜㅜ', '2023-09-14 11:52:48', '2023-09-14 11:52:48'),
	(2, 20, 7, '올라가라', '2023-09-14 14:47:38', '2023-09-14 14:47:38'),
	(3, 20, 7, '올라간다', '2023-09-14 14:48:25', '2023-09-14 14:48:25'),
	(29, 20, 7, '새로고침', '2023-09-14 14:52:31', '2023-09-14 14:52:31'),
	(32, 20, 6, '댓글', '2023-09-14 14:54:35', '2023-09-14 14:54:35'),
	(33, 22, 7, '나도 집에 가고 싶다', '2023-09-14 14:57:58', '2023-09-14 14:57:58'),
	(36, 20, 7, 'ㅍ ㅌ', '2023-09-14 17:12:59', '2023-09-14 17:12:59'),
	(37, 22, 6, '이제 집에 갈시간', '2023-09-14 18:01:23', '2023-09-14 18:01:23');

-- 테이블 react.follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `follow` (
  `FOLLOW_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `FOLLOW_USER_NO` int NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`FOLLOW_NO`),
  KEY `USER_NO` (`USER_NO`),
  KEY `FOLLOW_USER_NO` (`FOLLOW_USER_NO`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`FOLLOW_USER_NO`) REFERENCES `user` (`USER_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.follow:~0 rows (대략적) 내보내기
INSERT INTO `follow` (`FOLLOW_NO`, `USER_NO`, `FOLLOW_USER_NO`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 1, 2, '2023-09-11 18:07:47', '2023-09-11 18:07:47');

-- 테이블 react.heart 구조 내보내기
CREATE TABLE IF NOT EXISTS `heart` (
  `HEART_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `POST_NO` int NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`HEART_NO`),
  KEY `USER_NO` (`USER_NO`),
  KEY `POST_NO` (`POST_NO`),
  CONSTRAINT `heart_ibfk_1` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`),
  CONSTRAINT `heart_ibfk_2` FOREIGN KEY (`POST_NO`) REFERENCES `post` (`POST_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.heart:~0 rows (대략적) 내보내기
INSERT INTO `heart` (`HEART_NO`, `USER_NO`, `POST_NO`, `CDATETIME`, `UDATETIME`) VALUES
	(25, 20, 7, '2023-09-14 17:34:38', '2023-09-14 17:34:38'),
	(28, 20, 6, '2023-09-14 17:54:52', '2023-09-14 17:54:52'),
	(29, 20, 5, '2023-09-14 17:54:54', '2023-09-14 17:54:54'),
	(30, 20, 4, '2023-09-14 17:54:55', '2023-09-14 17:54:55'),
	(31, 20, 1, '2023-09-14 17:54:56', '2023-09-14 17:54:56'),
	(32, 20, 2, '2023-09-14 17:54:57', '2023-09-14 17:54:57'),
	(33, 20, 3, '2023-09-14 17:54:59', '2023-09-14 17:54:59'),
	(34, 22, 7, '2023-09-14 17:55:17', '2023-09-14 17:55:17'),
	(35, 22, 6, '2023-09-14 17:55:18', '2023-09-14 17:55:18'),
	(36, 22, 5, '2023-09-14 17:55:19', '2023-09-14 17:55:19'),
	(37, 22, 4, '2023-09-14 17:55:21', '2023-09-14 17:55:21'),
	(38, 22, 1, '2023-09-14 17:55:22', '2023-09-14 17:55:22'),
	(39, 22, 2, '2023-09-14 17:55:24', '2023-09-14 17:55:24'),
	(40, 22, 3, '2023-09-14 17:55:25', '2023-09-14 17:55:25');

-- 테이블 react.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `POST_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `POST_CONTENT` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `POST_HASHTAG` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`POST_NO`),
  KEY `USER_NO` (`USER_NO`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.post:~7 rows (대략적) 내보내기
INSERT INTO `post` (`POST_NO`, `USER_NO`, `POST_CONTENT`, `POST_HASHTAG`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 20, '아 집에 가고 싶다', '#집', '2023-09-13 10:56:07', '2023-09-13 10:56:07'),
	(2, 20, '아 집에 가고 싶다', '#집', '2023-09-13 10:56:07', '2023-09-13 10:56:07'),
	(3, 21, '배고프다\r\n', '#집', '2023-09-13 10:56:07', '2023-09-13 10:56:07'),
	(4, 20, '올라가라', '올라가라', '2023-09-13 15:40:19', '2023-09-13 15:40:19'),
	(5, 20, '올라간다', '올라간다', '2023-09-13 15:41:04', '2023-09-13 15:41:04'),
	(6, 20, '테스트', '테스트', '2023-09-13 15:42:58', '2023-09-13 15:42:58'),
	(7, 20, '테스트', '테스트', '2023-09-13 15:43:50', '2023-09-13 15:43:50');

-- 테이블 react.post_image 구조 내보내기
CREATE TABLE IF NOT EXISTS `post_image` (
  `POST_IMG_NO` int NOT NULL AUTO_INCREMENT,
  `POST_NO` int NOT NULL,
  `U_IMG_ORG_NAME` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `U_IMG_NAME` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `U_IMG_PATH` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/',
  `U_IMG_SIZE` int NOT NULL,
  `DELETE_YN` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'N',
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`POST_IMG_NO`),
  KEY `FK_post_image_post` (`POST_NO`),
  CONSTRAINT `FK_post_image_post` FOREIGN KEY (`POST_NO`) REFERENCES `post` (`POST_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.post_image:~7 rows (대략적) 내보내기
INSERT INTO `post_image` (`POST_IMG_NO`, `POST_NO`, `U_IMG_ORG_NAME`, `U_IMG_NAME`, `U_IMG_PATH`, `U_IMG_SIZE`, `DELETE_YN`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 1, 'homl', 'home.png', '/', 111, 'N', '2023-09-13 10:55:26', '2023-09-13 10:55:26'),
	(2, 2, 'homl', 'home.png', '/', 111, 'N', '2023-09-13 10:55:26', '2023-09-13 10:55:26'),
	(3, 3, 'homl', 'home.png', '/', 111, 'N', '2023-09-13 10:55:26', '2023-09-13 10:55:26'),
	(4, 4, 'bear.jpg', 'eab726c7-64f2-4066-b10a-ad300b40c05c.jpg', '/', 41234, 'N', '2023-09-13 15:40:19', '2023-09-13 15:40:19'),
	(5, 5, 'flower.jpg', '80426b40-ff03-43c1-838b-eccd5e5be82e.jpg', '/', 49415, 'N', '2023-09-13 15:41:04', '2023-09-13 15:41:04'),
	(6, 6, '1.jpg', '8bf37a8a-bb7d-46f2-8038-a1cd6de0811a.jpg', '/', 19707, 'N', '2023-09-13 15:42:58', '2023-09-13 15:42:58'),
	(7, 7, '2.jpg', '25d870d8-615a-4791-8b07-d76731c2ad9a.jpg', '/', 25413, 'N', '2023-09-13 15:43:50', '2023-09-13 15:43:50');

-- 테이블 react.profile_image 구조 내보내기
CREATE TABLE IF NOT EXISTS `profile_image` (
  `PROFILE_IMAGE_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `U_IMG_ORG_NAME` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '기본 프로필',
  `U_IMG_NAME` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'profileImage.jpg',
  `U_IMG_PATH` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/',
  `U_IMG_SIZE` int NOT NULL DEFAULT '111',
  `DELETE_YN` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'N',
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`PROFILE_IMAGE_NO`),
  KEY `USER_NO` (`USER_NO`),
  CONSTRAINT `profile_image_ibfk_1` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.profile_image:~4 rows (대략적) 내보내기
INSERT INTO `profile_image` (`PROFILE_IMAGE_NO`, `USER_NO`, `U_IMG_ORG_NAME`, `U_IMG_NAME`, `U_IMG_PATH`, `U_IMG_SIZE`, `DELETE_YN`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 1, '기본 프로필', 'profileImage.jpg', '/', 1, 'N', '2023-09-11 17:41:31', '2023-09-11 17:41:31'),
	(2, 2, '기본 프로필', 'profileImage.jpg', '/', 1, 'N', '2023-09-11 17:41:31', '2023-09-11 17:41:31'),
	(11, 20, 'bear.jpg', '78b07e91-1797-41cc-82ca-b89e36b56b3a.jpg', '/', 41234, 'N', '2023-09-12 14:11:55', '2023-09-13 15:15:21'),
	(12, 21, '기본 프로필', 'profileImage.jpg', '/', 111, 'N', '2023-09-12 14:28:35', '2023-09-12 14:28:35'),
	(13, 22, 'KakaoTalk_20230830_112904649.png', 'c8ce626e-3f7e-4dc9-90b3-e0c1c77ecb4b.png', '/', 82999, 'N', '2023-09-12 14:49:21', '2023-09-14 14:57:47');

-- 테이블 react.reply 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply` (
  `REPLY_NO` int NOT NULL AUTO_INCREMENT,
  `USER_NO` int NOT NULL,
  `COMMENT_NO` int NOT NULL,
  `REPLY_CONTENT` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`REPLY_NO`),
  KEY `USER_NO` (`USER_NO`),
  KEY `COMMENT_NO` (`COMMENT_NO`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`USER_NO`) REFERENCES `user` (`USER_NO`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`COMMENT_NO`) REFERENCES `comment` (`COMMENT_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.reply:~5 rows (대략적) 내보내기
INSERT INTO `reply` (`REPLY_NO`, `USER_NO`, `COMMENT_NO`, `REPLY_CONTENT`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 20, 33, '저도요...', '2023-09-14 15:52:59', '2023-09-14 15:52:59'),
	(2, 20, 2, '저도요', '2023-09-14 15:58:01', '2023-09-14 15:58:01'),
	(3, 20, 33, '아아아아', '2023-09-14 17:08:02', '2023-09-14 17:08:02'),
	(4, 20, 33, '아아아아', '2023-09-14 17:08:07', '2023-09-14 17:08:07'),
	(5, 20, 33, '아아아아아', '2023-09-14 17:08:11', '2023-09-14 17:08:11');

-- 테이블 react.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `USER_NO` int NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(255) NOT NULL,
  `USER_PWD` varchar(255) NOT NULL,
  `USER_PWD_SALT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `USER_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `USER_GENDER` varchar(50) DEFAULT NULL,
  `USER_INTRODUCTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT (now()),
  `UDATETIME` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`USER_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.user:~5 rows (대략적) 내보내기
INSERT INTO `user` (`USER_NO`, `USER_ID`, `USER_PWD`, `USER_PWD_SALT`, `USER_NAME`, `USER_GENDER`, `USER_INTRODUCTION`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 'test111', '123321', '1', '테스트', NULL, '자기소개', '2023-09-11 16:40:48', '2023-09-11 16:40:48'),
	(2, 'test112', '123321', '1', '테스트', NULL, '자기소개', '2023-09-11 16:40:48', '2023-09-11 16:40:48'),
	(20, 'test111@naver.com', '$2b$10$cBwxNfNd33iCqM9GE8M6hOHzCFupPwt0wBoys4dTqJoKc6FMIVC5a', '$2b$10$cBwxNfNd33iCqM9GE8M6hO', '테스트', '남성', '집에 가고 싶다', '2023-09-12 14:11:55', '2023-09-12 14:11:55'),
	(21, 'test123@naver.com', '$2b$10$1DCJKqDDkmDlkOOwsvyzLeZ3A.2brpKv1HiKZuedhrJwtJmLBbWQe', '$2b$10$1DCJKqDDkmDlkOOwsvyzLe', '테스트3', NULL, NULL, '2023-09-12 14:28:35', '2023-09-12 14:28:35'),
	(22, 'test222@naver.com', '$2b$10$jSIVYeQAVJpFkhTDX5FN..rwl2ZNQVupc/Qyh.tlWc9vULtVwqdxW', '$2b$10$jSIVYeQAVJpFkhTDX5FN..', '테스트222', '', '', '2023-09-12 14:49:21', '2023-09-12 14:49:21');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

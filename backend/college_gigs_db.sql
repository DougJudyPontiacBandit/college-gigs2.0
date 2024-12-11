SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `c_gigs_s_up_employer` (
  `emp_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(255) NOT NULL,
  `emp_email` varchar(255) NOT NULL,
  `emp_pass` varchar(255) NOT NULL,
  `emp_comp` varchar(255) NOT NULL,
  `emp_fb` varchar(255) DEFAULT NULL,
  `emp_insta` varchar(255) DEFAULT NULL,
  `emp_linkedin` varchar(255) DEFAULT NULL,
  `emp_page` varchar(255) DEFAULT NULL,
  `emp_pfp` varchar(255) DEFAULT NULL,
  `emp_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `c_gigs_s_up_flancer` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL,
  `f_age` int(11) NOT NULL,
  `f_email` varchar(255) NOT NULL,
  `f_password` varchar(255) NOT NULL,
  `f_school` varchar(255) DEFAULT NULL,
  `f_level` varchar(255) DEFAULT NULL,
  `f_course` varchar(255) DEFAULT NULL,
  `f_portfolio` varchar(255) DEFAULT NULL,
  `f_fb` varchar(255) DEFAULT NULL,
  `f_insta` varchar(255) DEFAULT NULL,
  `f_linkedin` varchar(255) DEFAULT NULL,
  `f_twitter` varchar(255) DEFAULT NULL,
  `f_pfp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `c_gigs_works` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_id` int(11) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `f_email` varchar(255) NOT NULL,
  `f_work` varchar(255) NOT NULL,
  `f_time` varchar(255) NOT NULL,
  `f_sdate` DATE NOT NULL,
  `f_edate` DATE NOT NULL,
  `f_description` varchar(255) NOT NULL,
  `f_price` varchar(255) NOT NULL,
  `f_cname` varchar(255) NOT NULL,
  `emp_id` int(11) NOT NULL,
  PRIMARY KEY (`w_id`),
  KEY `c_gigs_works_ibfk_1` (`f_id`),
  KEY `c_gigs_works_ibfk_2` (`emp_id`),
  CONSTRAINT `c_gigs_works_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `c_gigs_s_up_flancer` (`f_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `c_gigs_works_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `c_gigs_s_up_employer` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `c_gigs_reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `reviewer_id` int(11) NOT NULL,
  `reviewer_type` ENUM('freelancer', 'employer') NOT NULL,
  `rating` int(1) NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `review_text` text DEFAULT NULL,
  `review_target` ENUM('freelancer', 'employer', 'work') NOT NULL,
  `f_id` int(11) DEFAULT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `w_id` int(11) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  FOREIGN KEY (`f_id`) REFERENCES `c_gigs_s_up_flancer` (`f_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`emp_id`) REFERENCES `c_gigs_s_up_employer` (`emp_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`w_id`) REFERENCES `c_gigs_works` (`w_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `token_blacklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(1024) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;

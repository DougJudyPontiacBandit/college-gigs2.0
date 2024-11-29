-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 08:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college_gigs_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `c_gigs_s_up_employer`
--

CREATE TABLE `c_gigs_s_up_employer` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(255) NOT NULL,
  `emp_email` varchar(255) NOT NULL,
  `emp_pass` varchar(255) NOT NULL,
  `emp_comp` varchar(255) NOT NULL,
  `emp_fb` varchar(255) NOT NULL,
  `emp_insta` varchar(255) NOT NULL,
  `emp_linkedin` varchar(255) NOT NULL,
  `emp_page` varchar(255) NOT NULL,
  `emp_pfp` varchar(255) NOT NULL,
  `emp_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `c_gigs_s_up_flancer`
--

CREATE TABLE `c_gigs_s_up_flancer` (
  `f_id` int(11) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `f_age` int(11) NOT NULL,
  `f_email` varchar(255) NOT NULL,
  `f_password` varchar(255) NOT NULL,
  `f_school` varchar(255) NOT NULL,
  `f_level` varchar(255) NOT NULL,
  `f_course` varchar(255) NOT NULL,
  `f_portfolio` varchar(255) NOT NULL,
  `f_fb` varchar(255) NOT NULL,
  `f_insta` varchar(255) NOT NULL,
  `f_linkedin` varchar(255) NOT NULL,
  `f_twitter` varchar(255) NOT NULL,
  `f_pfp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `c_gigs_works`
--

CREATE TABLE `c_gigs_works` (
  `w_id` int(11) NOT NULL,
  `f_id` int(11) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `f_email` varchar(255) NOT NULL,
  `f_work` varchar(255) NOT NULL,
  `f_time` varchar(255) NOT NULL,
  `f_sdate` varchar(255) NOT NULL,
  `f_edate` varchar(255) NOT NULL,
  `f_description` varchar(255) NOT NULL,
  `f_price` varchar(255) NOT NULL,
  `f_cname` varchar(255) NOT NULL,
  `f_card` varchar(255) NOT NULL,
  `f_expmonth` varchar(255) NOT NULL,
  `f_expyear` varchar(255) NOT NULL,
  `f_cvv` varchar(255) NOT NULL,
  `emp_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist`
--

CREATE TABLE `token_blacklist` (
  `token` varchar(1024) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `c_gigs_s_up_employer`
--
ALTER TABLE `c_gigs_s_up_employer`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `c_gigs_s_up_flancer`
--
ALTER TABLE `c_gigs_s_up_flancer`
  ADD PRIMARY KEY (`f_id`);

--
-- Indexes for table `c_gigs_works`
--
ALTER TABLE `c_gigs_works`
  ADD PRIMARY KEY (`w_id`),
  ADD KEY `c_gigs_works_ibfk_1` (`f_id`),
  ADD KEY `c_gigs_works_ibfk_2` (`emp_id`);

--
-- Indexes for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `c_gigs_s_up_employer`
--
ALTER TABLE `c_gigs_s_up_employer`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `c_gigs_s_up_flancer`
--
ALTER TABLE `c_gigs_s_up_flancer`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `c_gigs_works`
--
ALTER TABLE `c_gigs_works`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `c_gigs_works`
--
ALTER TABLE `c_gigs_works`
  ADD CONSTRAINT `c_gigs_works_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `c_gigs_s_up_flancer` (`f_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
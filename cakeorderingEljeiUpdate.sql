-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2017 at 09:06 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cakeordering`
--

-- --------------------------------------------------------

--
-- Table structure for table `cake_layer_1`
--

CREATE TABLE `cake_layer_1` (
  `cake_layer_id` int(11) NOT NULL,
  `cake_description` varchar(755) DEFAULT '',
  `image_path` varchar(1000) DEFAULT '',
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cake_layer_1`
--

INSERT INTO `cake_layer_1` (`cake_layer_id`, `cake_description`, `image_path`, `is_active`, `is_deleted`) VALUES
(1, 'v', 'v', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cake_layer_2`
--

CREATE TABLE `cake_layer_2` (
  `cake_layer_id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT '',
  `image_path` varchar(1000) DEFAULT '',
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cake_layer_3`
--

CREATE TABLE `cake_layer_3` (
  `cake_layer_id` int(11) DEFAULT NULL,
  `desciption` varchar(1000) DEFAULT '',
  `image_path` varchar(1000) DEFAULT NULL,
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cake_layer_4`
--

CREATE TABLE `cake_layer_4` (
  `cake_layer_id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_path` varchar(1000) DEFAULT NULL,
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cake_layer_5`
--

CREATE TABLE `cake_layer_5` (
  `cake_layer_id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_path` varchar(1000) DEFAULT NULL,
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cake_orders`
--

CREATE TABLE `cake_orders` (
  `cake_order_id` int(11) NOT NULL,
  `cake_structure` text,
  `cost` decimal(11,4) DEFAULT '0.0000',
  `customer_id` int(11) DEFAULT '0',
  `estimated_pickedup` date DEFAULT '0000-00-00',
  `date_ordered` datetime DEFAULT '0000-00-00 00:00:00',
  `date_finalized` datetime DEFAULT '0000-00-00 00:00:00',
  `finalized_by` int(11) DEFAULT '0',
  `is_finalized` tinyint(4) DEFAULT '0',
  `date_pickedup` date DEFAULT '0000-00-00',
  `is_pickedup` tinyint(4) DEFAULT '0',
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `cust_lname` varchar(255) DEFAULT '',
  `cust_fname` varchar(255) DEFAULT '',
  `cust_mname` varchar(255) DEFAULT '',
  `address` varchar(755) DEFAULT '',
  `contact_no` varchar(255) DEFAULT '',
  `cust_bdate` date DEFAULT '0000-00-00',
  `security_code` varchar(100) DEFAULT '',
  `cust_uname` varchar(155) DEFAULT '',
  `cust_email` varchar(255) DEFAULT '',
  `cust_pword` varchar(255) DEFAULT '',
  `cust_vcode` varchar(255) DEFAULT '',
  `cust_photo` varchar(10000) DEFAULT '',
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0',
  `is_verified` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `cust_lname`, `cust_fname`, `cust_mname`, `address`, `contact_no`, `cust_bdate`, `security_code`, `cust_uname`, `cust_email`, `cust_pword`, `cust_vcode`, `cust_photo`, `is_active`, `is_deleted`, `is_verified`) VALUES
(16, 'aa', 'aa', NULL, NULL, '123', '1970-01-01', '', 'aa', 'aa@gmail.com', 'e0c9035898dd52fc65c41454cec9c4d2611bfb37', '1b1cc', '', 1, 0, 0),
(17, 'b', 'b', NULL, NULL, '123', '1970-01-01', '', 'b', 'b@gmail.com', 'e9d71f5ee7c92d6dc9e92ffdad17b8bd49418f98', 'e8f76', '', 1, 0, 0),
(18, 'ccc', 'ccc', NULL, NULL, '213', '1970-01-01', '', 'ccc', 'ccc@gmail.com', 'f36b4825e5db2cf7dd2d2593b3f5c24c0311d8b2', '264b5', '', 1, 0, 0),
(19, 'kkk', 'kkk', NULL, NULL, '123', '1970-01-01', '', 'kkk', 'kkk@gmail.com', '5150d2104c8cd974b27fad3f25ec4e8098bb7bbe', 'fbba4', '', 1, 0, 0),
(20, 'zzz', 'zzz', NULL, NULL, '123', '1970-01-01', '', 'zzz', 'zzz@gmail.com', '40fa37ec00c761c7dbb6ebdee6d4a260b922f5f4', '87319', '', 1, 0, 0),
(21, 'ooo', 'ooo', NULL, NULL, '123', '1970-01-01', '', 'ooo', 'ooo@gmail.com', '4ae9fa0a8299a828a886c0eb30c930c7cf302a72', '48cb7', '', 1, 0, 0),
(22, 'ab', 'ab', NULL, NULL, '123', '1970-01-01', '', 'ab', 'ab@gmail.com', 'da23614e02469a0d7c7bd1bdab5c9c474b1904dc', '2273f', '', 1, 0, 0),
(23, 'xxx', 'xxx', NULL, NULL, '123', '1970-01-01', '', 'xxx', 'xxx@gmail.com', 'b60d121b438a380c343d5ec3c2037564b82ffef3', 'd45ae', '', 1, 0, 0),
(24, 'xx', 'xx', NULL, NULL, '123', '1970-01-01', '', 'xx', 'xx@gmail.com', 'dd7b7b74ea160e049dd128478e074ce47254bde8', 'e8640', '', 1, 0, 0),
(25, 'x', 'x', NULL, NULL, '12312', '1970-01-01', '', 'x', 'x@gmail.co.=m', '11f6ad8ec52a2984abaafd7c3b516503785c2072', 'b436e', '', 1, 0, 0),
(26, 'k', 'k', NULL, NULL, '120', '1970-01-01', '', 'k', 'k@gmail.com', '13fbd79c3d390e5d6585a21e11ff5ec1970cff0c', '724af', '', 1, 0, 0),
(27, 's', 's', NULL, NULL, '213121', '1970-01-01', '', 's', 's@gmail.com', 'a0f1490a20d0211c997b44bc357e1972deab8ae3', '9cca8', '', 1, 0, 0),
(28, 'l', 'l', NULL, NULL, '123', '1970-01-01', '', 'l', 'l@gmail.com', '07c342be6e560e7f43842e2e21b774e61d85f047', 'ecea2', '', 1, 0, 0),
(29, 'n', 'n', NULL, NULL, '123123', '1970-01-01', '', 'n', 'n@gmail.com', 'd1854cae891ec7b29161ccaf79a24b00c274bdaa', 'c86ab', '', 1, 0, 0),
(30, 'o', 'o', NULL, NULL, '12312', '1970-01-01', '', 'o', 'o@gmail.com', '7a81af3e591ac713f81ea1efe93dcf36157d8376', '8781a', '', 1, 0, 0),
(31, 'Del Rio', 'El jei', NULL, NULL, '123213', '1970-01-01', '', 'aaaa', 'eljei.delrio@gmail.com', '70c881d4a26984ddce795f6f71817c9cf4480e79', 'c6a0f', '', 1, 0, 0),
(32, 'a', 'a', NULL, NULL, '12321', '1970-01-01', '', 'a', 'a@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '684ec', '', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `other_toppings`
--

CREATE TABLE `other_toppings` (
  `topping_id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT '',
  `image_path` varchar(1000) DEFAULT NULL,
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `or_no` varchar(100) DEFAULT '',
  `date_paid` date DEFAULT '0000-00-00',
  `customer_id` int(11) DEFAULT '0',
  `cake_order_id` int(11) DEFAULT '0',
  `notes` varchar(1000) DEFAULT '',
  `is_active` int(1) DEFAULT '1',
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `user_account_id` int(11) NOT NULL,
  `user_fname` varchar(255) DEFAULT '',
  `user_mname` varchar(255) DEFAULT '',
  `user_lname` varchar(255) DEFAULT '',
  `user_uname` varchar(255) DEFAULT '',
  `user_pword` varchar(255) DEFAULT '',
  `address` varchar(1000) DEFAULT '',
  `user_email` varchar(255) DEFAULT '',
  `contact_no` varchar(100) DEFAULT '',
  `user_bdate` date DEFAULT '0000-00-00',
  `is_deleted` int(1) DEFAULT '0',
  `is_active` int(1) NOT NULL DEFAULT '1',
  `user_photo` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`user_account_id`, `user_fname`, `user_mname`, `user_lname`, `user_uname`, `user_pword`, `address`, `user_email`, `contact_no`, `user_bdate`, `is_deleted`, `is_active`, `user_photo`) VALUES
(1, 'Admin', 'Admin', 'Admin', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'Sto. Tomas , Pampanga', 'infotechnexus28@gmail.com', '00000', '2017-06-16', 0, 1, ''),
(2, 's', 's', 's', 's', '6dcd4ce23d88e2ee9568ba546c007c63d9131c1b', 'a', 's', 's', '2017-07-10', 1, 0, ''),
(3, 'VVVVV', 'VVVVVVVVV', 'VVVVVVVVVVVV', 'VVVVVVVVVV', '6dcd4ce23d88e2ee9568ba546c007c63d9131c1b', 'VVVVVVVVVVVVVV', 'VVVVVVVVV', 'VVVVVVVVV', '1975-01-01', 1, 0, ''),
(4, 'bbbbbbbbbbbb', 'bbbbbbbbbbbb', 'bbbbbbbbbbbb', 'bbbbbbbbbbbb', '4c314641a166087f628904d410f11209decf0dcc', 'bbbbbbbbbbbb', 'bbbbbbbbbbbb', 'VVVVVVVVV', '1970-01-01', 1, 0, ''),
(5, 'd', 'd', 'd', 'd', '3c363836cf4e16666669a25da280a1865c2d2874', 'd', 'd', 'd', '2017-07-09', 1, 0, ''),
(6, 'nnnnnnnnnnn', 'nnnnnnnnnnn', 'nnnnnnnnnnn', 'nnnnnnnnnnn', '3c363836cf4e16666669a25da280a1865c2d2874', 'nnnnnnnnnnn', 'nnnnnnnnnnn', 'nnnnnnnnnnn', '1970-01-01', 0, 1, ''),
(7, 'ssss', 'ssss', 'ssss', 'ssss', 'c455582f41f589213a7d34ccb3954c67476077da', 'ssss', 'ssss', 'ssss', '2017-07-21', 0, 1, ''),
(8, 'cx', 'd', 'd', 'dddd', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'aaa', 'd@gmail.com', '909090', '2017-07-12', 0, 1, ''),
(9, 's', 'dddddddd', 'dddddddd', 'dddddddd', 'd36da3e6884f6d1e9e7983ff13e99cf5c8f5745a', 'dddddddd', 'dddddddd', 'dddddddd', '2017-07-10', 0, 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cake_layer_1`
--
ALTER TABLE `cake_layer_1`
  ADD PRIMARY KEY (`cake_layer_id`) USING BTREE;

--
-- Indexes for table `cake_layer_2`
--
ALTER TABLE `cake_layer_2`
  ADD PRIMARY KEY (`cake_layer_id`) USING BTREE;

--
-- Indexes for table `cake_layer_4`
--
ALTER TABLE `cake_layer_4`
  ADD PRIMARY KEY (`cake_layer_id`) USING BTREE;

--
-- Indexes for table `cake_layer_5`
--
ALTER TABLE `cake_layer_5`
  ADD PRIMARY KEY (`cake_layer_id`) USING BTREE;

--
-- Indexes for table `cake_orders`
--
ALTER TABLE `cake_orders`
  ADD PRIMARY KEY (`cake_order_id`) USING BTREE;

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`) USING BTREE;

--
-- Indexes for table `other_toppings`
--
ALTER TABLE `other_toppings`
  ADD PRIMARY KEY (`topping_id`) USING BTREE;

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`) USING BTREE;

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`user_account_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cake_layer_1`
--
ALTER TABLE `cake_layer_1`
  MODIFY `cake_layer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `cake_layer_2`
--
ALTER TABLE `cake_layer_2`
  MODIFY `cake_layer_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cake_layer_4`
--
ALTER TABLE `cake_layer_4`
  MODIFY `cake_layer_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cake_layer_5`
--
ALTER TABLE `cake_layer_5`
  MODIFY `cake_layer_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cake_orders`
--
ALTER TABLE `cake_orders`
  MODIFY `cake_order_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `other_toppings`
--
ALTER TABLE `other_toppings`
  MODIFY `topping_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `user_account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

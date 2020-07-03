-- phpMyAdmin SQL Dump
-- version 4.7.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 25, 2018 at 06:55 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `auth`
--
CREATE DATABASE IF NOT EXISTS `auth` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `auth`;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `instantiated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`ID`, `userID`, `token`, `instantiated`) VALUES
(151, 1, '4eb7327252cb78086ded3fd41dc7ef84fc3ea679', '2018-06-09 12:00:57'),
(153, 1, '4289c4433ebde79e18fd77f6fe020f61a909b7a5', '2018-06-09 15:31:15'),
(155, 1, 'ef004bb0f9ec57f8f7213e345c5d8eab86260ac0', '2018-06-09 15:42:54'),
(156, 2, 'e9efa8480d74e3985c45acd9ce032286de116ce9', '2018-07-25 14:48:02');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(300) NOT NULL,
  `instantiated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `password`, `instantiated`) VALUES
(1, 'username', '$2y$08$h2ysDxmGHwtsuqfcaMiqlus6uaM0a40elZiQANdd7NvUgskHGHLEu', '2018-05-28 13:06:24'),
(2, 'razgraf', '$2y$08$KQzOJBY9QH1u6fr.CJtz/ekX/LtsGm1IUtuGFxqAergntBbuUVPwa', '2018-05-28 13:06:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2025 a las 18:28:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_disposena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionarios`
--

CREATE TABLE `funcionarios` (
  `idFuncionario` int(11) NOT NULL,
  `tipodoc` varchar(2) NOT NULL,
  `documento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correoPersonal` varchar(200) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'Activo',
  `intentosfallidos` int(11) NOT NULL DEFAULT 0,
  `FechaCreacion` varchar(30) NOT NULL,
  `CreadoPor` varchar(100) DEFAULT 'Default',
  `llave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `funcionarios`
--
DELIMITER $$
CREATE TRIGGER `llenarperfilfuncionario` AFTER INSERT ON `funcionarios` FOR EACH ROW BEGIN
    INSERT INTO perfilfuncionario(
        idPerfilFuncionarios,
        documentoPerfil,
        nombresPerfil,
        telefono,
        correoPersonal)
    VALUES(
        NEW.idFuncionario,
        NEW.documento,
        NEW.nombres,
        NEW.telefono,
        NEW.correoPersonal);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfilfuncionario`
--

CREATE TABLE `perfilfuncionario` (
  `idPerfilFuncionario` int(11) NOT NULL,
  `documentoPerfil` varchar(10) NOT NULL,
  `nombresPerfil` varchar(100) NOT NULL,
  `rh` varchar(3) DEFAULT NULL,
  `regional` varchar(100) NOT NULL DEFAULT 'Regional Antioquia',
  `centro` varchar(200) NOT NULL DEFAULT 'Centro Del Diseño y Manufactura Del Cuero',
  `telefono` varchar(10) DEFAULT NULL,
  `fechaExpedicion` varchar(10) DEFAULT NULL,
  `correoSena` varchar(200) DEFAULT NULL,
  `correoPersonal` varchar(200) DEFAULT NULL,
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`idFuncionario`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correoPersonal` (`correoPersonal`),
  ADD UNIQUE KEY `doc` (`documento`);

--
-- Indices de la tabla `perfilfuncionario`
--
ALTER TABLE `perfilfuncionario`
  ADD PRIMARY KEY (`idPerfilFuncionario`),
  ADD UNIQUE KEY `documentoPerfil` (`documentoPerfil`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correoPersonal` (`correoPersonal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `idFuncionario` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

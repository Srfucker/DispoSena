-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-07-2025 a las 05:33:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bddisposena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aprendiz`
--

CREATE TABLE `aprendiz` (
  `idAprendiz` int(11) NOT NULL,
  `tipoDoc` varchar(3) NOT NULL DEFAULT 'CC',
  `documento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correoPersonal` varchar(200) NOT NULL,
  `rol` varchar(15) NOT NULL DEFAULT 'Aprendiz',
  `intentosFallidos` int(11) NOT NULL DEFAULT 0,
  `fechaCreacion` varchar(30) NOT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'Inscrito',
  `llave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aprendiz`
--

INSERT INTO `aprendiz` (`idAprendiz`, `tipoDoc`, `documento`, `nombres`, `telefono`, `correoPersonal`, `rol`, `intentosFallidos`, `fechaCreacion`, `estado`, `llave`) VALUES
(1, 'TI', '1234567894', 'Rina', '3112222221', 'rina@gmail.com', 'Aprendiz', 0, '2025-06-21 20:09:49.740', 'Inscrito', '$2b$10$Ikhjy6YYCFf/OTZ./9OIH.aG2Qko3e1lOmLGc9jDoXPbSzHU.mnQK'),
(2, 'CC', '123456789', 'Diomedez Diaz', '3112222229', 'casique@gmail.com', 'Aprendiz', 0, '2025-06-22 22:34:38.574', 'Activo', '$2b$10$7PqH9RKh09Zri8jJbUTPbe2KYKcdr0vSi9eRSeFvLJi7IYqHhQ6C6'),
(3, 'CC', '1234567890', 'Albert Einsten', '3501234567', 'alber@gmail.com', 'Aprendiz', 0, '2025-06-23 16:14:11.378', 'Inscrito', '$2b$10$sQyiUKPFkWzc6oVZjOdEGO6rGZYo8/mIGIdKkwE2wFfrIKyAmxyam'),
(4, 'CC', '10101010', 'Daniel Leon', '3108888888', 'dani@gmail.com', 'Aprendiz', 0, '2025-06-24 08:17:27.033', 'Activo', '$2b$10$UKbQzf2rgaf6uzJHZw6IZOBQTXtEb5CPiMjKr/sSBCrOHDFBrjV6S');

--
-- Disparadores `aprendiz`
--
DELIMITER $$
CREATE TRIGGER `llenarperfilaprendiz` AFTER INSERT ON `aprendiz` FOR EACH ROW BEGIN
    INSERT INTO perfil (
        idPerfil,
        documentoPerfil,
        nombresPerfil,
        telefono,
        correoPersonal)
    VALUES (
        NEW.idAprendiz,
        NEW.documento,
        NEW.nombres,
        NEW.telefono,
        NEW.correoPersonal);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipointerno`
--

CREATE TABLE `equipointerno` (
  `idEquipo` int(11) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `serial` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL,
  `IdPiezaCargador` int(11) NOT NULL,
  `qrequipoInt` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionarios`
--

CREATE TABLE `funcionarios` (
  `idFuncionario` int(11) NOT NULL,
  `tipoDoc` varchar(2) NOT NULL DEFAULT 'CC',
  `documento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correoPersonal` varchar(200) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'Activo',
  `intentosFallidos` int(11) NOT NULL DEFAULT 0,
  `fechaCreacion` varchar(50) NOT NULL,
  `creadoPor` varchar(100) NOT NULL DEFAULT 'Default',
  `llave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `funcionarios`
--

INSERT INTO `funcionarios` (`idFuncionario`, `tipoDoc`, `documento`, `nombres`, `telefono`, `correoPersonal`, `rol`, `estado`, `intentosFallidos`, `fechaCreacion`, `creadoPor`, `llave`) VALUES
(1, 'CC', '1234567891', 'Juanito Alimaña', '3100000000', 'juanitoalimaña@gmail.com', 'MesaAyuda', 'Activo', 0, '2025-06-16 23:37:56.040', 'Coordinador', '$2b$10$RIS4d76B4bZjQCqO52.Uv.NL33FEk59lANgEoA1tJpzJQPfb7doBi'),
(2, 'CC', '1234567892', 'Rosario Tijeras', '3100000001', 'rosario@gmail.com', 'MesaAyuda', 'Activo', 0, '2025-06-16 23:37:56.040', 'Coordinador', '$2b$10$u9l3yT4XVdjjMFk7.F2hFe.ooZO49Xm68wsBI0YTmggg62WI5Zf/e'),
(3, 'CC', '1234567893', 'maria la del barrio', '3112222222', 'maria@gmail.com', 'Instructor', 'Activo', 0, '2025-06-21 16:48:10.751', 'Coordinador', '$2b$10$vWaL7oqhi7aKCEGeEbHEq.8NtQSzii7JQMxrq7M0kr79U87FsTVTu'),
(4, 'CC', '35353535', 'chinita millonaria', '3013333333', 'chinita@gmail.com', 'Vigilante', 'Activo', 0, '2025-07-01 12:48:16.923', 'coordinador', '$2b$10$vWaL7oqhi7aKCEGeEbHEq.8NtQSzii7JQMxrq7M0kr79U87FsTVTu'),
(6, 'CC', '3434343434', 'Trun', '3091111111', 'trun@gmail.com', 'Instructor', 'Activo', 0, '2025-07-04 22:01:46.499', 'Coordinador', '$2b$10$QVthEAdcvyfKymLlkSjb1u4E15k9Gei3e0BhO60sfAzTpMSwH5aim');

--
-- Disparadores `funcionarios`
--
DELIMITER $$
CREATE TRIGGER `llenarperfilfuncionario` AFTER INSERT ON `funcionarios` FOR EACH ROW BEGIN
    INSERT INTO perfilfuncionario (
        idPerfilfuncionario,
        documentoPerfil,
        nombresPerfil,
        telefono,
        correoPersonal)
    VALUES (
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
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `idPerfil` int(11) NOT NULL,
  `documentoPerfil` varchar(10) NOT NULL,
  `nombresPerfil` varchar(100) NOT NULL,
  `rh` varchar(3) DEFAULT NULL,
  `regional` varchar(200) NOT NULL DEFAULT 'Regional Antioquia',
  `centro` varchar(200) NOT NULL DEFAULT 'Centro Del diseño y Manufactura Del Cuero',
  `ficha` varchar(10) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `fechaExpedicion` varchar(10) DEFAULT NULL,
  `correoSena` varchar(200) DEFAULT NULL,
  `correoPersonal` varchar(200) DEFAULT NULL,
  `subsidio1` varchar(100) NOT NULL DEFAULT '0',
  `subsidio2` varchar(100) NOT NULL DEFAULT '0',
  `subsidio3` varchar(100) NOT NULL DEFAULT '0',
  `patrocinio` varchar(100) DEFAULT '0',
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`idPerfil`, `documentoPerfil`, `nombresPerfil`, `rh`, `regional`, `centro`, `ficha`, `telefono`, `fechaExpedicion`, `correoSena`, `correoPersonal`, `subsidio1`, `subsidio2`, `subsidio3`, `patrocinio`, `foto`) VALUES
(1, '1234567894', 'Rina', NULL, 'Regional Antioquia', 'Centro Del diseño y Manufactura Del Cuero', NULL, '3112222221', NULL, NULL, 'rina@gmail.com', '0', '0', '0', '0', NULL),
(2, '123456789', 'Diomedez Diaz', NULL, 'Regional Antioquia', 'Centro Del diseño y Manufactura Del Cuero', NULL, '3112222229', NULL, NULL, 'casique@gmail.com', '0', '0', '0', '0', NULL),
(3, '1234567890', 'Albert Einsten', NULL, 'Regional Antioquia', 'Centro Del diseño y Manufactura Del Cuero', NULL, '3501234567', NULL, NULL, 'alber@gmail.com', '0', '0', '0', '0', NULL),
(4, '10101010', 'Daniel Leon', NULL, 'Regional Antioquia', 'Centro Del diseño y Manufactura Del Cuero', NULL, '3108888888', NULL, NULL, 'dani@gmail.com', '0', '0', '0', '0', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfilfuncionario`
--

CREATE TABLE `perfilfuncionario` (
  `idPerfilfuncionario` int(11) NOT NULL,
  `documentoPerfil` varchar(10) NOT NULL,
  `nombresPerfil` varchar(100) NOT NULL,
  `rh` varchar(3) DEFAULT NULL,
  `regional` varchar(100) NOT NULL DEFAULT 'Regional Antioquia',
  `centro` varchar(200) NOT NULL DEFAULT 'Centro Del Diseño y Maufactura Del Cuero',
  `telefono` varchar(10) DEFAULT NULL,
  `fechaExpedicion` varchar(10) DEFAULT NULL,
  `correoSena` varchar(200) DEFAULT NULL,
  `correoPersonal` varchar(200) DEFAULT NULL,
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfilfuncionario`
--

INSERT INTO `perfilfuncionario` (`idPerfilfuncionario`, `documentoPerfil`, `nombresPerfil`, `rh`, `regional`, `centro`, `telefono`, `fechaExpedicion`, `correoSena`, `correoPersonal`, `foto`) VALUES
(1, '1234567891', 'Juanito Alimaña', NULL, 'Regional Antioquia', 'Centro Del Diseño y Maufactura Del Cuero', '3100000000', NULL, NULL, 'juanitoalimaña@gmail.com', NULL),
(2, '1234567892', 'Rosario Tijeras', NULL, 'Regional Antioquia', 'Centro Del Diseño y Maufactura Del Cuero', '3100000001', NULL, NULL, 'rosario@gmail.com', NULL),
(3, '1234567893', 'maria la del barrio', NULL, 'Regional Antioquia', 'Centro Del Diseño y Maufactura Del Cuero', '3112222222', NULL, NULL, 'maria@gmail.com', NULL),
(4, '35353535', 'chinita millonaria', NULL, 'Regional Antioquia', 'Centro Del Diseño y Maufactura Del Cuero', '3013333333', NULL, NULL, 'chinita@gmail.com', NULL),
(5, '3434343434', 'Trun', NULL, 'Regional Antioquia', 'Centro Del Diseño y Maufactura Del Cuero', '3091111111', NULL, NULL, 'trun@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pieza`
--

CREATE TABLE `pieza` (
  `idPieza` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `model` varchar(50) NOT NULL,
  `serial` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'Activo',
  `qrPieza` longblob DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pieza`
--

INSERT INTO `pieza` (`idPieza`, `tipo`, `descripcion`, `marca`, `model`, `serial`, `estado`, `qrPieza`, `color`) VALUES
(1, 'Mause', 'Mause negro alambrico', 'Dell', 'SMRGBCD001', 'SMRGBCD001', 'Activo', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamoequipo`
--

CREATE TABLE `prestamoequipo` (
  `idPrestamoEquipo` int(11) NOT NULL,
  `idEquipoInterno` int(11) NOT NULL,
  `DocPrestador` varchar(10) NOT NULL,
  `nombrePrestador` varchar(100) DEFAULT NULL,
  `fechaPrestamo` varchar(50) NOT NULL,
  `ticPrestador` varchar(100) NOT NULL,
  `fechaDevolucion` varchar(50) DEFAULT NULL,
  `ticRecibe` varchar(50) DEFAULT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'Por Aprobar'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `idSala` int(11) NOT NULL,
  `nombreSala` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'Disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`idSala`, `nombreSala`, `descripcion`, `estado`) VALUES
(1, 'Calzado 1', 'sala para el área de Calzado medular', 'Disponible'),
(2, 'Calzado 2', 'sala para el área de Calzado medular', 'Disponible'),
(3, 'Sala De Diseño', 'Sala de Diseño del área medular ', 'Disponible'),
(4, 'sala 200', 'Sala 200 area transversal ADSO', 'Disponible'),
(5, 'Sala 201', 'Sala 201 area transversal ADSO', 'Disponible'),
(6, 'Sala 202', 'Sala 202 area transversal ADSO', 'Disponible'),
(7, 'Sala 203', 'Sala 203 area transversal', 'Disponible'),
(8, 'Sala 204', 'Sala 204 area transversal ADSO', 'Disponible'),
(9, 'Sala 205', 'Sala 205 area transversal', 'Disponible'),
(10, 'Sala 206', 'Sala 206 area transversal', 'Disponible'),
(11, 'Sala 207', 'Sala 207 area transversal', 'Disponible'),
(12, 'Sala 208', 'Sala 208 area transversal', 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokenaprendiz`
--

CREATE TABLE `tokenaprendiz` (
  `idtokenAprendiz` int(11) NOT NULL,
  `usuario` varchar(10) NOT NULL,
  `nombresAprendiz` varchar(100) NOT NULL,
  `rol` varchar(30) NOT NULL DEFAULT 'Aprendiz',
  `token` varchar(255) NOT NULL,
  `dispositivo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tokenaprendiz`
--

INSERT INTO `tokenaprendiz` (`idtokenAprendiz`, `usuario`, `nombresAprendiz`, `rol`, `token`, `dispositivo`) VALUES
(1, '123456789', 'Diomedez Diaz', 'Aprendiz', '5ededb4d06bb58d7d15c960c4830e6754c1898004c490d0f49043d77362986ac', 'Web'),
(2, '10101010', 'Daniel Leon', 'Aprendiz', '059ceb40bcdf86559d64b1fd81b9c2676b835e29bfdd386a5233ff6bbe930114', 'Movil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokenfuncionario`
--

CREATE TABLE `tokenfuncionario` (
  `idtokenFuncionario` int(11) NOT NULL,
  `usuarioFuncionario` varchar(10) NOT NULL,
  `nombresFuncionario` varchar(100) NOT NULL,
  `rol` varchar(30) NOT NULL DEFAULT 'Aprendiz',
  `token` varchar(255) NOT NULL,
  `dispositivo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tokenfuncionario`
--

INSERT INTO `tokenfuncionario` (`idtokenFuncionario`, `usuarioFuncionario`, `nombresFuncionario`, `rol`, `token`, `dispositivo`) VALUES
(8, '35353535', 'chinita millonaria', 'Vigilante', '0b271870ed863752e2f25e9de6aeb5f82be52bcb5ee84e8dd5348ae307ebc6f9', 'Web');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aprendiz`
--
ALTER TABLE `aprendiz`
  ADD PRIMARY KEY (`idAprendiz`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correoPersonal` (`correoPersonal`);

--
-- Indices de la tabla `equipointerno`
--
ALTER TABLE `equipointerno`
  ADD PRIMARY KEY (`idEquipo`),
  ADD UNIQUE KEY `serial` (`serial`),
  ADD KEY `IdPiezaCargador` (`IdPiezaCargador`);

--
-- Indices de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`idFuncionario`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `correoPersonal` (`correoPersonal`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`idPerfil`);

--
-- Indices de la tabla `perfilfuncionario`
--
ALTER TABLE `perfilfuncionario`
  ADD PRIMARY KEY (`idPerfilfuncionario`);

--
-- Indices de la tabla `pieza`
--
ALTER TABLE `pieza`
  ADD PRIMARY KEY (`idPieza`),
  ADD UNIQUE KEY `serial` (`serial`);

--
-- Indices de la tabla `prestamoequipo`
--
ALTER TABLE `prestamoequipo`
  ADD PRIMARY KEY (`idPrestamoEquipo`),
  ADD KEY `idEquipoInterno` (`idEquipoInterno`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`idSala`),
  ADD UNIQUE KEY `nombreSala` (`nombreSala`);

--
-- Indices de la tabla `tokenaprendiz`
--
ALTER TABLE `tokenaprendiz`
  ADD PRIMARY KEY (`idtokenAprendiz`);

--
-- Indices de la tabla `tokenfuncionario`
--
ALTER TABLE `tokenfuncionario`
  ADD PRIMARY KEY (`idtokenFuncionario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aprendiz`
--
ALTER TABLE `aprendiz`
  MODIFY `idAprendiz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipointerno`
--
ALTER TABLE `equipointerno`
  MODIFY `idEquipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `idFuncionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pieza`
--
ALTER TABLE `pieza`
  MODIFY `idPieza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `prestamoequipo`
--
ALTER TABLE `prestamoequipo`
  MODIFY `idPrestamoEquipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tokenaprendiz`
--
ALTER TABLE `tokenaprendiz`
  MODIFY `idtokenAprendiz` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tokenfuncionario`
--
ALTER TABLE `tokenfuncionario`
  MODIFY `idtokenFuncionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipointerno`
--
ALTER TABLE `equipointerno`
  ADD CONSTRAINT `equipointerno_ibfk_1` FOREIGN KEY (`IdPiezaCargador`) REFERENCES `pieza` (`idPieza`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prestamoequipo`
--
ALTER TABLE `prestamoequipo`
  ADD CONSTRAINT `prestamoequipo_ibfk_1` FOREIGN KEY (`idEquipoInterno`) REFERENCES `equipointerno` (`idEquipo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
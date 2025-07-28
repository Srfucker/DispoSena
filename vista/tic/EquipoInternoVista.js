// Vista para mostrar un equipo interno
const mostrarEquipoInterno = (equipo) => {
  return {
    idEquipo: equipo.idEquipo,
    marca: equipo.marca,
    modelo: equipo.modelo,
    serial: equipo.serial,
    color: equipo.color,
    IdPiezaCargador: equipo.IdPiezaCargador,
    qrequipoInt: equipo.qrequipoInt
  };
};

module.exports = { mostrarEquipoInterno };

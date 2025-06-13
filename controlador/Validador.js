class Validador {
  validarTodos(tipodoc, doc, nombres, llave) {
    const errores = [];

    const campos = this.verCampos(tipodoc, doc, nombres, llave);
    if (campos) errores.push(campos);

    const tdoc = this.verTdoc(tipodoc);
    if (tdoc) errores.push(tdoc);

    const ide = this.verIde(doc);
    if (ide) errores.push(ide);

    const nom = this.verNombres(nombres);
    if (nom) errores.push(nom);

    const clave = this.verLlave(llave);
    if (clave) errores.push(clave);

    return errores;
  }

  verCampos(tipodoc, doc, nombres, llave) {
    if (!tipodoc || !doc || !nombres || !llave) {
      return 'Todos los campos son obligatorios.';
    }
    return null;
  }

  verTdoc(td) {
    const tdoc = /^[CETP\s]{2,2}$/;
    if (!td.test(tdoc)) {
      return 'Tipo de Documento invalido. Solo identificadores(CC, CE, PT, PP ) (solo 2 caracteres).';
    }
    return null;
  }

  verIde(doc) {
    if (!/^\d{6,10}$/.test(doc)) {
      return 'La identificación debe tener entre 6 y 10 dígitos numéricos.';
    }
    return null;
  }

  verNombres(nombres) {
    const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
    if (!nom.test(nombres)) {
      return 'Nombres y apellidos inválidos. Solo letras (3-100 caracteres).';
    }
    return null;
  }

  verLlave(contra) {
    const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!key.test(contra)) {
      return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
    }
    return null;
  }
}

module.exports = Validador;
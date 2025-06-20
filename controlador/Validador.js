class Validador {
  /**
   * Valida todos los campos necesarios para crear un funcionario, retornando el primer error encontrado.
   * Este método es ideal para la creación/registro de nuevos funcionarios.
   * @param {string} tipoDoc - Tipo de documento.
   * @param {string} documento - Número de documento.
   * @param {string} nombres - Nombres y apellidos.
   * @param {string} telefono - Telefono.
   * @param {string} correoPersonal - Correo Personal.
   * @param {string} llave - Contraseña.
   * @returns {string|null} El primer mensaje de error encontrado, o null si no hay errores.
   */
  validarTodos(tipoDoc, documento, nombres, telefono, correoPersonal, llave) {
    // Validar que ningún campo esté vacío
    const camposObligatorios = this.verCampos(tipoDoc, documento, nombres, telefono, correoPersonal, llave);
    if (camposObligatorios) return camposObligatorios;
   
    // Validar tipo de documento
    const tdocError = this.verTdoc(tipoDoc);
    if (tdocError) return tdocError;

    // Validar identificación
    const ideError = this.verIde(documento);
    if (ideError) return ideError;

    // Validar nombres
    const nomError = this.verNombres(nombres);
    if (nomError) return nomError;

    // Validar Telefono
    const telError = this.verTel(telefono);
    if (telError) return telError;

    // Validar Correo Personal
    const emailError = this.verEmail(correoPersonal);
    if (emailError) return emailError;

    // Validar contraseña
    const claveError = this.verLlave(llave);
    if (claveError) return claveError;

    return null; // No hay errores
  }

  /**
   * Verifica si los campos esenciales para el login están presentes.
   * Este método es más específico para el login.
   * @param {string} documento
   * @param {string} llave
   * @returns {string|null} Mensaje de error si falta algún campo, de lo contrario null.
   */
  verCamposLogin(documento, llave) {
    if (!documento) {
      return 'El usuario es obligatorio.';
    }
    if (!llave) {
      return 'la contraseña es obligatoria.';
    }
    return null;
  }

  /**
   * Verifica si todos los campos están presentes. (Usado para creación/registro)
   * @param {string} tipoDoc
   * @param {string} documento
   * @param {string} nombres
   * @param {string} telefono
   * @param {string} correoPersonal
   * @param {string} llave
   * @returns {string|null} Mensaje de error si falta algún campo, de lo contrario null.
   */
  verCampos(tipoDoc, documento, nombres, telefono, correoPersonal, llave) {
    if (!tipoDoc || !documento || !nombres || !telefono || !correoPersonal || !llave) {
      return 'Todos los campos son obligatorios.';
    }
    return null;  
  }

  /**
   * Valida el tipo de documento.
   * @param {string} td - Tipo de documento (ej. "CC", "CE").
   * @returns {string|null} Mensaje de error si es inválido, de lo contrario null.
   */
  verTdoc(td) {
    // Expresión regular para "CC", "CE", "PT", "PP" (mayúsculas, solo 2 caracteres)
    const tdocRegex = /^(CC|CE|PT|PP)$/;
    if (!td || !tdocRegex.test(td)) {
      return 'Tipo de documento inválido. Solo (CC, CE, PT, PP) (solo 2 caracteres).';
    }
    return null;
  }

  /**
   * Valida el número de identificación.
   * @param {string} doc - Número de documento.
   * @returns {string|null} Mensaje de error si es inválido, de lo contrario null.
   */
  verIde(doc) {
    // Expresión regular para 6 a 10 dígitos numéricos
    if (!doc || !/^\d{6,10}$/.test(doc)) {
      return 'La identificación debe tener entre 6 y 10 dígitos numéricos.';
    }
    return null;
  }

  /**
   * Valida nombres y apellidos.
   * @param {string} name - Nombres y apellidos.
   * @returns {string|null} Mensaje de error si es inválido, de lo contrario null.
   */
  verNombres(name) {
    // Expresión regular para letras (incluyendo acentos y Ññ) y espacios, 3-100 caracteres
    const nomRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
    if (!name || !nomRegex.test(name)) {
      return 'Nombres y apellidos inválidos. Solo letras (3-100 caracteres).';
    }
    return null;
  }

  /**
   * Valida el número de teléfono.
   * @param {string} telefono - Número de teléfono.
   * @returns {string|null} Mensaje de error si es inválido, de lo contrario null.
   */
  verTel(telefono) {
    // Expresión regular para 10 dígitos numéricos
    if (!telefono || !/^\d{10}$/.test(telefono)) { // Corregido a {10} para exactamente 10 dígitos
      return 'El teléfono debe tener 10 dígitos numéricos.';
    }
    return null;
  }

  /**
   * Valida la dirección de correo electrónico.
   * @param {string} email - Correo electrónico a validar.
   * @returns {string|null} Mensaje de error si es inválido, de lo contrario null.
   */
  verEmail(email) {
    const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !er.test(email) || email.length > 200) {
      return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
    }
    return null;
  }

  /**
   * Valida la contraseña.
   * @param {string} contra - Contraseña.
   * @returns {string|null} Mensaje de error si es inválida, de lo contrario null.
   */
  verLlave(contra) {
    // Expresión regular para al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial
    const keyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!contra || !keyRegex.test(contra)) {
      return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
    }
    return null;
  }
}

module.exports = Validador;
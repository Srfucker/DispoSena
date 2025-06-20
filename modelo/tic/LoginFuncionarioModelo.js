const bcrypt = require('bcrypt');
const Conexion = require('../enlace/Conexion'); 


class LoginFuncionarioModelo {
    static #instance = null;
    #dbConexionInstance = null;

    constructor() {
        this.#dbConexionInstance = Conexion; // Conexion.js ya exporta una instancia única
    }

    
    static async getInstance() {
        if (LoginFuncionarioModelo.#instance === null) {
            LoginFuncionarioModelo.#instance = new LoginFuncionarioModelo();
        }
        return LoginFuncionarioModelo.#instance;
    }

    async login(documento, llave) {
        if (!this.#dbConexionInstance) {
            console.error('Error: conexión a la base de datos no está disponible.');
            return null;
        }

        try {
            const rows = await this.#dbConexionInstance.query(
                'SELECT idFuncionario, documento, nombres, rol, estado, llave FROM funcionarios WHERE documento = ? AND rol= ?',
                [documento, "MesaAyuda"]
            );

            // Si no se encontró ningún funcionario con ese documento
            if (rows.length === 0) {
                // El controlador interpretará que no se encontró el usuario
                return null;
            }

            const funcionario = rows[0];

            // Compara la contraseña proporcionada con el hash almacenado en la base de datos
            const passwordMatch = await bcrypt.compare(llave, funcionario.llave);

            if (passwordMatch) {
                // Si la contraseña coincide, el login es exitoso
                // Se devuelve el objeto funcionario, excluyendo la llave (hash de contraseña)
                const { llave, ...funcionarioData } = funcionario; // Destructuring para excluir la llave
                return funcionarioData;
            } else {
                // Si la contraseña no coincide, el controlador interpretará esto como un fallo de credenciales
                return null;
            }
        } catch (error) {
            // Este log de error es para problemas internos del modelo/DB, no para el usuario final.
            console.error('Error durante el proceso de login en el modelo:', error.message);
            return null;
        }
    }

  
}

module.exports = LoginFuncionarioModelo;
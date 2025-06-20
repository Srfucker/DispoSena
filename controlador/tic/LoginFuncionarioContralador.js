const LoginFuncionarioModelo = require('../../modelo/tic/LoginFuncionarioModelo');
const Validador = require('../Validador');


class LoginFuncionarioControlador {
    
    static async loginFuncionario(req, res) {
       
        const { t2: documento, t6: llave } = req.body;

        // --- Paso 1: Validar los datos de entrada usando la clase Validador ---
        const validador = new Validador(); // Instancia del validador

        let validationError = null;

        // 1.1. Verificar que los campos no estén vacíos (usando el método específico para login)
        validationError = validador.verCamposLogin(documento, llave);
        if (validationError) {
            return res.status(400).json({ mensaje: validationError });
        }

        // 1.2. Validar el formato del documento (solo números, longitud)
        validationError = validador.verIde(documento);
        if (validationError) {
            return res.status(400).json({mensaje: validationError });
        }

        // 1.3. Validar el formato de la llave (contraseña)
        validationError = validador.verLlave(llave);
        if (validationError) {
            return res.status(400).json({mensaje: validationError });
        }

        try {
            // --- Paso 2: Obtener la instancia Singleton del modelo de login ---
            // El modelo se encargará de interactuar con la base de datos y validar las credenciales.
            const loginModel = await LoginFuncionarioModelo.getInstance();

            // --- Paso 3: Llamar al método 'login' del modelo ---
            // El modelo devuelve los datos del funcionario si el login es exitoso, o null si falla.
            const funcionario = await loginModel.login(documento, llave);

            // --- Paso 4: Procesar la respuesta del modelo y enviar la respuesta HTTP ---
            if (funcionario) {
                return res.status(200).json({
                    mensaje: 'Login exitoso.',
                    data: funcionario // Contiene idFuncionario, documento, nombres, rol, estado
                });
            } else {
                 return res.status(401).json({
                    mensaje: 'Credenciales inválidas (documento o contraseña incorrectos).'
                });
            }
        } catch (error) {
            // --- Manejo de errores internos ---
            // Este 'catch' atrapará errores que provengan del modelo (ej. problemas de conexión a DB).
            console.error('Error interno en el controlador de login:', error.message);
            return res.status(500).json({

                mensaje: 'Ocurrió un error inesperado durante el login. Por favor, inténtalo de nuevo más tarde.'
            });
        }
    }
}

module.exports = LoginFuncionarioControlador;
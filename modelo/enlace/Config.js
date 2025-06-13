require('dotenv').config();

class DBConfig {
  constructor() {
    this.traeVariable = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    this._validaVariable();
    this.host = process.env.DB_HOST;
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_NAME;
  }

  _validaVariable() {
    this.traeVariable.forEach((key) => {
      if (!process.env[key]) {
        console.warn(`⚠️  La variable de entorno ${key} no está definida.`);
      }
    });
  }

  getConfig() {
    return {
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    };
  }
}

module.exports = new DBConfig().getConfig();
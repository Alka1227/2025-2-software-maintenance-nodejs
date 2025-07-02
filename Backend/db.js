const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'task_App', 
  'postgres', 
  '12345678', 
  {
    host: 'localhost', 
    port: '5432', 
    dialect: 'postgres',
  }
);

// Función para conectar
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); 
  }
};

module.exports = { sequelize, connectDB };
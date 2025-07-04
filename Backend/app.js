const express = require('express');
const cors = require('cors');
const taskRoutes = require('./Controller/TaskController.js');
const { sequelize, connectDB } = require('./db.js');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // el puerto donde corre frontend
}));

app.use(express.json()); //middleware para parsear JSON

app.use('/api', taskRoutes);

const start = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    app.listen(4000, () => {
      console.log('Servidor escuchando en http://localhost:4000');
    });
  } catch (error) {
    console.error('Error iniciando el servidor:', error);
    process.exit(1);
  }
};

start();
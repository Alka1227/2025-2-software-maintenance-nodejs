const { run } = require('./Controller/TaskController.js');
const view = require('./View/cliView.js');
const { sequelize, connectDB } = require('./db.js');

const init = async () => {
  // Conexión a la base de datos
  await connectDB()
  await sequelize.sync(); //Asegura que los modelos estén sincronizados con las tablas de la BD

  // Run the application
  await run();

};

  init().catch(error => {
    console.error('An error occurred:', error);
    view.close();
});

  process.on('SIGINT', async () => { //Signal interruption
    await sequelize.close();
    view.close();
    process.exit(0); //Termina el proceso con código 0 (exitoso)
  });
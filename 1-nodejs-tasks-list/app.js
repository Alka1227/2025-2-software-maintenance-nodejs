const { run } = require('./Controller/TaskController.js');
const view = require('./View/cliView');

// Run the application
run().catch(error => {
  console.error('An error occurred:', error);
  view.close();
});
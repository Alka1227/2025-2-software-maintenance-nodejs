const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt user for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}


function printMenu() {
    console.log('\nTASK MANAGER');
    console.log('1. Add Task');
    console.log('2. List Tasks');
    console.log('3. Mark Task as Complete');
    console.log('4. Delete Task');
    console.log('5. Exit');
}

function printTasks(tasks){
    if (tasks.length === 0) {
        console.log('No tasks found');
        return;
    }

    console.log('\n ' + '='.repeat(80)); //linea separadora
    console.log(`${'ID'.padEnd(5)} ${'TITLE'.padEnd(20)} ${'STATUS'.padEnd(10)} ${'CREATED DATE'.padEnd(20)} ${'DESCRIPTION'.padEnd(30)}`);
    console.log('-'.repeat(80)); //linea sepadaroda

    //bucle para recorrer tasks
    for (const task of tasks) {
        console.log(`${String(task.id).padEnd(5)} ${task.title.substring(0, 18).padEnd(20)} ${task.status.padEnd(10)} ${task.createdDate.padEnd(20)} ${task.description.substring(0, 28).padEnd(30)}`);
    }
     console.log('='.repeat(80) + '\n');
}

function close() { //Cierra la interfaz de readline
  console.log('Exiting the task manager. Goodbye!');
  rl.close();
}

module.exports = {
  prompt,
  printMenu,
  printTasks,
  close
};
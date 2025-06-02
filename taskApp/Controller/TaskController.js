const TaskManager = require('../Model/taskModel.js');
const { isValidString, isValidID} = require('../utils/validators.js');
const view = require('../View/cliView.js');

async function run() {
    const taskManager = new TaskManager();

    while(true){
        try {
            view.printMenu();
            const choice = await view.prompt('Enter your choice (1-5): ');

            switch(choice){
                case '1':
                    const input = await view.prompt('Enter task title: ');
                    if(!ValidString(input)) {
                        console.log('Invalid title. Please enter a non-empty, text maximum of 255 characters.');
                        break;
                    }
                    const title = input.trim();
                    const description = await view.prompt('Enter task descripton: ');
                    await taskManager.addTask(title, description);
                    console.log(`Task '${title}' added successfully!`);
                    break;
                case '2':
                    const task = await taskManager.listTasks()
                    view.printTasks(task);
                    break;
                case '3':
                    const taskId = await view.prompt('Enter task ID: ');
                    if (!isValidID(taskId)) {
                        console.log('Invalid ID. Must be a positive number.');
                        break;
                    }
                    const success = await taskManager.markComplete(taskId);
                    if (success) {
                        console.log(`Task ${taskId} marked as completed.`);
                    } else {
                        console.log(`Task ${taskId} not found.`);
                    }
                    break;
                case '4': {
                    const deleteTaskId = await view.prompt('Enter task ID you wish to delete: ');
                    if (!isValidID(deleteTaskId)) {
                        console.log('Invalid ID. Must be a positive number.');
                        break;
                    }
                    const deleted = await taskManager.deleteTask(deleteTaskId);
                    if (deleted) {
                        console.log(`Task ${deleteTaskId} deleted successfully.`);
                    } else {
                        console.log(`Task ${deleteTaskId} not found.`);
                    }
                    break;
                }
                case '5':
                    view.close();
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
                
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

module.exports = { run };
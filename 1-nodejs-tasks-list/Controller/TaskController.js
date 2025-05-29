const TaskManager = require('../Model/taskModel.js');
const view = require('../View/cliView.js');

async function run() {
    const taskManager = new TaskManager();

    while(true){
        view.printMenu();
        const choice = await view.prompt('Enter your choice (1-5): ');

        switch(choice){
            case '1':
                const title = await view.prompt('Enter task title: ');
                const description = await view.prompt('Enter task descripton: ');
                taskManager.addTask(title, description);
                console.log(`Task '${title}' added successfully!`);
                break;
            case '2':
                view.printTasks(taskManager.listTasks());
                break;
            case '3':
                const taskId = parseInt(await view.prompt('Enter task ID: '));
                if (taskManager.markComplete(taskId)) {
                    console.log(`Task with ID ${taskId} marked as completed!`);
                } else {
                    console.log(`Task with ID ${taskId} not found.`);
                }
                break;
            case '4':
                const deleteTaskId = parseInt(await view.prompt('Enter task ID you wish to delete: '));
                if (taskManager.deleteTask(deleteTaskId)) {
                    console.log(`Task with ID ${deleteTaskId} removed!`);
                } else {
                    console.log(`Task with ID ${deleteTaskId} not found.`);
                }
                break;
            case '5':
                view.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
            
        }
    }
}

module.exports = { run };
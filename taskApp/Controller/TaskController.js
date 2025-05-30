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
                await taskManager.addTask(title, description);
                console.log(`Task '${title}' added successfully!`);
                break;
            case '2':
                const task = await taskManager.listTasks()
                view.printTasks(task);
                break;
            case '3':
                const taskId = parseInt(await view.prompt('Enter task ID: '));
                const success = await taskManager.markComplete(taskId);
                if (success) {
                    console.log(`Task ${taskId} marked as completed.`);
                } else {
                    console.log(`Task ${taskId} not found.`);
                }
                break;
            case '4': {
                const deleteTaskId = parseInt(await view.prompt('Enter task ID you wish to delete: '));
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
    }
}

module.exports = { run };
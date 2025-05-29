const fs = require('fs');

class taskManager { 
  constructor() {
    this.tasks = [];
    this.fileName = 'tasks.json';
    this.loadTasks();
  }
    loadTasks() {
      if (fs.existsSync(this.fileName)) {
        try {
          const data = fs.readFileSync(this.fileName, 'utf8');
          this.tasks = JSON.parse(data);
        } catch (error) {
          console.log('Error loading task data. Starting with empty task list.');
          this.tasks = [];
        }
      }
    }
    saveTasks() {
      fs.writeFileSync(this.fileName, JSON.stringify(this.tasks));
    }

    getTaskId(){
      if (this.tasks.length === 0 ){
        return 1;
      } else {
        const MaxID = Math.max(...this.tasks.map(task => task.id));
        return MaxID + 1; 
      }
    }
    addTask(title, description) {
      const task = {
        id: this.getTaskId(),
        title: title,
        description: description,
        status: 'Pending',
        createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      
      this.tasks.push(task);
      this.saveTasks();
      console.log(`Task '${title}' added successfully!`);
    }

    listTasks() {
      return this.tasks;
    }

    markComplete(taskId) {
      for (const task of this.tasks) {
        if (task.id === taskId) {
          task.status = 'Completed';
          this.saveTasks();
          return true;
        }
      }
    }
    deleteTask(deleteTaskId) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === deleteTaskId) {
          const removed = this.tasks.splice(i, 1)[0];
          this.saveTasks();
          return true;
        }
      }
    }
}

module.exports = taskManager;
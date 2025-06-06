const fs = require('fs');
const Task = require('../Model/Task.js');

class taskManager {
    constructor() {
        this.tasks = Task;
    } 
    async addTask(title, description) {
      try {
        const task = await Task.create({ title, description });
        console.log(`Task ${title} created successfully`);
      }
      catch (error) {
        console.error(`Error creating task ${title}:`, error);
        throw error;
      };
    }

    async listTasks() {
      try {
        return await Task.findAll();
      } catch (error) {
        console.error('Error listing tasks:', error);
        throw error;
      }
    }

    async markComplete(taskId) {
      try {
        const task = await Task.findByPk(taskId);
        if (!task){
          console.log(`Task ${taskId} not found`);
          return false;
        }

        task.status = 'Completed';
        await task.save();
        return true;
      } catch (error){
        console.error(`Error marking task ${taskId} as completed:`, error);
        return false;
      }
    }
    async deleteTask(deleteTaskId) {
      try {  
        const task = await Task.findByPk(deleteTaskId);
        if (!task) return false;
        await task.destroy();
        return true;
      } catch (error) {
        console.error(`Error deleting task ${deleteTaskId}:`, error);
        return false;
      }
    }

    //Update task

}

module.exports = taskManager;
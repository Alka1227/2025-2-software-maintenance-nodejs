const fs = require('fs');
const Task = require('../Model/Task.js');

class taskManager {
    constructor() {
        this.tasks = Task;
    }

    
  async addTask(title, description) {
    try {
      const task = await Task.create({
        title: title.trim(),
        description: description ? description.trim() : null,
      })
      console.log(`Task "${title}" created successfully with ID: ${task.id}`)
      return task
    } catch (error) {
      console.error(`Error creating task "${title}":`, error)
      throw error
    }
  }

  async listTasks() {
    try {
      return await Task.findAll({
        order: [["createdDate", "DESC"]],
      })
    } catch (error) {
      console.error("Error listing tasks:", error)
      throw error
    }
  }

  async markComplete(taskId) {
    try {
      const task = await Task.findByPk(taskId)
      if (!task) {
        console.log(`Task ${taskId} not found`)
        return false
      }

      if (task.status === "Completed") {
        console.log(`Task ${taskId} is already completed`)
        return true
      }

      task.status = "Completed"
      await task.save()
      console.log(`Task ${taskId} marked as completed`)
      return true
    } catch (error) {
      console.error(`Error marking task ${taskId} as completed:`, error)
      return false
    }
  }

  async deleteTask(deleteTaskId) {
    try {
      const task = await Task.findByPk(deleteTaskId)
      if (!task) {
        console.log(`Task ${deleteTaskId} not found`)
        return false
      }
      await task.destroy()
      console.log(`Task ${deleteTaskId} deleted successfully`)
      return true
    } catch (error) {
      console.error(`Error deleting task ${deleteTaskId}:`, error)
      return false
    }
  }
}

module.exports = taskManager;
const TaskManager = require('../Model/taskModel.js');
const express = require('express');
const router = express.Router();

const manager = new TaskManager();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await manager.listTasks()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" })
    }
    await manager.addTask(title, description)
    res.status(201).json({ message: "Task created successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" })
  }
})

router.put("/tasks/:id/complete", async (req, res) => {
  try {
    const { id } = req.params
    const success = await manager.markComplete(Number.parseInt(id))
    if (success) {
      res.json({ message: "Task marked as complete" })
    } else {
      res.status(404).json({ error: "Task not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" })
  }
})

router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params
    const success = await manager.deleteTask(Number.parseInt(id))
    if (success) {
      res.json({ message: "Task deleted successfully" })
    } else {
      res.status(404).json({ error: "Task not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" })
  }
})
module.exports = router;
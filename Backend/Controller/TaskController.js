const TaskManager = require('../Model/taskModel.js');
const express = require('express');
const router = express.Router();

router.get('/tasks', async (req, res) => {
  const tasks = await taskManager.listTasks();
  res.json(tasks);
});

router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  await taskManager.addTask(title, description);
  res.status(201).send();
});

module.exports = router;
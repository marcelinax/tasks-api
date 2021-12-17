const Task = require("../models/Task");
const tasksService = require("../services/tasks.service");
const messages = require("../messages");

const getAllTasks = async (req, res) => {
  try {
    res.json(await tasksService.getAllTasks());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    let task = await tasksService.findTaskById(req.params.id);
    if (!task)
      return res.status(404).json({ message: messages.CANNOT_FIND_TASK });
    else res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, content, start, end, photoUrl } = req.body;
    const newTask = await tasksService.createTask({
      title,
      content,
      start,
      end,
      photoUrl,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await tasksService.deleteTaskById(id);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, start, end, photoUrl } = req.body;
    const updatedTask = await tasksService.updateTask(id, {
      title,
      content,
      start,
      end,
      photoUrl,
    });
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await tasksService.toggleTaskStatus(id);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchTasks = async (req, res) => {
  const { query, finished, start, end } = req.body;
  res.json(await tasksService.searchTasks(query, finished, start, end));
};

const deleteAllFinishedTasks = async (req, res) => {
  try {
    res.status(201).json({message: messages.DELETED_ALL_FINISHED_TASKS})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  toggleTaskStatus,
  searchTasks,
  deleteAllFinishedTasks
};
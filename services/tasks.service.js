const Task = require("../models/Task");
const moment = require("moment");

const getAllTasks = async () => {
  const tasks = await Task.find();
  return tasks;
};

const findTaskById = async (taskId) => {
  const task = await Task.findById(req.params.taskId);
  return task;
};

const createTask = async (newTask) => {
  const createdTask = await new Task(newTask);
  await createdTask.save();
  return createdTask;
};

const deleteTaskById = async (taskId) => {
  await Task.findByIdAndRemove(taskId);
  return;
};

const updateTask = async (taskId, updatedTask) => {
  const task = Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
  return task;
};

const toggleTaskStatus = async (taskId) => {
  const taskToChange = await Task.findById(taskId);
  taskToChange.finished = !taskToChange.finished;
  await taskToChange.save();
  return taskToChange;
};

const searchTasks = async (query, finished, end) => {
  let searchingTasks = await Task.find().lean();
  
  if (query) {
      searchingTasks = searchingTasks.filter(task =>
          task.title.includes(query) ||
          task.content.includes(query)
      )
  }

  if (end) {
      searchingTasks = searchingTasks.filter(task =>  moment(task.end) <= moment(end))
  }

  if (finished !== undefined) {
    searchingTasks = searchingTasks.filter(task => task.finished === finished);
  }

  return searchingTasks;
}

const deleteAllFinishedTasks = async () => {
  await Task.deleteMany({ finished: true });
  return;
}

module.exports = {
  getAllTasks,
  findTaskById,
  createTask,
  deleteTaskById,
  updateTask,
  toggleTaskStatus,
  searchTasks,
  deleteAllFinishedTasks
};

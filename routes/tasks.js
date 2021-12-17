const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks.controller')

router.get('/', taskController.getAllTasks)
router.post('/', taskController.createTask)
router.get('/:id', taskController.getTask)
router.delete('/:id', taskController.deleteTask)
router.put('/:id', taskController.updateTask)
router.post('/toggle/:id', taskController.toggleTaskStatus)
router.post('/search', taskController.searchTasks)
router.post('/deleteFinishedTasks', taskController.deleteAllFinishedTasks)

module.exports = router;
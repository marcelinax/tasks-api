const express = require('express')
const router = express.Router()
const taskController = require('../../controllers/tasks/task')

router.get('/', taskController.getTasks)
router.post('/', taskController.createTask)
router.get('/:id', taskController.getTask)


module.exports = router
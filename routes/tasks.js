const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks.controller')
const { check } = require('express-validator');

router.get('/', taskController.getAllTasks)

router.post('/',
    check('title').not().isEmpty().withMessage('Enter a title'),
    check('content').not().isEmpty().withMessage('Enter a content'),
    check('end').isISO8601(),
    check('photoUrl').optional({checkFalsy: true}).isURL().withMessage('Enter valid url'),
    taskController.createTask);

router.get('/:id', taskController.getTask)

router.delete('/:id', taskController.deleteTask)

router.put('/:id',
    check('title').not().isEmpty().withMessage('Enter a title'),
    check('content').not().isEmpty().withMessage('Enter a content'),
    check('end').isISO8601(),
    check('photoUrl').optional({checkFalsy: true}).isURL().withMessage('Enter valid url')
, taskController.updateTask)

router.post('/toggle/:id', taskController.toggleTaskStatus)

router.post('/search', taskController.searchTasks)

router.post('/deleteFinishedTasks', taskController.deleteAllFinishedTasks)

module.exports = router;
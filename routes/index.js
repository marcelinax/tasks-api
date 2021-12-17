const router = require('express').Router();

router.use('/tasks', require('./tasks'));

module.exports = router;
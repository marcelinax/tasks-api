const express = require('express');
const mongoose = require('mongoose')
const config = require('./config')
const app = express();
const port = config.port
const tasksRoutes = require('./routes/tasks/task')


mongoose.connect(config.dbConnect, () => {
    console.log('connected')
})

app.use(express.json());
app.use('/', tasksRoutes)

app.listen(port, () => {
    console.log('Start...')
})
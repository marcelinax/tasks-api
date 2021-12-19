const express = require('express');
const mongoose = require('mongoose')
const config = require('./config')
const app = express();
const port = config.port
const cors = require('cors')

app.use(cors())

mongoose.connect(config.dbConnect, () => {
    console.log('connected')
})

app.use(express.json());
app.use(require('./routes'));

app.listen(port, () => {
    console.log('Start...');
});
const Task = require("../../models/Task")
const uuid = require('uuid')
const getTasks = async (req,res,next) => {
   try {
       const tasks = await Task.find();
       res.json(tasks)
   } catch (error) {
       res.status(500).json({message: error.message})
   }
}

const getTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        console.log(req.params.id)
        res.json(task)
        if (!task) return res.status(404).json({ message: 'Cannot find task' })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createTask = async (req, res, next) => {
    const { title, content, start, end } = req.body
    const task = new Task({
            id: uuid.v4(),
            title,
            content,
            start,
            end
        })
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}



module.exports = {getTasks,getTask,createTask}
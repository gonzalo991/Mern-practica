const controller = {}
const Task = require('../models/task.model');

controller.tasks = async (req, res) => {
    const tasks = await Task.find();
    //console.log(tasks);
    res.json(tasks)
}

controller.oneTask = async (req, res) => {
    const oneTask = await Task.findById(req.params.id);
    res.json(oneTask);
}

controller.addTask = async (req, res) => {
    const { title, description } = req.body;
    const addTask = new Task({ title, description });
    await addTask.save();
    res.json({ status: 'Tarea guardada correctamente' })
}

controller.updateTask = async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: 'Tarea actualizada con éxito' });
}

controller.deleteTask = async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Tarea borrada' })
}

module.exports = controller;
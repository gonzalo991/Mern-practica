const router = require('express').Router();
const controller = require('../../controllers/tasks.controller');

//Metodo GET para acceder a una sola tarea por id
router.get('/:id', controller.oneTask);
//Metodo GET acceso a la ruta de todas las tareas
router.get('/', controller.tasks);
//Método POST para agregar tareas
router.post('/', controller.addTask);
//Metodo PUT para actualizar tareas
router.put('/:id', controller.updateTask);
//Metodo DELETE para borrar las tareas
router.delete('/:id', controller.deleteTask);

module.exports = router;
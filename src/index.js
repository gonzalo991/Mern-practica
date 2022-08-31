//Methods
const express = require('express')
const app = express();
const path = require('path');
const morgan = require('morgan');
const { mongoose } = require('../src/database/db.database')
//require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 3000;

//Settings


//Middleware
app.use(morgan('dev'));
app.use(express.json()); //Método que me permite acceder a datos en formato json

//Routes
app.use('/api/task',require('./routes/tasks.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public'))); //Dirección de la carpeta public

//Initializing server
app.listen(PORT, () => { console.log(`Servidor conectado exitosamente en http://localhost:${PORT}`) });
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const app = express();
const {mongoose} = require('./src/database/db.database');

//Settings
dotenv.config({ path: './.env' }); //Acceso al archivo .env
app.use(express.json()); //Acceso a datos en formato json

//Middleware
app.use(morgan('dev'));

//Routes
app.use('/api/tasks',require('./src/routes/tasks.routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));
//console.log(path.join(__dirname,'public'));


//Server upload
app.listen(PORT, () => console.log(`Servidor levantado correctamente en http://localhost:${PORT}`));
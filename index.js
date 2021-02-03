const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express

const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

//Directorio publico
//middleware es una funcion que se ejecuta en el momento en que alguien hace una peticion al servidor
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Escuchar Peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
} );
const express = require('express');
const app = express();
const rutasMain = require('./routes/main');

// Ruta estática ................................................. //
app.use(express.static('public'));

// Iniciar Servidor .............................................. //
app.listen(3000, () => {
    console.log("Servidor funcionando...");
});

// Rutas ......................................................... //
app.use('/', rutasMain);
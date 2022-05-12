const express = require('express');
const app = express();
const path = require('path');

let producto = {
    tipoProducto: null,
    precio: null,
    cantidad: null
}

app.get('/', (req, res) => {
    // Ejemplo 1 de contenido
    // res.send('¡Hola Mundo!');

    // Ejemplo 2 de contenido
    /*
    let contenido = 'Página Principal';
    res.send(contenido);
    */

    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(3000, () => {
    console.log('Servidor Corriendo...');
});
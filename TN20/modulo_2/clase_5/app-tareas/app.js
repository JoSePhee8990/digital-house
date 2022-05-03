const fs = require('fs');
const archivo = require('./funcionesDeTareas');

let accion = process.argv[2];
let arrayTareas = archivo.leerArchivo();

switch(accion) {
    case "listar":
        // Recorrido de Array con for ...
        for (let i = 0; i < arrayTareas.length; i++) {
            let texto = (i + 1) + ". " + arrayTareas[i].titulo + " - " + arrayTareas[i].estado;
            console.log(texto);
        }
        break;
    case undefined:
        console.log("Atención - Tienes que pasarme una acción \nLas acciones disponiblres son: listar");
        break;
    default:
        console.log("No entiendo que quieres hacer \nLas acciones disponibles son: listar");
}
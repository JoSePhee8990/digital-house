const fs = require('fs');
const archivo = require('./funcionesDeTareas');

let accion = process.argv[2];
let arrayTareas = archivo.leerArchivo();

switch (accion) {
    case "listar":
        // Realizar el recorrido con forEach() ...
        arrayTareas.forEach((valor, index) => {
            let texto = (index + 1) + ". " + valor.titulo + " - " + valor.estado;
            console.log(texto);
        });
        break;
    case undefined:
        console.log("Atención - Tienes que pasarme una acción \nLas acciones disponiblres son: listar");
        break;
    // Agregar un nuevo caso para crear un nuevo objeto ...
    case "crear":
        archivo.guardarTarea(process.argv[3], "pendiente");
        break;
    // Agregar un nuevo caso para filtrar ...
    case "filtrar":
        console.log("-------------------------------------")
        console.log("Lista de tareas en " + process.argv[3]);
        archivo.leerPorEstado(process.argv[3]).forEach((valor, index) => {
            console.log((index + 1) + ".- " + valor.titulo + " -> " + valor.estado);
        });
        break;
    default:
        console.log("No entiendo que quieres hacer \nLas acciones disponibles son: listar");
}

// console.log(process);
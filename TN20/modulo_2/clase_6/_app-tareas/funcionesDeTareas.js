const fs = require('fs');

let archivoTareas = {
  archivo: './data/tareas.json',
  leerJSON: function () {
    return fs.readFileSync(this.archivo, 'utf-8');
  },

  // Desafio 2.1 Escribir metodo, escribirJSON, para escribir archivo JSON
  // ----
  // 1. El metodo debe recibir un parametro, que será un array tareas
  // 2. Pasar array a String con JSON.stringify
  // 3. Utilizar fs.writeFileSync() y escribir sobre tareas.json
  
  // Desafio 2.2 Escribir metodo, guardarTarea, recibe un objeto tarea.
  // -- 
  // 1. usar leerJSON para obtener tareas actuales
  // 2. Hacer push de la nueva tarea al array actual
  // 3. Guardar array actualizado en tareas.json usando “escribirJSON”

  // Desafio 3 Filtrar tareas por estado, "leerPorEstado", que reciba un estado como parametro
  // Obtener todas las tareas con this.leerJSON
  // Usar .filter para obtener las tareas con estado ingresado
  // Retornar nuevo array con tareas ya filtradas.
}

module.exports = archivoTareas;
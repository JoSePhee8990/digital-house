

// console.log(tareasJSON)
// console.log('------------------');
// console.log(JSON.parse(tareasJSON))
// console.log('------------------');

let archivoTareas = require('./funcionesDeTareas')
let tareas = JSON.parse(archivoTareas.leerJSON())
let listarTareas = () => {
  let texto = ''
  for (let i = 0; i < tareas.length; i++) {
    texto = texto + (i+1) + ".- " + tareas[i].titulo + "\n";
  }
  return texto;
}

// 1. Refactorizar, cambiando for con forEach
// tener encuenta forEach recibe como segundo parametro el index.
let listarTareas2 = () => {
  for (let i = 0; i < tareas.length; i++) {
    let texto = (i+1) + ".- " + tareas[i].titulo;
    console.log(texto)
  }
}

let listarNoTerminadas = param => {
  for (let i = 0; i < param.length; i++) {
    const tarea = param[i];
    if(tarea.estado !== 'terminada') {
      let texto = (i+1) + ".- " + param[i].titulo;
      console.log(texto)
    }
  }
}
// Desafio 3.5a crear Funcion “filtrarPorEstado”
// Guardar estado, "pendiente", en una variable
// La varable estado se le pasa como parametro a la funcion leerPorEstado
// Guardar el array resultante de leerPorEstado en una variable
// mostrar en consola los elemtos del array con forEach

// console.log(listarTareas());
// console.log('-----');
// listarTareas2()
let accion = process.argv[2];

switch (accion) {
  case "listar":
    listarTareas2();
    break;
  case "pendiente":
    listarNoTerminadas(tareas);
    break;
  // Desafio 2.3. Crear nuevo case "crear"
  // $ node app.js crear "Nueva tarea"
  // process.argv[3] = "Nueva tarea"
  // Crear variable tipo objeto 
  // {
  //   "titulo": "Nueva tarea",
  //   "estado": "pendiente"
  // }
  // Usar el metodo guardarTarea  de archivoTareas

  // Desafio 3.5 Crear nuevo case "filtrar"
  // $ node app.js filtrar pendiente
  // llamar funcion “filtrarPorEstado” y pasar como parametor el estado
  case undefined:
    console.log("Atención - Tienes que pasar una acción.");
    break;
  default:
      console.log("No entiendo qué quieres hacer.");
    break;
}
const fs = require('fs');

let archivoTareas = {
    archivo: 'tareas.json',
    // Método para leer archivos JSON ...
    leerArchivo: function() {
        let tareas = fs.readFileSync(this.archivo, 'utf-8');
        tareas = JSON.parse(tareas);
        return tareas;
    },
    // Método para escribir el archivo JSON ...
    escribirJSON: function(arrJSON) {
        arrJSON = JSON.stringify(arrJSON);
        fs.writeFileSync(this.archivo, arrJSON);
    },
    // Método para guardar el archivo JSON ...
    guardarTarea: function(title, state) {
        let readJSON = this.leerArchivo();
        let newObject = { titulo: title, estado: state };
        readJSON.push(newObject);
        this.escribirJSON(readJSON);
    },
    // Método para filtrar por estados ...
    leerPorEstado: function(valState) {
        let readJSON = this.leerArchivo();
        let stateVal = readJSON.filter(function(valor) {
            return valor.estado == valState;
        });
        return stateVal;
    }
}

module.exports = archivoTareas;
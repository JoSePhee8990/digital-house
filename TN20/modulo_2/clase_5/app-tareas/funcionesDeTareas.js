const fs = require('fs');

let archivoTareas = {
    archivo: 'tareas.json',
    leerArchivo: function() {
        let tareas = fs.readFileSync(this.archivo, 'utf-8');
        tareas = JSON.parse(tareas);
        return tareas;
    }
}

module.exports = archivoTareas;
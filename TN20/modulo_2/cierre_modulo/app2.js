let autos = require('./autos')

let concesionaria = {
    autos: autos,
    buscarAuto: function (patente) {
        for (let i = 0; i < autos.length; i++) {
            if (this.autos[i].patente == patente) {
                return this.autos[i]
            } else {
                return null
            }
        }
    },
    venderAuto: function (patente) {
        let autoVendido = this.buscarAuto(patente)
        if (autoVendido != null) {
            let numeroDeIndex = this.autos.indexOf(autoVendido)
            this.autos[numeroDeIndex].vendido = true
        }
        /*
        console.log("----------------------------");
        console.log(this.autos);
        */
    },
    autosParaLaVenta: function () {
        let arrayDeAutos = this.autos.filter(function (auto) {
            return auto.vendido === false;
        });
        return arrayDeAutos
    },
    autosNuevos: function () {
        let arrayNuevos = this.autosParaLaVenta().filter(function (params) {
            return params.km < 100;
        })
        return arrayNuevos
    },
}

console.log(concesionaria.venderAuto("APL123"));
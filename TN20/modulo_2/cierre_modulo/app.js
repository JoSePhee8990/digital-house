let autos = require('./autos');

let concesionaria = {
    autos: autos,
    buscarAuto: function (patente) {
        let encontrado = null;
        this.autos.forEach(function (v, i) {
            if (v.patente == patente) {
                encontrado = v;
            }
        });
        return encontrado;
    },
    venderAuto: function (patente) {
        let auto = this.buscarAuto(patente);
        if (auto) {
            auto.vendido = true;
        }
    },
    autosParaLaVenta: function () {
        let autoVenta = this.autos.filter(function (auto) {
            return auto.vendido == false;
        });
        return autoVenta;
    },
    autosNuevos: function () {
        let autos0km = this.autosParaLaVenta().filter(function (auto) {
            return auto.km < 100;
        });
        return autos0km;
    },
    listaDeVentas: function () {
        let autoVendido = this.autos.filter(function (autoV) {
            return autoV.vendido == true;
        });
        let ventas = [];
        autoVendido.forEach(function (a, i) {
            ventas.push(a.precio);
        });
        return ventas;
    },
    totalDeVentas: function () {
        if (this.listaDeVentas().length > 0) {
            let total = this.listaDeVentas().reduce(function (acum, num) {
                return acum + num;
            });
            return total;
        } else {
            return 0;
        }
    },
    puedeComprar: function(auto, persona) {
      let sPuede = false;
      if (persona.capacidadDePagoTotal >= auto.precio) {
         let cuota = persona.capacidadDePagoEnCuotas * auto.cuotas;
         if (cuota >= auto.precio) {
            sPuede = true;
         }
      }
      return sPuede;
   },
   autosQuePuedeComprar: function (persona) {
      let autosVenta = this.autosParaLaVenta();
      let autos = [];
      for (let i = 0; i < autosVenta.length; i++) {
         let aprobado = this.puedeComprar(autosVenta[i], persona);
         if (aprobado === true) {
               autos.push(autosVenta[i]);
         }
      }
      return autos;
   }
}

console.log("Prueba");
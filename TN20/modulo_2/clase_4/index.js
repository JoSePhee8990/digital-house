let sumar = require('./modulos/sumar');
let restar = require('./modulos/restar');
let multiplicar = require('./modulos/multiplicar');
let dividir = require('./modulos/dividir');

console.log("La suma de dos números es: " + sumar(2, 2));
console.log("La resta de dos números es: " + restar(6, 4));
console.log("El multiplo de dos números es: " + multiplicar(2, 0));
console.log("La división de dos números es: " + dividir(0, 2));
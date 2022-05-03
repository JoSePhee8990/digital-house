let fs = require('fs');
// console.log(fs);

let datos = fs.readFileSync(__dirname + '/prueba.txt', 'utf-8');
//console.log(datos);

let heroes = require('./my_modules/super');

console.log(heroes);
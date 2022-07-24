/** PROMESAS ----------------------------------------------------- */
/**
	Las promesas son funciones que permiten ejecutar código asincrónico de forma eficiente.
*/
/**
	1.- Pedidos asincrónicos.
	Un pedido asincrónico es un conjunto de instrucciones que se ejecutan mediante un mecánismo específico, como por ejemplo un callback, una primesa o un evento. Esto hace posible que la respuesta sea procesada en otro momento.
	Como se puede inferir, su comportamiento es no bloqueante ya que el pedido se ejecuta en un paraleo con el resto del código.
*/
/**
	2.- .then()
	La función asincrónica devolverá un resultado, o no. Mientras tanto, el código se sigue ejecutando.
*/

// Ejemplo:
obtenerUsuarios()	// Función asincrónica
	.then(function(data){
		console.log(data);	// Ejecuta el console.log() SOLO SI obtenerUsuarios() devuelve un resultado. Este lo recibe .then() dentro de su callback, en este caso, en el parámetro data.
	});
console.log("Se sigue ejecutando!");	// Código que podría seguirse ejecutando mientras se ejecuta la promesa.

/**
	3.- Pedidos anidados.
	A veces los .then() suelen tener promesas dentro. Par resolver esto, necesitamos utilizar otro .then() que entre en ejecución una vez se resuelva el anterior.
*/

// Ejemplo:
obtenerUsuarios()
	.then(function(data){
		return filtrarDatos(data);
	})
	.then(function(dataFiltrada){
		console.log(dataFiltrada);
	});
	
// ¡ATENCIÓN! Es importante recordad que los .then() necesitan retornar la data procesada para que pueda ser usada por otro .then().

// .catch() ---------------------------------- //
// En caso de NO obtener un resultado, se genera un error. Para esto usamos .catch(), que encapsula cualquier error que pueda generarse a través de las promesas. Dentro de este método decidimos que hacer con el error. El mismo es recibido como parámetro dentro del callback del .catch().

// Ejemplo:
obtenerUsuarios()
	.then(function(data){
		console.log(data);
	})
	.catch(function(error){
		console.log(error);
	});
	
/**
	4.- Promise.all()
	A veces necesitamos que dos o más promoesas se resuelvan para realizar cierta acción. Para esto usamos Promise.all(). Este contendrá un array de promesas que, una vez se hayan resuelto, se ejecutará un .then() con los resultados de las mismas.
	Lo que primero debemos hacer es guardar en variables las promesas que necesitamos obtener.
*/

// Ejemplo:
let promesaPeliculas = obtenerPeliculas();	// Promesa de películas

let promesaGeneros = obtenerGeneros();	// Promesa de géneros

// El próximo paso es utilizar el método Promise.all() que contendrá un array con las promesas que guaradmos anteriormente.
Promise.all([promesaPeliculas, promesaGeneros]);	// Promesas a resolver

// El callback del .then() recibe un array con los resultados de las promesas cumplidas.
Promise.all([promesaPeliculas, promesaGeneros])
	.then(function([resultadoPeliculas, resultadoGeneros]){ // El .then() se ejecutará solo si ambas promesas se cumplieron
		console.log(resultadoPeliculas, resultadoGeneros);
	});
	
/** Sequelize y su configuración --------------------------------- */
// Sequelize es un ORM que nos ayuda a conectarnos e interactuar con bases de datos como Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server y más.

// Instalación ------------------------------- //
npm install sequelize-cli -g --save
npm install sequelize --save
npm install mysql2 --save

// Rutas y directorios ----------------------- //
// Una vez instalados los paquetes que necesitamos, debemos establecer las rutas y directorios. Para ello, debemos crear un archivo llamado .sequelizerc en la raíz del proyecto y, dentro de este, escribir lo siguiente:

const path = require('parth');

module.exports = {
	config: path.resolve('./database/config', 'config.js'),
	'modles-path': path.resolve('./database/models'),
	'seeders-path': path.resolve('./database/seeders'),
	'migrations-path': path.resolve('./database/migrations'),
}

// Iniciar Sequelize en el proyecto ---------- //
// Para que Sequelize cree todas las carpetas y archivos que necesitamos para comenzar a trabajar conél, debemos correr el siguiente comando:

Sequelize init

// Configuración ----------------------------- //
// Por último, debemos configurar la conexión con la base de datos. En las carpetas que creó Sequelize encontraremos el archivo config.js en la ruta /database/config/config.js. Dentro de este, encontraremos un JSON con credenciales por defecto que debemos reemplazar por las nuestras.

"development": {
	"username": "root",
	"password": "xxxx",
	"database": "movies_db",
	"host"	  : "127.0.0.1",
	"dialect" : "mysql",
	"operatorsAliases": false
}

module.exports = {
	"development": { ... }
}

// Objeto DB --------------------------------- //
// Como dato curioso, les contamos que al final del archivo index.js, ubicado en /database/models/index.js, encontramos la exportación del objeto DB.
// Este será al que llamaremos cada vez que queremos utilizar Sequelize para realizar consultas a nuestra base de datos.

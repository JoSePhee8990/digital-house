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

/** Modelos ------------------------------------------------------ */
// A la hora de hace runa consulta a la base de datos, un modelo va a retornar información en un formato útil y cómodo para luego operar con la misma.

// Creando un modelo ------------------------- //
// Siempre creamos un modelo para cada tabla de nuestra base de datos. La ruta donde los almacenamos es /database/models
// Los modelos son archivos JS, por lo tanto deben ser creados con esa extensión.
// Los nombres de los modelos deben estar escritos enUpperCamelCase y en singular

// Ejemplo:
Pelicula.js

// Un modelo es naturalmente una función que debemos definir y luego exportar con module.export. Esta función recibe dos parámetros. En primer lugar, el objeto sequelize para poder acceder a su método define() y, en segundo lugar, necesitamos traer el objeto DataTypes que nos dará la posibiliadd de decirle a nuestras columnas qué tipo de datos permitirán.

// Método .define() -------------------------- //
// El método define() nos permite definir asignacioens entre un modelo y una tabla. Este recibe 3 parámetros. El primero es un alias que identifica al modelo, el segundo es un objeto con la configuración de las columnas en la base de datos y el tercero es otro objeto con configuraciones adicionales (parámetro opcional). Lo que devuelve define() será almacenado en una variable con el nombre del modelo para luego ser retornada por la función que creamos.

// Ejemplo:
const Pelicula = sequelize.define(alias, cols, config);
return Pelicula;

// Alias ------------------------------------- //
// Como mencionamos, el primero es el alias que utiliza Sequelize para identificar al modelo. No es algo determinante. Solemos asignarle el mismo nombre del modelo como String.

// Ejemplo:
const Pelicula = sequelize.define("Pelicula", cols, config);
return Pelicula;

// Tipos de datos en Sequelize --------------- //
// Dentro de nuestro segundo parámetro que llamamos cols se encuentra un objeto que nos permite, en el segundo parámetro del define(), definir que tipos de datos deben recibir las columnas en la base de datos.

cols = {
	id: {
		type: DataTypes.INTEGER
	},
	name: {
		type: DataTypes.STRING
	},
	admin: {
		type: DataTypes.BOOLEAN
	}
}

// Ejemplos más utilizados
DataType.STRING			// VARCHAR(255)
DataType.STRING(400)	// VARCHAR(400)
DataType.INTEGER		// INTEGER
DataType.BIGINT			// BIGINT
DataType.FLOAT			// FLOAT
DataType.DOUBLE			// DOUBLE
DataType.DECIMAL		// DECIMAL
DataType.DATE			// DATE

// Timestamps -------------------------------- //
// Los timestamps no son obligatorios, pero la mayoría de las tablas suelen tenerlos y forman parte del estándar. Estos deben llamarse de la misma forma que se ve en el ejemplo.

createdAt: {
	type: DataTypes.DATE
},
updatedAt: {
	type: DataTypes.DATE
}

// Campos que guardan la fecha de creación y última edición

// Configuraciones adicionales --------------- //
// Dentro de nuestro tercer parámetro del define() podemos configurar cosas adicionales. Por ejemplo, si el nombre de nuestra tabla está en inglés y el de nuestro modelo en español, deberíamos aclararle al modelo que esto es así mediante un objeto literal, como en el ejemplo de la siguiente diapositiva.

module.exports = (sequelize, DataTypes)	=> {
	const Pelicula = sequelize.define("Pelicula", {
		// Configuraciones de las columnas.
	},
	{
		tableName: 'movies', // Si el nombre de la tabla no coincide con el del modelo
		timestamps: false, // Si no tengo timestamps
	});
	
	return Pelicula;
}

/** findAll, findOne, findByPk ----------------------------------- */


/** Manipulación de Daatos --------------------------------------------------------------------- */
// CREATE ------------------------------------ //
// Create es un método que nos permite agregar nuevos registros en nueestras tablas de la base de datos.
// Es un método que le pertenece a los modelos de nuestra base de datos. Por lo tanto, para acceder a él necesitamos llamar primero al modelo. Recibe un objeto literal donde definimos qué campos vamos a modificar y con que valores:

const db = require('../database/models');

db.Usuario.create({
	name: "Manuel",
	username: "manolito",
	password: "manolo123"
});

// UPDATE ------------------------------------ //
// Update es un método que nos permite editar registros en nuestras tablas de la base de datos.
// Es un método que le pertenece a los modelos de nuestra base de datos. Por lo tanto, para acceder a él necesitamos llamar primero al modelo.

const db = require('../database/models');

db.Usuario.update();

// Update recibe dos parámetros. Ambos son objetos literales. En el primero debemos indicarle que campo de la tabla queremos modificar y que valor asignar.
// El segundoi objeto debe tener como mínimo un where que indique de manera única a que registro aplicar los cambios. En caso de no hacerlo, se modificarán todos los cambios de la base de datos.

// Ejemplo:
const db = require('../database/models');

db.Usuario.update({
	username: 'ManuelF'
},{
	where: { id: 10 }
});

// DESTROY ----------------------------------- //
// Destroy es un método que nos permite eliminar registros en nuestras tablas de la base de datos.
// Es un método que le pertenece a los modelos de nuestra base de datos. Por lo tanto, para aceder a él necesitamos llamar primero al modelo.

const db = require('../database/models');

db.Usuario.destroy({
	where: { id:10 }
});


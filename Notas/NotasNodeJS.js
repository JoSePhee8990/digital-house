/**
	Métodos GET -------------------------------------------------------------------------------- ||
*/

// Enrutador
router.get("/peliculas", (req, res) => { res.render('peliculas') });

// Enrutador con controlador
const controller = {
	todas: (req, res) => { res.render('peliculas') }
};
router.get("/peliculas", controller.todas);

// Sobre la ejecución de Express
app.get("/peliculas", (req, res) => { res.render('peliculas'); });

/** Query String --------------------------------------- */
// https://www.youtube.com/watch?video=dQw4w9WgXcQ&time=30
console.log(req.query.video);
// 'dQw4w9WgXcQ'

// URL  "/celulares?max=20000"
router.get("/celulares", (req, res) => {
    let max = req.query.max;
    let celulares = [];
    celulares.forEach(function(i, celular) {
        if (celular.precio <= max) {
            celulares.push(celular);
        }
    });
    res.send(celulares);
});

/** 
	Método POST -------------------------------------------------------------------------------- ||
*/
// Ruta que envía a un formulario a la vista -> GET
router.get("/pelicula/crear", (req, res) => { res.render('crear')});

// Ruta que procesa la información del formulario -> POST
router.post("/pelicula/crear", (req, res) => {...});

// express-generator en app.js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// req.body, Ejemplo
<form method="POST" action="/pelicula/crear">
	Titulo : <input type="text" name="titulo" value="Batman">
</form>
// ...
router.post("/pelicula/crear", (req, res) => {
	console.log(req.body) // { titulo: Batman }
});

// res.redirect()
router.post("/pelicula/crear", (req, res) => {
	// Procesamos la información enviada por el usuario
	// Si todo sale bien, lo redirigimos al listado de películas.
	res.redirect('/peliculas');
});

/**
	Método PUT --------------------------------------------------------------------------------- ||
*/
// Ruta que envía un formulario de edición a la vista -> GET
router.get("/pelicula/:id/editar", (req, res) => { res.render('editar'); });

// Ruta que procesa la información del formulario -> PUT
router.put("/pelicula/:id/editar", (req, res) => {...});

/**
	Método DELETE ------------------------------------------------------------------------------ ||
*/
// Ruta que procesa la información del formulario -> DELETE
router.delete('/pelicula/:id/eliminar', (req, res) => {...});

// Callback
router.post('/pelicula/:id/eliminar', (req, res) => {
	// Eliminamos la película solicitada
	// Si todo sale bien, redirigimos al listado de películas
	res.redirect('/peliculas');
});

// Habilitar métodos HTTP (PUT y DELETE), instalando method-override.
npm install method-override --save

// Configurar aplicación
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Configurar el formulario, agregarle un query string al action.
?_method=PUT
?_method=DELETE

<form method="POST" action="/pelicula/:id/editar?_method=PUT">
	...
</form>

/**
	ERROR 404 ---------------------------------------------------------------------------------- ||
*/
app.use((req, res, next) => {
	res.status(404).render('not-found');
});

/**
	Path y FS ---------------------------------------------------------------------------------- ||
*/
// .readFileSync()
const fs = require('fs');
let sistcoms = fs.readFileSync('sitcoms.txt', 'utf-8');

// JSON.parse()
let users = fs.readFileSync('users.json', 'utf-8');
let usersJson = JSON.parse(users);

// .writeFileSync()
const fs = require('fs');
fs.writeFileSync('estrenos-2020.text', 'Titanic 2');

// JSON.stringify()
const fs = require('fs');
let pelicula = {
	titulo: 'Titanic',
	minutos: 560
};
let peliculaJson = JSON.stringify(pelicula);
fs.writeFileSync('titanic.json', peliculaJson);

fs.writeFile('test.json', JSON.stringify({ a:1, b:2, c:3 }, null, 4));
/* test.json:
{
     "a": 1,
     "b": 2,
     "c": 3,
}
*/

// .appendFileSync()
const fs = require('fs');
fs.appendFileSync('estrenos-2021.txt', 'Titanic 3');

/**
	Multer ------------------------------------------------------------------------------------- ||
*/
// en HTML
<form action="upload" method="POST" enctype="multipart/form-data">

// en el BackEnd JS
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '/uploads')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
		// cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});

var upload = multer({ storange: storange });

// Configurando la ruta
var upload = multer({ storage: storage });
app.post('/register', upload.single('avatarFile'), (req, res) => {
	console.log(req.file); // Nos devuelve un objeto con la información del archivo
	res.send('Archivo subido correctamente');
});

// un archivo
upload.single('nombre') // donde nombre debe coincidir con el atributo name del input del formulario
// multiple archivos
upload.array('nombre') // donde nombre debe coincidir con el atributo name del input del formulario, y agregado la propiedad multiple
<input type="file" name="avatarFiles" id="file" multiple>

var upload = multer({ storage: storage });
app.post('/register', upload.array('avatarFiles'), (req, res, next) => {
	console.log(req.file); // Nos devuelve un objeto con la información del archivo
	res.send('Archivo subido correctamente');
});

// Ejemplo
const express = require('express');
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '/uploads')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

const upload = multer({ storage: storage });

router.post('/register', upload.any(), usersController.save);

/**
	Validación de archivos con Multer ---------------------------------------------------------- ||
*/
// Manejando Errores
const multer = require('multer');
const upload = multer().single('avatarFile');

app.post(req, res, (err) => {
	if (err) {
		res.status(400).send('Algo salió mal!');
	}
	res.send(req.file);
});

// Validar la carga del archivo
let upload = multer({storage: storage});
app.post('/register', upload.single('avatarFile'), (req, res, next) => {
	const file = req.file;
	if (!file) {
		const error = new Error('Por favor seleccione un archivo');
		error.httpStatusCode = 400;
		return next(error);
	}
	res.send(file);
});

/**
	GIT ---------------------------------------------------------------------------------------- ||
*/
// Borrar rama en repositorio
git push origin --delete <nombre_rama>

// Borar rama en local
git branch -D <nombre_rama>

/**
	Middlewares -------------------------------------------------------------------------------- ||
*/
// next()
app.use(function(req, res, next) {
	...
	next();
}

// configuración de carpeta de archivos estáticos
app.use(express.static(__dirname + '/public'));

// configuración de ruteo
const rutasProductos = require('./routes/products');
app.use('/', rutasProductos);

// imprementación del error 404
app.use((req, res, next) => {
	res.status(404).render('404-page');
	next();
});

// implementación de middlewares en rutas
function rutaDeUsuario(req, res, next) {
	// verificamos si el usuario est{a logueado
	// si no está logueado, podemos enviarlo al login
	// si está logueado, ejecutamos next() para seguir con la ejecución
}

// como se configura
const userRoute = require('../middleware/userRoute');
router.get('/usuario/perfil', userRoute, usersCOntroller.profile);

/**
	Express Validator -------------------------------------------------------------------------- ||
*/

1.- Instalar Express Validator.
2.- Crear un array con las validaciones de cada formulario.
3.- Agregarlo como middleware de la ruta que procesa el formulario.
4.- Verificar si hubo errores en la validación desde el controlador.
5.- Enviar los errores a las vistas.

1.- npm i express-validator
	(a la hora de escribir validacioens, tomaremos como referencia la propiedad "name" de cada campo)
2.- Se hace directamente sobre el archivo de rutas o se crean las validaciones en una archivo aparte
	const { check } = require('express-validator');
	let validateRegister = []; // Validaciones aquí

// Método check()
El método check() nos permite agregar validaciones para cualquiera de los campos del formulario. Como parámetro recibe el nombre del campo a validar. Si por ejemplo queremos validad el campo name, el método querdaría así:

- const validateRegister = [ check('name') ]

Suponiendo que se quiera validad que el campo no esté vacío, sobre el método anterior, se ejecuta el método
notEmpty() de la siguiente manera:

- const validateRegister = [
	check('name').notEmpty()
]

// Tipos de validaciones
check('campo')
	.notEmpty() // Verifica que el campo no esté vacío
	.isLength({ min: 5, max: 10}) // Verifica la longitud de los datos
	.isEmail() // Verifica que sea un email válido
	.isInt() // Verifica que sea un número entero
	
// Mensajes de error
check('name')
	.notEmpty().withMessage('Debes completar el nombre')
	.isLength({ min: 5 }).withMessage('El nomrbe debe tener al menos 5 caracteres')
	
// Cortando la cadena de validación
check('email')
	.notEmpty().withMessage('Debes completar el email').bail()
	// En caso de que la primera validación falle,
	// las siguientes no se ejecutan para ese campo.
	.isEmail().withMessage('Debes completar un email válido')
	
// Array de validaciones completo
const validateRegister = [
	check('name')
		.notEmpty().withMessage('Debes completar el nombre').bail()
		.isLength({ min: 5 }).withMessage('El nombre debe ser más largo'),
	check('email')
		.notEmpty().withMessage('Debes completar el email').bail()
		.isEmail().withMessage('Debes completar un email válido'),
	check('password')
		.notEmpty().withMessage('Debes completar la contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe ser más larga')
]

// Agregando las validaciones en las rutas
const validateRegister = [ ... ];

// Procesamiento del formulario de creación
router.post('/', validateRegister, userController.processRegister);

// validaciones en el controlador
const { validationResult } = require('express-validator')

let error = validationResult(req);

// El método isEmpty() || Nos permite saber si hay errores de validación o no.
register: (req, res) => {
	let errors = validationResult(req);
	
	if (error.isEmpty()) {
		// No hay errores, seguimos adelante
	} else {
		// Si hay errores, volvemos al formulario con los mensajes
	}
}

// El método mapped() || Nos permite enviar los errores a la vista como un objeto.
if (errors.isEmpty()) {
	// No hay errores, seguimos adelante
} else {
	// Hay errores, volvemos al formulario con los mensajes
	res.render('register', { errors: errors.mapped(), old: req.body });
}

// Objeto de errores
{
	email: {
		msg: 'Debes completar un email válido',
		param: 'email',
		value: 'unEmail',
		location: 'body'
	},
	password: {
		msg: 'La contraseña debe ser más larga',
		param: 'password',
		value: '1234',
		location: 'body'
	}
}

// Mostrar los errores en la vista
<label for="email">Correo electrónico:</label>
<input type="email" name="email" id="email">
<% if (locals.errors && errors.name) { %>
	<p class="feedback"><%= errors.name %>
<% } %>

// Agregando datos anteriores al formulario
<label for="email">Correo electrónico:</label>
<input type="email" name="email" id="email" value="<%= locals.old && old.email %>">

/**
	Session ------------------------------------------------------------------------------------ ||
*/

// Instalando el módulo express-session
npm i express-session

// Lo requerimos en el entry point de la aplicación
const session = require('express-session')

// La configuración como middleware a nivel aplicación. Ejecutamos session() pasándole como argumento un objeto literal con la propiedad secret con un texto único aleatorio, que servirá para identificar nuestro sitio web.
app.use(session({secret: "Nuestro mensaje secreto"}));

// Manipualndo los datos de session, al momento de querer definir y almacenar información, llamamos a la propiedad session del objeto request:
req.session.colorFond = 'violeta';

// Para leer información de session
let colorFondo = req.session.colorFondo;

/**
	Cookies ------------------------------------------------------------------------------------ ||
*/

// Implementando cookies
npm i cookie-parser

// Para crear una cookie y guardar informaci{on en ella, ejecutamos el método cookie() sobe el objeto response, pasándole dos argumentos:
// - El nombre que le queremos asignar a esa cookie
// - El valor que tendrá
res.cookie('club', 'C. A. Tigre');

// Leyendo una Cookie: para leer información de una cookie usando el bojeto request, llamando al objeto cookies, seguido del nombre de la cookie que definimos anteriormente:
console.log(req.cookies.club);

/**
	Hash --------------------------------------------------------------------------------------- ||
*/

// Implementando el paquete bcryptjs
npm i bcryptjs

// .hashSync()
const bcrypt = require('bcryptjs');
let passEncriptada = bcrypt.hashSync('monito123', 10);

// .compareSync()
let check = bcrypt.compareSync('monito123', passEncriptada);
console.log(check);
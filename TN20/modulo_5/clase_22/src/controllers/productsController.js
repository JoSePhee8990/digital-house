const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products', { products });
		/*
		res.render('products', { 
			productos: products
		});
		*/
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let id = req.params.id;
		let producto = products[id - 1];
		/*
		let producto = products.filter(function(elemento) {
			// console.log(elemento.id);
			return elemento.id == id;
		});
		console.log("Mi id = " + id);
		console.log("|---------------------------|");
		console.log(producto);
		*/
		res.render('detail', { producto });
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		console.log(req.body);
		let objeto = req.body;
		let objectNew = {
			id: 17,
			name: objeto.name,
			price: objeto.price,
			discount: objeto.discount,
			category: objeto.category,
			image: "img-cafetera-moulinex.jpg"
		}
		products.push(objectNew);
		let arrJSON = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, arrJSON);

		res.send('Operacion realizada con exito');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let id = req.params.id;
		let productToEdit = products[id - 1];
		res.render('product-edit-form', { productToEdit })
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;
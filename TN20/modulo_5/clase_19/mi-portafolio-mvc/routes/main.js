const express = require('express');
const router = express.Router();
const rutasControlador = require('../controllers/mainController');

router.get('/', rutasControlador.home);
router.get('/about', rutasControlador.about);

module.exports = router;
var express = require('express');
var router = express.Router();
const loginController= require("../controllers/loginController");
const permisoController= require("../controllers/permisosController");

/* GET home page. */
//navegamos dentro de la pagina index en la raiz
router.get('/', loginController.islogged, permisoController.home);
router.get('/juegos',  loginController.islogged, permisoController.juegos);
router.get('/fotos',  loginController.islogged, permisoController.fotos);
router.get('/juegos_mesa',  loginController.islogged, permisoController.juegosdemesa);

module.exports = router;
var express = require('express');
var router = express.Router();
//recibe metodos del controlador
const loginController= require("../controllers/loginController");
const permisoController= require("../controllers/permisosController");

/* GET home page. */

router.get('/', loginController.islogged, permisoController.afterlogin);
router.get("/logout",loginController.logout);
router.post('/index/true',loginController.verifyuser);

module.exports = router;
//<%= title %>

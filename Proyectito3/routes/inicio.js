var express = require('express');
var router = express.Router();
const loginController= require("../controllers/loginController");


/* GET home page. */
//navegamos dentro de la pagina index en la raiz
router.get('/',  loginController.islogged, loginController.inicio)
//muestra los datos en la vista edit mediante el id recibido

router.get("/fotos",loginController.islogged,loginController.fotos);
module.exports = router;
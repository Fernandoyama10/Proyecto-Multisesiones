var express = require('express');
var router = express.Router();
//recibe metodos del controlador
const loginController= require("../controllers/loginController");


/* GET home page. */
router.get('/',loginController.islogged,loginController.login);


router.get("/logout",loginController.logout);
router.post('/aunthentic',loginController.verifyuser);
module.exports = router;
//<%= title %>

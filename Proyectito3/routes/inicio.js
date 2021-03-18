var express = require('express');
var router = express.Router();
const loginController= require("../controllers/loginController");


/* GET home page. */
//navegamos dentro de la pagina index en la raiz
router.get('/', loginController.inicio, loginController.islogged);

router.get('/fotos',  loginController.islogged, function(req, res, next) {

    if(!req.user) {
       res.redirect('/');
    } else if (req.user) {
        const structure = req.role;
        if(structure[2].status  == "false"){
            res.send('NO PERMISO');
        }else{
            res.render('inicio/fotos', { title: 'Login', user: req.user, roles:req.role });
        }
      
    }

});
router.get("/juegos",loginController.juegos);

router.get("/juegos_mesa",loginController.juegos_mesa);

module.exports = router;
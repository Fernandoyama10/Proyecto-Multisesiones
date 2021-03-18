var express = require('express');
var router = express.Router();
const loginController= require("../controllers/loginController");


/* GET home page. */
//navegamos dentro de la pagina index en la raiz
router.get('/', loginController.inicio, loginController.islogged);



router.get('/juegos',  loginController.islogged, function(req, res, next) {

    if(!req.user) {
       res.redirect('/');
    } else if (req.user) {
        const structure = req.role;
        if(structure[1].status  == "false"){
            res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
        }else{
            res.render('inicio/juegos', { title: 'Login', user: req.user, roles:req.role });
        }
      
    }

});

router.get('/fotos',  loginController.islogged, function(req, res, next) {

    if(!req.user) {
       res.redirect('/');
    } else if (req.user) {
        const structure = req.role;
        if(structure[2].status  == "false"){
            res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
        }else{
            res.render('inicio/fotos', { title: 'Login', user: req.user, roles:req.role });
        }
      
    }

});

router.get('/juegos_mesa',  loginController.islogged, function(req, res, next) {

    if(!req.user) {
       res.redirect('/');
    } else if (req.user) {
        const structure = req.role;
        if(structure[3].status  == "false"){
            res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
        }else{
            res.render('inicio/juegos_mesa', { title: 'Login', user: req.user, roles:req.role });
        }
      
    }

});

module.exports = router;
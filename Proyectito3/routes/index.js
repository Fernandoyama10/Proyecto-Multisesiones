var express = require('express');
var router = express.Router();
//recibe metodos del controlador
const loginController= require("../controllers/loginController");


/* GET home page. */

router.get('/', loginController.islogged, function(req, res, next) {

    if(!req.user) {
        res.render('index');
    } else if (req.user) {
        const structure = req.role;
        if(structure[0].status  == "false"){
            res.send('NO PERMISO');
        }else{
            res.render('inicio/index', { title: 'Login', user: req.user, roles:req.role });
        }
    }
    });
  
router.get("/logout",loginController.logout);
router.post('/index/true',loginController.verifyuser);

module.exports = router;
//<%= title %>

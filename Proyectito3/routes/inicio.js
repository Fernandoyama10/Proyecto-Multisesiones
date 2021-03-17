var express = require('express');
var router = express.Router();



/* GET home page. */
//navegamos dentro de la pagina index en la raiz
router.get('/',function (req,res,next){
  res.render('inicio/index',{title:'INICIO INCIIOOO'});
});

module.exports = router;
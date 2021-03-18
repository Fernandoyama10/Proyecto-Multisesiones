//conexion a la base de datos
var conexion = require('../config/conexion');
//obtener los metodos de sql del modelo usuario
var usuario= require('../model/usuario');

var permiso= require('../model/permisos');
//libreria filesystem que permite borrar la imagen
var borrar= require("fs");
//generar tokens
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports={
    logininicio: function (req,res,next){
        if(!req.user) {
          res.render('index');
      } else if (req.user) {
          const structure = req.role;
          if (structure.length > 0)
          {
              if(structure[0].status  == "false"){
                  res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
              }else{
                  res.render('inicio/index', { title: 'Login', user: req.user, roles:req.role });
              }
          }
          else{
              res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
          }
        
      }
      }
}
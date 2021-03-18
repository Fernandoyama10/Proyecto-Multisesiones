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
    afterlogin: function (req,res,next){
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
      },
      home:function (req,res,next) {
        if(!req.user) {
          res.redirect('/');
        } else if (req.user) {
          const structure = req.role;
          if (structure.length > 0)
          {
            if(structure[0].status  == "false"){
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
              }else{
                res.render('inicio/index', { title: 'Login', user: req.user, roles: req.role });
              }
          }
          else
          {
            res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
          }
        }
  
      },
      juegos:function (req,res,next) {
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             const structure = req.role;
             if (structure.length > 0)
             {
                if(structure[1].status  == "false"){
                    res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
                }else{
                    res.render('inicio/juegos', { title: 'Login', user: req.user, roles:req.role });
                }
             }
             else
             {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
             }
         }
      },
      fotos:function (req,res,next) {
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             const structure = req.role;
             if (structure.length > 0)
             {
                if(structure[2].status  == "false"){
                    res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
                }else{
                    res.render('inicio/fotos', { title: 'Login', user: req.user, roles:req.role });
                }
             }
             else
             {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
             }
         }
      },
      juegosdemesa:function (req,res,next) {
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             const structure = req.role;

             if (structure.length > 0)
             {
                if(structure[3].status  == "false"){
                    res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
                }else{
                    res.render('inicio/juegos_mesa', { title: 'Login', user: req.user, roles:req.role });
                }
             }
             else
             {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
             }
         }
     
      },
      adminlogin:function (req,res,next) {
        usuario.getdata(conexion, async function (err,datos) {
     
        if(!req.user) {
          res.render('dashboard/login');
        } else if (req.user) {
          const structure = req.role;
          if (structure.length > 0)
          {
            if(structure[5].status  == "false"){
                res.render('dashboard/authuser', { title: 'Login', message: 'Estas logueado sin permisos de Administrador, usa otra cuenta o regresa a Inicio.', user: req.user, roles:req.role });
              }else{
                res.render('dashboard/index', { title: 'Login', user: req.user, roles: req.role, usuarios:datos });
              }
          }
          else
          {
            res.render('dashboard/login', { title: 'Login', user: req.user, roles:req.role });
          }
        }
    });
      },
      ilustraciones:function (req,res,next) {
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             const structure = req.role;

             if (structure.length > 0)
             {
                if(structure[4].status  == "false"){
                    res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
                }else{
                    res.render('inicio/ilustraciones', { title: 'Login', user: req.user, roles:req.role });
                }
             }
             else
             {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:req.role });
             }
         }

      }
}
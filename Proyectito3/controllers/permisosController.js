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
              const namepage = "sec_inicio";
        const datosuser = req.user;
        if(!req.user) {
          res.render('index');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                     res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
                 }else{
                  res.render('inicio/index', { title: 'Login', user: req.user, roles:permisos });
                 }
              }
              else
              {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
              }
             });
         }
      },
      home:function (req,res,next) {

        const namepage = "sec_inicio";
        const datosuser = req.user;
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                     res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
                 }else{
                  res.render('inicio/index', { title: 'Login', user: req.user, roles: permisos });
                 }
              }
              else
              {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
              }
             });
         }
      },
      juegos:function (req,res,next) {

        const namepage = "sec_juegos";
        const datosuser = req.user;
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                     res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
                 }else{
                  res.render('inicio/juegos', { title: 'Login', user: req.user, roles:permisos });
                 }
              }
              else
              {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
              }
             });
         }
      },
      fotos:function (req,res,next) {
        const namepage = "sec_fotos";
        const datosuser = req.user;
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                     res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
                 }else{
                     res.render('inicio/fotos', { title: 'Login', user: req.user, roles:permisos });
                 }
              }
              else
              {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
              }
             });
         }
      },
      juegosdemesa:function (req,res,next) {

        const namepage = "sec_juegosmesa";
        const datosuser = req.user;
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                     res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
                 }else{
                  res.render('inicio/juegos_mesa', { title: 'Login', user: req.user, roles:permisos });
                 }
              }
              else
              {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
              }
             });
         }
      },
      adminlogin:function (req,res,next) {
        usuario.getdata(conexion, async function (err,datos) {
        const namepage = "sec_dashboard";
        const datosuser = req.user;
        if(!req.user) {
          res.render('dashboard/login');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                  res.render('dashboard/authuser', { title: 'Login', message: 'Estas logueado sin permisos de Administrador, usa otra cuenta o regresa a Inicio.', user: req.user, roles:permisos });
                 }else{
                  res.render('dashboard/index', { title: 'Login', user: req.user, roles: permisos, usuarios:datos });
                 }
              }
              else
              {
                res.render('dashboard/authuser', { title: 'Login', message: 'Estas logueado sin permisos de Administrador, usa otra cuenta o regresa a Inicio.', user: req.user, roles:permisos });
              }
             });
         }
        });
      },
      ilustraciones:function (req,res,next) {

        const namepage = "sec_ilustraciones";
        const datosuser = req.user;
        if(!req.user) {
            res.redirect('/');
         } else if (req.user) {
             permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
              const permisoss = permisos;
              if (permisoss.length > 0)
              {
                 if(permisoss[0].status  == "false"){
                     res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
                 }else{
                  res.render('inicio/ilustraciones', { title: 'Login', user: req.user, roles:permisos });
                 }
              }
              else
              {
                res.render('inicio/denegado', { title: 'Login', user: req.user, roles:permisos });
              }
             });
         }


        }
}
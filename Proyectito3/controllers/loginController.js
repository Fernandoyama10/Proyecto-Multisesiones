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
    inicio:function (req,res) {
      res.render('inicio/index');
    },
    login: function (req,res,next) {
        res.render('index');
      },
      islogged: async function (req,res,next) {
        if( req.cookies.jwt) {
          try {
            //1) verify the token
            const id = await promisify(jwt.verify)(req.cookies.jwt,
            process.env.JWT_SECRET
            );
            usuario.returnPerId(conexion,id.id, function(err,user){
                req.user = user[0];
                permiso.getRoles(conexion,id.id, function(err,roles){
                    if (user.length > 0) {
                        req.roles = roles[0];
                      res.render('inicio/index', {roles:req.roles, user:req.user});
                    }
                    else{
                      res.render('index');
                    }
                });
          
            });
          } catch (error) {
            console.log(error);
      
          }
        } else {
            res.render('index');
       
        }
      
      
      },
      logout:function (req,res) {
        res.cookie('jwt', 'logout', {
          expires: new Date(Date.now() + 2*1000),
          httpOnly: true
        });
        res.render('index');
      },
      verifyuser: function (req,res) {


        try {
        /////TRY CATCH
        /////TRY CATCH  
        
      //retorna datos del user de acuerdo a si existe el email
      usuario.verifyUser(conexion,req.body.email, function(err,registros) {
        console.log(err);
        console.log(registros[0]);
    
        if (registros.length > 0) {
          const user = registros[0];
          if(user.password == req.body.password){
    
            const id = registros[0].id_user;
        
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN
            });
    
            console.log("The token is: " + token);
    
            const cookieOptions = {
              expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true
            }
    
            res.cookie('jwt', token, cookieOptions );

            usuario.returnPerId(conexion,id, function(err,user){
              req.user = user[0];
              permiso.getRoles(conexion,id, function(err,roles){
                  if (user.length > 0) {
                      req.roles = roles[0];
                    res.render('inicio/index', {roles:req.roles, user:req.user});
                  }
                  else{
                    res.render('index');
                  }
              });
        
          });
              console.log("BIENVENIDO");
          } else{
            console.log("CONTRASEÑA INCORRECTA");
          }
      } else{
        console.log("NO EXISTE USER");
      }
    
    
      });
          ////TRYCATCH
          ////TRYCATCH
        } catch (error) {
          console.log(error);
        }
    },
    fotos:function (req,res) {

   res.render('inicio/fotos', {roles:req.roles, user:req.user});

      },

      juegos:function (req,res) {

        res.render('inicio/juegos', {roles:req.roles, user:req.user});
     
           },

           juegos_mesa:function (req,res) {

            res.render('inicio/juegos_mesa', {roles:req.roles, user:req.user});
         
               }




}
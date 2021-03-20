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
            usuario.returnPerId(conexion,id.id, function(err,resultado){
           
           if(resultado.length >0){
            if(!resultado) {
              return next();
            }

            req.user = resultado[0];

            console.log("User is")
            console.log(req.user);
   
            return next();
         
        

           }else{
            return res.render('index', {
              messagelogin: 'ERROR: El usuario no tiene permisos registrados.'
          });
           }
     

               
            

          
            });
          } catch (error) {
            console.log(error);
            return next();
          }
        } else {
          next();
        }
      },
      logout:function (req,res) {
        res.cookie('jwt', 'logout', {
          expires: new Date(Date.now() + 2*1000),
          httpOnly: true
        });
        res.render('index');
      },
      logoutadmin:function (req,res) {
        res.cookie('jwt', 'logout', {
          expires: new Date(Date.now() + 2*1000),
          httpOnly: true
        });
        res.render('dashboard/login');
      },
      verifyuser: function (req,res) {
        try {

          if( !req.body.email || !req.body.password ){
            return res.status(400).render('index', {
              message : 'Por favor proporciona una contraseña o correo.'
            })
          }
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
            res.status(200).redirect("/");
              console.log("BIENVENIDO");
          } else{
            return res.render('index', {
              message: 'Contraseña invalida.'
          });
          }
      } else{
        return res.render('index', {
          message: 'El usuario no existe.'
      });
      }
    
    
      });
          ////TRYCATCH
          ////TRYCATCH
        } catch (error) {
          console.log(error);
        }
    },
    verifyadmin: function (req,res) {
      try {

        if( !req.body.email || !req.body.password ){
          return res.status(400).render('dashboard/login', {
            message : 'Por favor proporciona una contraseña o correo.'
          })
        }
      /////TRY CATCH
      /////TRY CATCH  
    //retorna datos del user de acuerdo a si existe el email
    usuario.verifyAdmin(conexion,req.body.email, function(err,registros) {
      console.log(err);
      console.log(registros[0]);
  
      if (registros.length > 0) {

        if(registros[0].status == "false"){
          return res.render('dashboard/login', {
            message: 'Acceso denegado.'
        });
        }else{
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
            res.status(200).redirect("/dashboard");
              console.log("BIENVENIDO");
          } else{
            return res.render('dashboard/login', {
              message: 'Contraseña invalida.'
          });
          }
        }

  
    } else{
      return res.render('dashboard/login', {
        message: 'El usuario no existe.'
    });
    }
  
  
    });
        ////TRYCATCH
        ////TRYCATCH
      } catch (error) {
        console.log(error);
      }
  }




}
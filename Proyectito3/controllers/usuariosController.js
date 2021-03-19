//conexion a la base de datos
var conexion = require('../config/conexion');

//obtener los metodos de sql del modelo usuario
var usuario= require('../model/usuario');
var permiso= require('../model/permisos');
//libreria filesystem que permite borrar la imagen
var borrar= require("fs");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
module.exports={

    //obtener datos en el index de /users para mandar los datos a la vista users
index: function(req,res,next){

usuario.getdata(conexion, async function (err,datos) {

  if(!req.user) {
    res.redirect('/');
  } else if (req.user) {
    res.render('dashboard/index', { title: 'Usuarios', usuarios:datos });
  }



  
});


},

//crear ruta para formulario crear usuario
newuser:function (req,res) {


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
            res.render('dashboard/newuser', { title: 'Crear Usuario', user: req.user, roles: permisos });
           }
        }
        else
        {
          res.render('dashboard/authuser', { title: 'Login', message: 'Estas logueado sin permisos de Administrador, usa otra cuenta o regresa a Inicio.', user: req.user, roles:permisos });
        }
       });
   }  
},


//funcion para guardar usuario en la base de datos y guardar imagen
save:function (req,res) {
  console.log("LOS DATOS SON REQ BODY");
  console.log(req.body);
  console.log(req.file.filename);
  // req.body son los datos recibidos por el formulario y req.file es el archivo imagen
usuario.insert(conexion,req.body,req.file,function (err,datos) {
   res.redirect('/dashboard');
});
},

//funcion que borra el usuario y la imagen correspondiente
delete:function (req,res){
  console.log("Recepción de datos");
  console.log(req.params.id);
  //retorna el nombre de la imagen para poder localizarla y borrarla
  usuario.returnPerId(conexion,req.params.id, function(err,registros){
    var nombreImagen="public/images/"+(registros[0].image);
   
  //condicional para verificar si existe la imagen en la carpeta public/images, si es asi lo borra
    if(borrar.existsSync(nombreImagen)){
      borrar.unlinkSync(nombreImagen);
    }
    //funcion que permite borrar por el id del usuario (se obtiene por req.params.id) 
    usuario.deletePerId(conexion,req.params.id,function(err) {
      res.redirect('/dashboard');
     /**  return res.render('dashboard', {
        message: 'Se elimino correctamente.'
    });*/
    });
   

  });
},
//funcion para recibir los datos del usuario mediante su id para llenarlos en el formulario de actualizar datos usuario
edit:function (req,res){
  usuario.returnPerId(conexion,req.params.id, function(err,registros){
  const namepage = "sec_dashboard";
  const datosuser = req.user;
  if(!req.user) {
    res.render('/');
   } else if (req.user) {
       permiso.getModulesPerName(conexion,datosuser.id_user,namepage, function(err,permisos){
        const permisoss = permisos;
        if (permisoss.length > 0)
        {
           if(permisoss[0].status  == "false"){
            res.render('dashboard/authuser', { title: 'Login', message: 'Estas logueado sin permisos de Administrador, usa otra cuenta o regresa a Inicio.', user: req.user, roles:permisos });
           }else{
            res.render('dashboard/edit', { title: 'Editar', user: req.user, roles: permisos, user2:registros[0] });
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

//actualiza datos del usuario y la imagen la reemplazada en dado caso que meta una nueva el administrador
update:function (req,res) {
  console.log(req.body.name);

  if(req.file){
    if(req.file.filename){

  //retorna el nombre de la imagen para poder localizarla y borrarla
  usuario.returnPerId(conexion,req.body.id_user, function(err,registros){
    var nombreImagen="public/images/"+(registros[0].image);
  //condicional para verificar si existe la imagen en la carpeta public/images, si es asi lo borra
    if(borrar.existsSync(nombreImagen)){
      borrar.unlinkSync(nombreImagen);
    }
    //actualizar imagen en la bd
    usuario.updateFileUser(conexion,req.body,req.file,function (err){
    });

  });

   

    }
  }
//condiciona los textboxs y ejecuta la actualizacion de los datos (sin la imagen)
  if(req.body.name || req.body.password || req.body.email){
    usuario.updateUser(conexion,req.body,function (err){
    });
  }
  

  res.redirect('/dashboard');
 
 
}


}
var express = require('express');
var router = express.Router();
//recibe metodos del controlador
const usuarioController= require("../controllers/usuariosController");
const loginController= require("../controllers/loginController");
//libreria para guardar imagenes
var multer = require('multer');
// sirve para generar un nombre unico a la imagen por si un usuario mete un nombre ya existente
var fecha=Date.now();

//se genera la ruta de la imagen y el nombre de la imagen
var rutaAlmacen= multer.diskStorage(
    {  
        //se configura la ruta de la imagen
        destination:function(request, file, callback) {
        callback(null,'./public/images/');
    },
    // se genera el nombre de la imagen que sera utilizada para guardar el registro en la base de datos (se concatena mediante una fecha actual + el nombre original de la imagen).
    filename:function (request, file, callback) {
        console.log(file);
        callback(null,fecha+"_"+file.originalname);
    }
}
);

//se configura multer para recibir la ruta de almacenamiento
var cargar = multer({ storage:rutaAlmacen});

/* GET home page. */
//Obtener datos en el index que llena el datatable
router.get('/', usuarioController.index, loginController.islogged);
//genera ruta para el formulario
router.get('/newuser',usuarioController.newuser);
//Guardar un nuevo usuario y manda la imagen con la libreria multer
// cargar.single("file") esta cargando el nombre del input file del formulario (name="file")
router.post("/",cargar.single("file"),usuarioController.save);

//borrar un usuario mediante el id recibido
router.post("/delete/:id",usuarioController.delete);

//muestra los datos en la vista edit mediante el id recibido
router.get("/edit/:id",usuarioController.edit);

//
router.post("/update",cargar.single("file"),usuarioController.update);
//

module.exports = router;
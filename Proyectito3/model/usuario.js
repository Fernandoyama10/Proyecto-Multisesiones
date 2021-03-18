module.exports={
    getdata:function (conexion,funcion){
        conexion.query("SELECT * FROM usuarios", funcion);
    },
    verifyUser:function (conexion,email,funcion){
        conexion.query('SELECT * FROM usuarios WHERE email = ?',[email], funcion);
    },
    verifyAdmin:function (conexion,email,funcion){
        conexion.query('SELECT * FROM usuarios INNER JOIN operations ON operations.id_user = usuarios.id_user  WHERE email = ? and id_module=6',[email], funcion);
    },
    insert:function (conexion,datos,archivos,funcion){
        conexion.query("INSERT INTO usuarios ( name, image, password, email) VALUES (?,?,?,?) ",[datos.name, archivos.filename, datos.password, datos.email], funcion);
        //se hace la recuperación del id del usuario
       conexion.query("SELECT id_user from usuarios where email = (?) ",[datos.email], async (error, id) =>{
        if(error){
            console.log(error);
        }else{

            console.log("============RECUPERAR EL ID DEL REGISTROOO=================");
            console.log(id[0].id_user);
            var modulo = 1;
            const modulos = [1,2,3,4,5,6];
            var inicio = "true";
             if(!datos.checkgames){

                datos.checkgames = "false"; 
            }
            if(!datos.checkfotos){

                datos.checkfotos = "false";
            }
            if(!datos.checkmesa){
                datos.checkmesa = "false";
            }
            if(!datos.checkulustraciones){
                datos.checkulustraciones = "false";
            }
            if(!datos.checkdash){

                datos.checkdash = "false";
            }

            var status = [inicio, datos.checkgames, datos.checkfotos, datos.checkmesa, datos.checkulustraciones, datos.checkdash];

                 for(let i=0; i < modulos.length; i++){

                    conexion.query("INSERT INTO operations (status, id_module, id_user) VALUES (?, ?, ?)",[status[i], modulos[i], id[0].id_user], async (error, result ) =>{
                        if(error){
                            console.log(error);
                            console.log("ERROR Y RESULTADO DEL INSERT DE OPERACIONES")  
                            console.log(result);
                        }else{
                
                            console.log("============REGISTRADO CORRECTAMENTE EL USUARIO CON PERMISOS=================");  
                            console.log("RESULTADO DEL INSERT DE OPERACIONES")
                            console.log(result);
                
                        }
                                
                       });


                }

        }

       });

    },
    returnPerId:function (conexion,id,funcion){
        conexion.query("SELECT * FROM usuarios WHERE id_user=?",[id], funcion);
    },
    deletePerId:function (conexion,id,funcion){
        conexion.query("DELETE FROM usuarios WHERE id_user=?",[id], funcion);
    },
    updateUser:function (conexion,datos,funcion){
        conexion.query("UPDATE usuarios SET name=?, password=?, email=? WHERE id_user=? ",[datos.name, datos.password, datos.email, datos.id_user],funcion);
    },
    updateFileUser:function (conexion,datos,archivo,funcion){
        conexion.query("UPDATE usuarios SET image=? WHERE id_user=? ",[archivo.filename, datos.id_user],funcion);
    },


}
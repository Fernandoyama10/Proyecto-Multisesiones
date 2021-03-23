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
            const modulos = [1,2,3,4,5,6];
            if(!datos.inicio){
                datos.inicio = "false"; 
            }
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

            var status = [datos.inicio, datos.checkgames, datos.checkfotos, datos.checkmesa, datos.checkulustraciones, datos.checkdash];
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
    returnDeletePerId:function (conexion,id,funcion){
        conexion.query("SELECT * from usuarios where id_user = ? ",[id], funcion);
    },
    returnPerId:function (conexion,id,funcion){
      //conexion.query("SELECT * FROM usuarios WHERE id_user=?",[id], funcion);
      conexion.query("SELECT M.section, U.id_user, section, image, name, password, email, status, O.id_module FROM usuarios as U INNER JOIN operations as O ON U.id_user = O.id_user INNER JOIN module as M ON O.id_module = M.id_module WHERE U.id_user = ?",[id], funcion);
    },
    /*deletePerId:function (conexion,id,funcion){
        conexion.query("DELETE FROM usuarios WHERE id_user=?",[id], funcion);
    },*/
    updateUser:function (conexion,datos,funcion){
        conexion.query("UPDATE usuarios SET name=?, password=?, email=? WHERE id_user=?",[datos.name, datos.password, datos.email, datos.id_user],funcion);

        //updagte de los permisos
        const modulos = [1,2,3,4,5,6];
        if(!datos.Inicio){
            datos.Inicio = "false";
        }
        if(!datos.Juegos){
            datos.Juegos = "false";
        }
        if(!datos.Fotos){
            datos.Fotos = "false";
        }
        if(!datos.Juegos_mesa){
            datos.Juegos_mesa = "false";
        }
        if(!datos.Ilustraciones){

            datos.Ilustraciones = "false";
        }
        if(!datos.Dashboard){

            datos.Dashboard = "false";
        }

        var status = [datos.Inicio, datos.Juegos, datos.Fotos, datos.Juegos_mesa, datos.Ilustraciones, datos.Dashboard];

             for(let i=0; i < modulos.length; i++){

                conexion.query("UPDATE operations SET status =? WHERE id_user=? AND id_module=?",[status[i], datos.id_user, modulos[i]], async (error, result ) =>{
                    if(error){
                        console.log(error);
                        console.log("ERROR Y RESULTADO DEL UPDATE DE OPERACIONES")  
                        console.log(result);
                    }else{
            
                        console.log("============ACTUALIZACIN CORRECTAMENTE EL USUARIO CON PERMISOS============");  
                        console.log("RESULTADO DEL INSERT DE OPERACIONES")
                        console.log(result);
            
                    }
                            
                   });


            }
        
    },
    updateFileUser:function (conexion,datos,archivo,funcion){
        conexion.query("UPDATE usuarios SET image=? WHERE id_user=? ",[archivo.filename, datos.id_user],funcion);
    },


}
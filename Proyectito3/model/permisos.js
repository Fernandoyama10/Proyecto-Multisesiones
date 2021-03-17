module.exports={
    getRoles:function (conexion,id,funcion){
        conexion.query('SELECT id_menu, acceso FROM permisos where id_user=?',[id], funcion);
    },
}
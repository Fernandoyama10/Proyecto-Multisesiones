module.exports={
    getAccess:function (conexion,id,funcion){
        conexion.query('SELECT acceso FROM permisos WHERE id_user = ?',[id], funcion);
    },
}

module.exports={
    getRoles:function (conexion,id,funcion){
        conexion.query('SELECT id_menu, acceso FROM permisos where id_user=?',[id], funcion);
    },
}
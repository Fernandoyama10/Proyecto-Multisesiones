module.exports={
    getRoles:function (conexion,id,funcion){
        conexion.query('SELECT id_operation, status FROM operations where id_user=?',[id], funcion);
    },
}
module.exports={
    getRoles:function (conexion,id,funcion){
        conexion.query('SELECT id_operation, status, id_module FROM operations where id_user=?',[id], funcion);
    },
    getModulesPerName:function (conexion,id,namepage,funcion){
        conexion.query('SELECT id_operation, status, O.id_module, name_module FROM operations as O INNER JOIN module ON O.id_module = module.id_module where id_user=? and name_module=?',[id,namepage], funcion);
    },
}
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
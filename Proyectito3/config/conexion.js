var mysql= require("mysql");

var con= mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'12345',
<<<<<<< Updated upstream
    database:'usuariosprueba'
<<<<<<< HEAD



=======
    database:'bd_proyectito'
    
>>>>>>> Stashed changes
=======
    
>>>>>>> brandon
}

);

con.connect(
    (err)=>{
        if(!err){
            console.log('Conexión establecida');
        }else{
            console.log('Error de conexión');
        }
    }
);
module.exports=con;
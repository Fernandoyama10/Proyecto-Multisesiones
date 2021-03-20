
  var urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has('delete') && urlParams.get('delete')){
  swal({
  title: "Usuario eliminado exitosamente.",
  icon: "success",
  button: "Aceptar",
})
}


if(urlParams.has('save') && urlParams.get('save')){
swal({
title: "Usuario agregado exitosamente.",
icon: "success",
button: "Aceptar",
})
}


if(urlParams.has('error') && urlParams.get('error')){
    swal({
    title: "Falta registro de permisos.",
    icon: "error",
    button: "Aceptar",
    })
    }
    
    if(urlParams.has('update') && urlParams.get('update')){
        swal({
        title: "Usuario actualizado exitosamente.",
        icon: "success",
        button: "Aceptar",
        })
        }


        
        var password = document.getElementById("password")
  , confirm_password = document.getElementById("password2");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
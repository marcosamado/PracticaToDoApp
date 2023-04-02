window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector("form");
    const nombre = document.getElementById("inputNombre");
    const apellido = document.getElementById("inputApellido");
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const password2 = document.getElementById("inputPasswordRepetida");
   

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const objetoUsuario= {}; 
            validarTexto(nombre.value) ? objetoUsuario.firstName = nombre.value : false;
            validarTexto(apellido.value) ? objetoUsuario.lastName = apellido.value : false;
            validarEmail(email.value) ? objetoUsuario.email = email.value : false;
            validarContrasenia(password.value) && compararContrasenias(password.value,password2.value) ? objetoUsuario.password = password.value : false;

            console.log(objetoUsuario);
            if(objetoUsuario.hasOwnProperty("firstName") && objetoUsuario.hasOwnProperty("lastName") && objetoUsuario.hasOwnProperty("email") && objetoUsuario.hasOwnProperty("password")){
                let settings = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(objetoUsuario)
                }

                realizarRegister(settings);

                form.reset();
            }else {
                alert("Los datos que ingresaste NO SON VALIDOS!")
            }
    });
    

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */

    function realizarRegister(settings) {
        fetch("https://todo-api.ctd.academy/v1/users", settings)
            .then(function(response){
                if (response.ok !==true){
                    alert("Alguno de los datos es incorrecto");
                }else{
                    alert("El usuario se cargo corractamente, bienvenido");
                }
                return response.json();

            })
            .then(function(data){
                if (data.jwt){
                    localStorage.setItem("jwt", JSON.stringify(data.jwt));
                    location.replace("./mis-tareas.html");
                };
             })
             .catch(function(e){
                    console.log("Error" + e);
             })

    };


});
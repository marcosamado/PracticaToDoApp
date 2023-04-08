window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const form = document.querySelector("form");



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
    
        event.preventDefault();

        let obtenerUsuario= {}
        if(validarEmail(inputEmail.value) && validarContrasenia(inputPassword.value)){
            obtenerUsuario.email = inputEmail.value.toLowerCase();
            obtenerUsuario.password = inputPassword.value;
        };
        console.log(obtenerUsuario);
        // let obtenerUsuario = {
        //     email: inputEmail.value,
        //     password: inputPassword.value
        // };
        if(obtenerUsuario.hasOwnProperty("email")){
            let setting = {
                method: "POST",
                body: JSON.stringify(obtenerUsuario),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            realizarLogin(setting);

            form.reset();
        }else {
            alert("Los datos estan mal ingresados");
        };
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
    
        fetch("https://todo-api.ctd.academy/v1/users/login", settings)
        .then(response => {
            if(!response.ok){
                alert("Alguno de los datos son incorrectos");
            };
            return response.json();
        })
        .then(data => {
            if(data.jwt){
                // console.log(data);
                localStorage.setItem("jwt", JSON.stringify(data.jwt));
                location.replace("./mis-tareas.html");
            }
        })
        .catch(error => {
            console.log(error)
        })
        
    };


});
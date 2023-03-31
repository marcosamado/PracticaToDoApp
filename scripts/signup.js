window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form= this.document.querySelector("form");
    const nombre= this.document.getElementById("inputNombre");
    const apellido= this.document.getElementById("inputApellido");
    const correo= this.document.getElementById("inputEmail");
    const password= this.document.getElementById("inputPassword");
    const password2= this.document.getElementById("inputPasswordRepetida");
   

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const objetoUsuario= {
            firstName: nombre.value,
            lastName: apellido.value,
            email: correo.value,
            password: password.value
            }
            normalizarTexto(objetoUsuario);
            let settings={
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objetoUsuario)
            }

            realizarRegister(settings);

            form.reset();
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
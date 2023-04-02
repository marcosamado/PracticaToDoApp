// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.getElementById("closeApp");
  const userName = document.getElementById("usuario");
    


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    
    alert("Cerrando Sesion ...");
    setTimeout(()=> {
      location.replace("./index.html");
    },1500)
    

  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  
  function obtenerNombreUsuario() {
    // let datosUsuario = {};
    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBydWViYUBob3RtYWlsLmNvbSIsImlkIjo3NjUsImlhdCI6MTY4MDM5MTE1N30.JPj_iQglMrvMRXwLue1iS1FbfhVTAMqeN0HHRxRHrbM"
      }
    };


    fetch("https://todo-api.ctd.academy/v1/users/getMe", settings)
    .then(response => { 
        if(!response.ok){
          alert("Alguno de los datos son incorrectos");
        };
        return response.json()
    })

    .then (data => {
      // datosUsuario.nombre = data.firstName;
      userName.innerHTML = data.firstName;
    });
    // return datosUsuario;
  };
  obtenerNombreUsuario();
  // let nombreDeUsuario = obtenerNombreUsuario();
  // // userName.textContent =
  // console.log(nombreDeUsuario)


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  // function consultarTareas() {
    
    



  // };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  // formCrearTarea.addEventListener('submit', function (event) {
    




  // });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  // function renderizarTareas(listado) {







  // };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  // function botonesCambioEstado() {
    
    



  // }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  // function botonBorrarTarea() {
   
    

    

  // };

});
// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.getElementById("closeApp");
  const userName = document.getElementById("usuario");
  
  const formCrearTarea = document.querySelector("form");
  const nuevaTarea = document.getElementById("nuevaTarea");
  const tareaPendiente = document.querySelector(".tareas-pendientes");
  const tareaTerminada = document.querySelector(".tarea-terminadas");
  
  
  const key = localStorage.getItem("jwt");
  
  obtenerNombreUsuario();
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    
    const cerrarSesion = confirm("desea cerrar sesion?");

    if(cerrarSesion) {
      localStorage.clear();
      location.replace("./index.html");
    };
    

  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  
  function obtenerNombreUsuario() {

  
    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(key)
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
      userName.innerHTML = data.firstName;
    })
    .catch(error => {
      return error;
    })
  };




  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {

    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(key)
      }
    };
        
    fetch("https://todo-api.ctd.academy/v1/tasks", settings)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(data => {
        renderizarTareas(data);
        // tareaPendiente.inner.HTML += `<li>${data}`
      })
      .catch(error => {
        return error;
      })

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    
    event.preventDefault();

    let tarea = {
      description: nuevaTarea.value,
      completed: false
    };

    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(key)
      },
      body: JSON.stringify(tarea)
    };

    fetch("https://todo-api.ctd.academy/v1/tasks", settings)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        return error;
      })

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    
    listado.forEach(tarea => {
      tareaPendiente.innerHTML += 
      `<li class="tarea">
                                  
        <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
                                  
        <div class="descripcion">
                                  
        <p class="nombre">${tarea.description}</p>
                                  
        </div>
                                  
        </li>`
    });

  };

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
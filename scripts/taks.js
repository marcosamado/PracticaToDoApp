// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.jwt) {
  location.replace('./index.html');
}


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.getElementById("closeApp");
  const userName = document.getElementById("usuario");
  
  const formCrearTarea = document.querySelector("form");
  const nuevaTarea = document.getElementById("nuevaTarea");
  const tareasGeneral = document.querySelector("main");
  const tareaPendiente = document.querySelector(".tareas-pendientes");
  const tareaCompletada = document.querySelector(".tareas-terminadas");
  const contadorTareas = document.getElementById("cantidad-finalizadas");
  
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
        return response.json();
      })
      .then(data => {
        renderizarTareas(data);
        botonesCambioEstado();
        // botonBorrarTarea();
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
        return response.json();
      })
      .then(data => {
        consultarTareas();
      })
      .catch(error => {
        return error;
      })
      
      formCrearTarea.reset();
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    tareaPendiente.innerHTML = "";
    tareaCompletada.innerHTML = "";
    let contadorTarea= 0;
    listado.forEach(tarea => {
      let fecha = new Date(tarea.createdAt);
      if(tarea.completed){
        contadorTareas.innerHTML = contadorTarea;
        tareaCompletada.innerHTML += `
        <li class="tarea">
          <div class="hecha">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <div class="cambios-estados">
              <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
              <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        </li>
                      `
        contadorTarea++;
      }else{
        tareaPendiente.innerHTML += 
        `<li class="tarea">
                                    
          <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
                                    
          <div class="descripcion">
                                    
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">${fecha.toLocaleDateString()}</p>                          
          </div>
                                    
          </li>`
        }
      });
    
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {

    tareasGeneral.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      if(event.target.classList.contains("change")){
        
        let idTarea = event.target.id;

        let tareaAModificar = {};

        if(event.target.classList.contains("incompleta")){
          tareaAModificar.completed = false;
        }else {
          tareaAModificar.completed = true;
        }

        let settings = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization": JSON.parse(key)
          },
          body: JSON.stringify(tareaAModificar)
        }
                
        fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarea}`, settings)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          consultarTareas();
        })

      };
    });
  }




  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  // function botonBorrarTarea() {
  //   tareaCompletada.addEventListener("click", (event)=> {
  //     event.stopImmediatePropagation();
  //     if(event.target.classList.contains("incompleta")){
  //       let idTarea = event.target.id;

  //       let settings = {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "authorization": JSON.parse(key)
  //         }
  //       }

  //       fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarea}`, settings)
  //         .then(response => {
  //           console.log(response)
  //           return response.json();
  //         })
  //         .then(data => {
  //           console.log(data)
  //           completarTarea(data, false);
  //           consultarTareas();
            
  //         })
  //     }
  //   })
  // };
  
  // botonBorrarTarea();

});

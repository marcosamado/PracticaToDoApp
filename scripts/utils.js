/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let validName =  /^[a-z ]+$/i;
    if(validName.test(texto)){
        return true;
    }else {
        return false;
    }
}

function normalizarTexto(texto) {
    
    texto.toLowerCase();
    texto.toLowerCase();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    normalizarEmail(email);
    let validMail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(validMail.test(email) && email != null){
        return true;
    }else {
        return false;
    };    
};

function normalizarEmail(email) {
    email.toLowerCase();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if(contrasenia.length >= 5 && contrasenia != null){
        return true;
    }else {
        return false;
    };
};

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if(contrasenia_1 === contrasenia_2) {
        return true;
    }else {
        return false;
    }
}

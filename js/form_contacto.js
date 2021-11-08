

// VARIABLES QUE TIENEN LOS DATOS DEL DOM NECESARIOS DEL FORM EN "CONTACTO"
const form_usuario = document.getElementById('form_contacto');

const nom_usuario = document.getElementById('nombre_usuario');

const ape_usuario = document.getElementById('apellido_usuario');

const email_usuario = document.getElementById('email_usuario');

const text_usuario = document.getElementById('texto_usuario');



// EVENTO QUE LLAMA A LA FUNCION QUE VALIDA LOS INPUTS
form_usuario.addEventListener("submit", e => {
    e.preventDefault();

    validateInputsContacto();
})



// FUNCION QUE VALIDA QUE NINGUN CAMPO ESTE VACIO Y ASIGNA ERROR (BORDE ROJO) O SUCCESS (BORDE VERDE)
const validateInputsContacto = () => {
    let nombreValue = nom_usuario.value
    let apellidoValue = ape_usuario.value
    let emailValue = email_usuario.value
    let textoValue = text_usuario.value

    let confirmar_envio = 0

    if(nombreValue === '') {
        setError(nom_usuario);
        confirmar_envio +=1
    } else {
        setSuccess(nom_usuario);
    }

    if(apellidoValue === '') {
        setError(ape_usuario);
        confirmar_envio +=1
    } else {
        setSuccess(ape_usuario);
    }

    if (emailValue === '') {
        setError(email_usuario)
        confirmar_envio +=1
    } else if (!isValidEmail(emailValue)) {
        setError(email_usuario)
        confirmar_envio +=1
    } else {
        setSuccess(email_usuario);
    }

    if(textoValue === '') {
        setError(text_usuario);
        confirmar_envio +=1
    } else {
        setSuccess(text_usuario);
    }
    


    // SI TODO ESTA CORRECTO, SE MANDA EL FORM, Y SE BORRA TODO EN LOS CAMPOS, Y SE LE SACA EL BORDE SUCCESS (VERDE)
    if (confirmar_envio === 0) {
        nom_usuario.value = ""
        nom_usuario.classList.remove("success")
        ape_usuario.value = ""
        ape_usuario.classList.remove("success")
        email_usuario.value = ""
        email_usuario.classList.remove("success")
        text_usuario.value = ""
        text_usuario.classList.remove("success")
        show_toast("Correo Enviado")        
    } else {
        show_toast("Faltan campos por completar")
    }
}



// FUNCION QUE AGREGA EL ESTADO DE ERROR (BORDE ROJO) COMO CLASE
const setError = (element) => {

    element.classList.add('error')
    element.classList.remove('success')
}



// FUNCION QUE AGREGA EL ESTADO DE SUCCESS (BORDE VERDE) COMO CLASE
const setSuccess = element => {

    element.classList.add('success')
    element.classList.remove('error')
}



// FUNCION QUE VALIDA QUE LO INGRESADO TENGA EL FORMATO DE UN EMAIL
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
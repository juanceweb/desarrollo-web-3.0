


const form_usuario = document.getElementById('form_contacto');

const nom_usuario = document.getElementById('nombre_usuario');

const ape_usuario = document.getElementById('apellido_usuario');

const email_usuario = document.getElementById('email_usuario');

const text_usuario = document.getElementById('texto_usuario');


form_usuario.addEventListener("submit", e => {
    e.preventDefault();

    validateInputsContacto();
})

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



const setError = (element) => {

    element.classList.add('error')
    element.classList.remove('success')
}

const setSuccess = element => {

    element.classList.add('success')
    element.classList.remove('error')
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
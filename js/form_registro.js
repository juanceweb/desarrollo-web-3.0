


const form_reg = document.getElementById('form_reg');

const email_reg = document.getElementById('email_reg');


form_reg.addEventListener("submit", e => {
    e.preventDefault();

    validateInputs();
}) 

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error2')

    errorDisplay.innerText = message;
    inputControl.classList.add('error2')
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error2')

    errorDisplay.innerText = '';
    inputControl.classList.add('success')
    inputControl.classList.remove('error2')
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log();
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    let emailValue = email_reg.value

    if (emailValue === '') {
        setError(email_reg, "Se requiere un email")
        console.log("necesita mail");
    } else if (!isValidEmail(emailValue)) {
        setError(email_reg, "Se requiere un email valido")
        console.log("email no valido");
    } else {
        $(".contenedor_email").addClass("registracion_ok")
        $(".contenedor_email").html("Gracias por Registrarse !").hide().fadeIn(1000)
    }
}
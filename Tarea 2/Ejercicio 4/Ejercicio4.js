document.getElementById('btnVerificar').addEventListener('click', function() {
    let valorEdad = document.getElementById('inputEdad').value;
    let mensajeResultado = document.getElementById('mensaje');

    if (valorEdad >= 18) {
        mensajeResultado.innerHTML = "Eres mayor de edad. ¡Ve por esa cédula!";
        mensajeResultado.style.color = "green";
    } else if (valorEdad > 0) {
        mensajeResultado.innerHTML = "Eres menor de edad. Ya casi, ya casi.";
        mensajeResultado.style.color = "red";
    } else {
        mensajeResultado.innerHTML = "Por favor, ingresa una edad válida.";
        mensajeResultado.style.color = "orange";
    }
});

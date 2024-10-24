let estadoOriginal = true;

document.getElementById('cambiarBtn').addEventListener('click', function() {
    let parrafo = document.getElementById('parrafo');
    let boton = document.getElementById('cambiarBtn');

    if (estadoOriginal) {
        parrafo.innerHTML = "¡El contenido ha cambiado! Este párrafo fue actualizado dinámicamente.";
        boton.innerHTML = "Restaurar"; 
    } else {
        parrafo.innerHTML = "Este es el contenido original del párrafo. Haz clic en el botón para cambiarlo.";
        boton.innerHTML = "Cambiar"; 
    }

    estadoOriginal = !estadoOriginal;
});

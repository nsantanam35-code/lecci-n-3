// Esto se ejecutará apenas cargue el archivo
console.log("Archivo JS cargado correctamente");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM totalmente cargado");

    // Función para el formulario del Modal
    const formulario = document.getElementById('formCita');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombreUsuario').value;
            alert("¡Formulario funcionando! Hola " + nombre);
            
            // Cerrar modal manualmente
            const modalActual = bootstrap.Modal.getInstance(document.getElementById('modalAgenda'));
            modalActual.hide();
        });
    }

    // Función para los botones de la tabla
    document.querySelectorAll('.btn-perfil').forEach(boton => {
        boton.onclick = function() {
            alert("Botón de perfil detectado correctamente");
        };
    });
});

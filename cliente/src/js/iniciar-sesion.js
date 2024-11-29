document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const correo = document.querySelector('[name="correo"]').value;
    const contra = document.querySelector('[name="contra"]').value;

    // Validación simple
    if (!correo || !contra) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Enviar los datos al servidor
    fetch('http://localhost:3000/iniciar-sesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contra })
    })
        .then(response => {
            console.log(response);  // Revisa la respuesta del servidor
            return response.json();
        })
        .then(data => {
            console.log(data);  // Revisa los datos devueltos
            if (data.exito) {
                // Guardar el nombre del usuario y el tipo de CSS en localStorage
                localStorage.setItem('userName', data.nombre);  // Guarda el nombre del usuario
                localStorage.setItem('cssType', data.css);  // Guarda el tipo de CSS

                // Redirigir a la página principal
                window.location.href = 'inicio.html';
            } else {
                alert(data.mensaje); // Muestra el mensaje de error (ej. "Credenciales incorrectas")
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la conexión al servidor.');
        });
});

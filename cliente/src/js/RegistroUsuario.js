document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar el envío estándar del formulario

    // Capturar los datos del formulario
    const nombre = event.target.nombre.value;
    const correo = event.target.correo.value;
    const fecha_nacimiento = event.target.fecha_nacimiento.value;
    const contra = event.target.contra.value;

    // Crear un objeto con los datos del estudiante
    const datos = {
        nombres: nombre,
        correo: correo,
        fecha_nacimiento: fecha_nacimiento,
        contrasena: contra
    };

    try {
        // Enviar los datos al backend mediante una solicitud POST
        const respuesta = await fetch('http://localhost:3000/api/registro', { // Cambia la URL según tu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        // Asegúrate de que la respuesta sea válida antes de convertirla
        if (!respuesta.ok) {
            const errorMensaje = await respuesta.text(); // Obtener texto en caso de error
            throw new Error(errorMensaje || 'Error al registrar');
        }

        // Procesar la respuesta JSON
        const resultado = await respuesta.json();

        alert('Cuenta creada exitosamente');
        window.location.href = 'iniciar-sesion.html'; // Redirigir al inicio de sesión
    } catch (error) {
        console.error('Error al registrar:', error);
        alert(`Hubo un problema al crear la cuenta. Detalles: ${error.message}`);
    }
});

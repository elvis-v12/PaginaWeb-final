document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Usa `event.target.elements` para acceder a los campos
    const correo = event.target.elements.correo.value;
    const contrasena = event.target.elements.contra.value;

    const datos = { correo, contrasena };

    try {
        const respuesta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json(); // Parsear directamente como JSON

        if (respuesta.ok) {
            alert('Inicio de sesión exitoso.');

            // Guardar los datos en localStorage
            localStorage.setItem('userName', resultado.nombre);
            localStorage.setItem('cssType', resultado.rango_edad);
            localStorage.setItem('correo', resultado.correo);

            console.log('Datos almacenados en localStorage:', {
                nombre: resultado.nombre,
                cssType: resultado.rango_edad,
                correo: resultado.correo
            });

            // Redirigir a la página de inicio
            window.location.href = '/src/html/inicio.html';
        } else {
            alert(`Error: ${resultado.mensaje || 'Ocurrió un error inesperado.'}`);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo.');
    }
});
document.querySelector('.input-submit').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPassword').value;

    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // Realizar la solicitud con fetch y esperar su respuesta
        const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Verificar si la respuesta es válida
        if (!response.ok) {
            const errorText = await response.text(); // Obtener el texto completo del error
            console.error('Error en la respuesta:', errorText);
            alert(`Error: ${errorText}`);
            return;
        }

        const data = await response.json(); // Parsear el JSON si la respuesta es válida

        if (data) {
            alert(data.message);
            console.log('Datos del usuario:', data.data);
            // Redirigir al panel de administrador o realizar alguna acción
        } else {
            alert('Datos inválidos.');
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error al conectar con el servidor.');
    }
});

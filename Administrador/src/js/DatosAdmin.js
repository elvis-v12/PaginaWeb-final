document.querySelector('.input-submit').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPassword').value;

    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo válido.');
        return;
    }

    const submitButton = document.querySelector('.input-submit');
    submitButton.disabled = true; // Deshabilitar botón durante la solicitud

    try {
        const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Error inesperado'}`);
            return;
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data); // Para depurar

        if (data.redirectUrl) {
            // Guarda el nombre del usuario en localStorage
            if (data.data && data.data.nombre) {
                console.log('Nombre del usuario recibido:', data.data.nombre);
                localStorage.setItem('userName', data.data.nombre); // Guardar en localStorage
            }            
            
            console.log('Redirigiendo a:', data.redirectUrl); // Depuración
            window.location.href = data.redirectUrl;
        } else {
            alert('No se proporcionó una URL de redirección.');
        }
        
        
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error al conectar con el servidor.');
    } finally {
        submitButton.disabled = false; // Rehabilitar botón
    }
});


//cambiar contraseña 
document.querySelector('.input_us').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('regEmail').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!email || !newPassword || !confirmPassword) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/admin/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Mensaje de éxito
            window.location.href = '/src/html/loginadmin.html'; // Redirige al login
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        alert('Error al conectar con el servidor.');
    }
});

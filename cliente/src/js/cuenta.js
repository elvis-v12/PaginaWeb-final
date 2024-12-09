document.addEventListener('DOMContentLoaded', async function () {
    // Obtener el correo del usuario desde el localStorage (asumimos que está almacenado)
    const correo = localStorage.getItem('correo');
    if (!correo) {
        alert('No se pudo obtener el correo del usuario.');
        return;
    }

    try {
        // Realizar la solicitud al servidor para obtener los datos del perfil
        const respuesta = await fetch(`http://localhost:3000/api/perfilCliente/perfil/${correo}`);
        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // Llenar el formulario con los datos recibidos del servidor
            const { nombres, apellidos, direccion, telefono, biografia, genero, fecha_nacimiento } = resultado.datos;

            document.getElementById('nombres').value = nombres || '';
            document.getElementById('apellidos').value = apellidos || '';
            document.getElementById('direccion').value = direccion || '';
            document.getElementById('correo').value = correo; // El correo generalmente no debe ser editable
            document.getElementById('telefono').value = telefono || '';
            document.getElementById('biografia').value = biografia || '';
            document.getElementById('cumpleaños').value = fecha_nacimiento || ''; // Asegúrate de que la fecha está en formato YYYY-MM-DD

            // Seleccionar el género (masculino o femenino)
            if (genero === 'masculino') {
                document.getElementById('masculino').checked = true;
            } else if (genero === 'femenino') {
                document.getElementById('femenino').checked = true;
            }
        } else {
            alert(`Error: ${resultado.mensaje || 'No se pudo obtener el perfil.'}`);
        }
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        alert('Hubo un problema al obtener los datos del servidor.');
    }
});


//ACTUALIZAR PERFIL

document.querySelector('.btn-guardar').addEventListener('click', async function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const biografia = document.getElementById('biografia').value;
    
    // Género seleccionado
    const genero = document.querySelector('input[name="genero"]:checked')?.value;
    
    // Cumpleaños (fecha de nacimiento)
    const cumpleaños = document.getElementById('cumpleaños').value;
    
    // Crear un objeto con los datos a enviar
    const datosUsuario = {
        nombres,
        apellidos,
        direccion,
        correo,
        telefono,
        biografia,
        genero,
        fecha_nacimiento: cumpleaños, // Se envía como "fecha_nacimiento"
    };

    try {
        // Enviar los datos al servidor (ajustar la URL al endpoint correcto)
        const respuesta = await fetch('http://localhost:3000/api/perfilCliente/actualizar', {
            method: 'PUT',  // Asumimos que se utiliza un método PUT para actualizar el perfil
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert('Perfil actualizado con éxito.');
            // Aquí podrías redirigir al usuario o hacer alguna acción adicional
        } else {
            alert(`Error: ${resultado.mensaje || 'Ocurrió un error al actualizar el perfil.'}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al enviar los datos al servidor.');
    }
});

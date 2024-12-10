document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');

    // Añade una animación de hover a la imagen de perfil
    profileImg.addEventListener('mouseover', () => {
        profileImg.style.transform = 'scale(1.1)';
        profileImg.style.transition = 'transform 0.3s ease';
    });

    profileImg.addEventListener('mouseout', () => {
        profileImg.style.transform = 'scale(1)';
    });
});


// Función para obtener las categorías y agregar los checkboxes
function cargarCategorias() {
    fetch('http://localhost:3000/api/becas/categorias')  // Asegúrate de que la URL sea correcta
        .then(response => response.json())
        .then(categorias => {
            const container = document.getElementById('temas-interes');
            container.innerHTML = '';  // Limpia cualquier contenido anterior

            // Iteramos sobre las categorías para crear los checkboxes
            categorias.forEach(categoria => {
                const checkboxWrapper = document.createElement('div');  // Contenedor de cada checkbox
                checkboxWrapper.classList.add('checkbox-wrapper');  // (opcional) para agregar un estilo específico

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = categoria;  // Usamos el nombre de la categoría como ID
                checkbox.name = 'temas-interes[]';  // Agrega el mismo nombre a todos los checkboxes

                const label = document.createElement('label');
                label.setAttribute('for', categoria);
                label.textContent = categoria;  // El texto será el nombre de la categoría

                checkboxWrapper.appendChild(checkbox);
                checkboxWrapper.appendChild(label);
                container.appendChild(checkboxWrapper);  // Añadimos el checkbox a la sección
            });
        })
        .catch(error => console.error('Error al cargar las categorías:', error));
}

// Llamamos a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarCategorias);







// Función para obtener los datos del perfil y llenar el formulario
const cargarPerfil = async () => {
    // Obtener el correo desde el localStorage
    const correo = localStorage.getItem('correo');  // Acceder al correo almacenado en el localStorage

    // Verificar que el correo exista en el localStorage
    if (!correo) {
        console.log('No se encontró el correo en el localStorage');
        return;  // Si no hay correo, salimos de la función
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/perfil/${correo}`);
        const data = await respuesta.json();

        // Verifica que la respuesta esté bien estructurada
        console.log(data);  // Puedes revisar la estructura de los datos para asegurarte de que estamos accediendo correctamente

        // Si la respuesta es correcta, llenamos los campos
        if (respuesta.ok) {
            const perfil = data.data;  // Acceder al objeto de datos

            // Llenar los campos con los datos del estudiante
            document.getElementById('nombres').value = perfil.nombres || '';
            document.getElementById('direccion').value = perfil.direccion || '';
            document.getElementById('correo').value = perfil.correo || '';  // Usamos el correo de los datos
            document.getElementById('telefono').value = perfil.telefono || '';
            document.getElementById('biografia').value = perfil.biografia || '';

            // Llenar la fecha de nacimiento
            if (perfil.fecha_nacimiento) {
                const fecha = new Date(perfil.fecha_nacimiento);  // Convertir la fecha en formato ISO
                const fechaFormateada = fecha.toISOString().split('T')[0];  // Formatear la fecha a YYYY-MM-DD
                document.getElementById('cumpleaños').value = fechaFormateada;
            }

            // Llenar el género seleccionado
            if (perfil.genero === 'Masculino') {
                document.getElementById('masculino').checked = true;
            } else if (perfil.genero === 'Femenino') {
                document.getElementById('femenino').checked = true;
            }

            // Si tienes categorías de temas de interés (checkboxes), puedes llenarlos aquí
            if (perfil.id_categoria_preferencia) {
                // Si existe una categoría de preferencia, la puedes mostrar en el formulario de interés
                const temasInteres = document.getElementById('temas-interes');
                temasInteres.innerHTML = ''; // Limpiar antes de agregar nuevos checkboxes

                // Aquí es un ejemplo de cómo podrías agregar un checkbox si lo deseas
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = perfil.categoria_preferencia;
                checkbox.id = perfil.categoria_preferencia;
                checkbox.checked = true; // Lo marcas como seleccionado
                const label = document.createElement('label');
                label.setAttribute('for', perfil.categoria_preferencia);
                label.textContent = perfil.categoria_preferencia;  // O la categoría que desees
                temasInteres.appendChild(checkbox);
                temasInteres.appendChild(label);
            }

            // Actualizar el estado de la beca en el HTML
            const tramiteBecaElement = document.getElementById('tramite-beca');
            if (perfil.estado_beca) {
                tramiteBecaElement.textContent = `Estado de la beca: ${perfil.estado_beca}`;  // Mostrar el estado de la beca
            } else {
                tramiteBecaElement.textContent = 'No tienes beca asignada o no disponible';  // Mensaje alternativo si no hay estado
            }

        } else {
            console.log('No se pudo obtener el perfil');
        }
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
    }
};

// Llamamos a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarPerfil);








// Función para enviar los cambios del perfil al servidor
function guardarCambios() {
    const correo = localStorage.getItem('correo'); // Obtener correo desde el localStorage

    // Obtener todos los campos del formulario
    const nombres = document.getElementById('nombres').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const biografia = document.getElementById('biografia').value;
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const fechaNacimiento = document.getElementById('cumpleaños').value;
    
    // Obtener las categorías seleccionadas (temas de interés)
    const temasInteresSeleccionados = [];
    document.querySelectorAll('input[name="temas-interes[]"]:checked').forEach(checkbox => {
        temasInteresSeleccionados.push(checkbox.id);  // Usamos el id del checkbox, que es el nombre de la categoría
    });

    // Crear el objeto con los datos a enviar
    const datos = {
        nombres,
        direccion,
        telefono,
        biografia,
        genero,
        fecha_nacimiento: fechaNacimiento,
        temas_interes: temasInteresSeleccionados  // Enviamos los nombres de las categorías seleccionadas
    };

    // Enviar los datos al servidor para actualizarlos
    fetch(`http://localhost:3000/api/cuenta/perfil/${correo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Perfil actualizado correctamente');
        } else {
            alert('Hubo un error al actualizar el perfil');
        }
    })
    .catch(error => console.error('Error al guardar los cambios:', error));
}


// Llamar la función de actualización cuando se haga clic en el botón "Guardar cambios"
document.querySelector('.btn-guardar').addEventListener('click', guardarCambios);



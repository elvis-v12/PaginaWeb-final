// Obtener los datos del formulario
const btnGuardarCurso = document.getElementById('guardar-curso-nuevo');
btnGuardarCurso.addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto

    const id_ruta = document.getElementById('id_ruta').value;
    const id_profesor = document.getElementById('id_profesor').value;
    const nombre_curso = document.getElementById('nombre_curso').value;
    const descripcion = document.getElementById('descripcion').value;
    const nivel_edad = document.getElementById('nivel_edad').value;
    const es_pago = document.getElementById('es_pago').value === 'true'; // Convierte a booleano
    const precio = document.getElementById('precio').value;
    const duracion_horas = document.getElementById('duracion_horas').value;

    // Crear el objeto con los datos a enviar
    const cursoData = {
        id_ruta,
        id_profesor,
        nombre_curso,
        descripcion,
        nivel_edad,
        es_pago,
        precio,
        duracion_horas
    };

    // Enviar la solicitud POST al servidor
    fetch('/api/cursos/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cursoData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Curso agregado correctamente') {
            alert('Curso agregado con éxito');
            // Aquí puedes actualizar la lista de cursos en la página del cliente
        } else {
            alert('Error al agregar el curso');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al intentar agregar el curso');
    });
});

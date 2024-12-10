window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Realizamos una solicitud GET al servidor para obtener las categorías
        const response = await fetch('http://localhost:3000/api/becas/categorias');

        if (!response.ok) {
            throw new Error('No se pudieron obtener las categorías');
        }

        // Parseamos la respuesta JSON
        const categorias = await response.json();

        // Seleccionamos el elemento del desplegable
        const selectElement = document.getElementById('categorias');

        // Añadimos las opciones al desplegable
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    }
});


//POSTULACION A LA BECA GUARDADO
document.getElementById('btn-enviar').addEventListener('click', async () => {
    const nombre = document.querySelector('.pregunta:nth-of-type(1) .editable-line')?.innerText.trim();
    const dni = document.querySelector('.pregunta:nth-of-type(2) .editable-line')?.innerText.trim();
    const correo = document.querySelector('.pregunta:nth-of-type(3) .editable-line')?.innerText.trim();

    const motivoElement = Array.from(document.querySelectorAll('.pregunta')).find((element) =>
        element.querySelector('h3')?.innerText.includes('¿Por qué quieres postularte?')
    );
    const motivo = motivoElement?.querySelector('.editable-line')?.innerText.trim();

    const id_categoria = document.getElementById('categorias').value;

    console.log('Nombre:', nombre);
    console.log('Dni:', dni);
    console.log('Correo:', correo);
    console.log('Motivo:', motivo);
    console.log('Categoría:', id_categoria);


    // Validación previa
    if (!nombre || !dni || !correo || !motivo || !id_categoria) {
        alert('Por favor, completa todos los campos');
        return;
    }

    const data = { nombre, dni, correo, motivo, id_categoria, id_curso: 1, nivel: 'Adulto' };

    try {
        const response = await fetch('http://localhost:3000/api/becas/postular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.error || 'Ocurrió un error al enviar la postulación');
        }
    } catch (error) {
        console.error('Error al enviar la postulación:', error);
        alert('No se pudo completar la postulación');
    }
});


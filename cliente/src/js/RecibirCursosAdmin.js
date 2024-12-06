// Cargar los cursos al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    fetch('/api/cursos/todos')
        .then(response => response.json())
        .then(cursos => {
            cursos.forEach(curso => {
                // Aquí deberías crear un nuevo HTML para cada curso y agregarlo a la página
                // Ejemplo: 
                const nuevoCurso = document.createElement('a');
                nuevoCurso.href = `apartado${curso.ruta}.html?curso=${curso.nombre.toLowerCase()}&nivel=intermedio`; // Aquí puedes ajustar las rutas
                nuevoCurso.classList.add('course-card');
                nuevoCurso.innerHTML = `
                    <div class="image-container">
                        <img src="${curso.imagen}" alt="Curso de ${curso.nombre}" class="course-image">
                    </div>
                    <div class="content-container">
                        <h1><i class="icon-class">💻</i> Curso de ${curso.nombre}</h1>
                        <div class="instructors-list">
                            <div class="instructor-item">
                                <img src="/public/img/ninos/profe.png" alt="Instructor" class="instructor-image">
                                <div class="instructor-info">
                                    <h3 class="instructor-name">${curso.docente}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('.course-container').appendChild(nuevoCurso);
            });
        })
        .catch(error => console.error('Error al cargar los cursos:', error));
});

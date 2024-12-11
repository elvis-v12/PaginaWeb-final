const API_CLIENTE_CURSO_URL = 'http://localhost:3000/api/ClienteCurso/listar';

// Función para obtener y renderizar los cursos
async function cargarCursos() {
  try {
    const response = await fetch(API_CLIENTE_CURSO_URL);
    if (!response.ok) throw new Error('Error al cargar los cursos');

    const cursos = await response.json();
    renderCursos(cursos);
  } catch (error) {
    console.error('Error al cargar los cursos:', error.message);
  }
}

// Función para determinar el nivel de un curso (puedes adaptarlo si tienes un campo de nivel)
function determinarNivel(index) {
  const niveles = ['basico', 'intermedio', 'avanzado'];
  return niveles[index % niveles.length]; // Rotar entre básico, intermedio, avanzado
}

// Función para renderizar los cursos en el contenedor
function renderCursos(cursos) {
  const content = document.getElementById('content');
  let html = '';
  let row = [];

  cursos.forEach((curso, index) => {
    const nivel = determinarNivel(index); // Determina el nivel del curso
    const link = `apartadoP1.html?nivel=${nivel}`; // Genera el enlace dinámico
    const cursoHTML = `
      <a href="${link}" class="course-card" data-course-name="${curso.nombre_curso}">
        <div class="image-container">
          <img src="http://localhost:3000${curso.imagen_url}" alt="Imagen del curso: ${curso.nombre_curso}" class="course-image">
        </div>
        <div class="content-container">
          <h1>Curso: ${curso.nombre_curso}</h1>
          <div class="instructors-list">
            <div class="instructor-item">
              <div class="instructor-info">
                <div class="name-price-info">
                  <h3>Docente: ${curso.docente}</h3>
                  <span>Precio: S/ ${parseFloat(curso.precio).toFixed(2)}</span>
                  <span>Duración: ${curso.duracion_horas} horas</span>
                </div>
                <div class="button-container">
                  <button class="btn-common">Añadir a Rutas</button>
                  <button class="btn-common">Agregar al Carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
    row.push(cursoHTML);

    // Si hay 3 cursos en la fila o es el último curso, cerrar la fila
    if ((index + 1) % 3 === 0 || index === cursos.length - 1) {
      html += `<div class="info-container">${row.join('')}</div>`;
      row = [];
    }
  });

  content.innerHTML = html;
}

// Cargar los cursos al cargar la página
document.addEventListener('DOMContentLoaded', cargarCursos);

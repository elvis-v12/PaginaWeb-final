document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el parámetro 'nivel' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const nivel = urlParams.get("nivel"); // Puede ser 'basico', 'intermedio', o 'avanzado'
  
    if (!nivel) {
      console.error("No se especificó el nivel en la URL.");
      return;
    }
  
    try {
      // Cargar el archivo JSON con los datos de los cursos
      const response = await fetch("/src/html/src/data/cursos.json");
      const data = await response.json();
  
      // Obtener el curso correspondiente
      const curso = data[nivel];
      if (!curso) {
        console.error("No se encontró información para el nivel especificado:", nivel);
        return;
      }
  
      // Actualizar el contenido dinámicamente
      document.querySelector(".title").textContent = curso.titulo;
      document.querySelector(".subtitle").textContent = curso.subtitulo;
      document.querySelector(".level").textContent = curso.nivel;
      document.querySelector(".description").textContent = curso.descripcion;
      document.querySelector(".image-container img").src = curso.imagen;
  
      // Actualizar los recursos
      const recursosContainer = document.querySelector(".recurso-lista");
      recursosContainer.innerHTML = ""; // Limpiar contenido previo
      curso.recursos.forEach((recurso) => {
        const recursoHTML = `
          <div class="content-card">
            <img src="/public/img/ninos/apartadoPy.jpg" alt="${recurso.titulo}">
            <div class="course-details">
              <div class="course-title">${recurso.titulo}</div>
              <div class="duration">
                <i class="fas fa-clock mr-1"></i> ${recurso.duracion}
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${recurso.progreso};"></div>
              </div>
            </div>
          </div>
        `;
        recursosContainer.insertAdjacentHTML("beforeend", recursoHTML);
      });
    } catch (error) {
      console.error("Error al cargar el contenido del curso:", error);
    }
  });
  
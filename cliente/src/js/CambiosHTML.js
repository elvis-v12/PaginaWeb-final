document.addEventListener("DOMContentLoaded", async () => {
    // Obtener los parámetros 'curso' y 'nivel' desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const curso = urlParams.get("curso"); // Ejemplo: 'html'
    const nivel = urlParams.get("nivel"); // Ejemplo: 'basico', 'intermedio', 'avanzado'

    if (!curso || !nivel) {
        console.error("Faltan parámetros en la URL. Asegúrate de incluir 'curso' y 'nivel'.");
        return;
    }

    try {
        // Construir la ruta del archivo JSON en función del curso
        const jsonPath = `/src/html/src/data/Cruso${curso.charAt(0).toUpperCase() + curso.slice(1)}.json`;

        // Cargar el archivo JSON
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo JSON desde ${jsonPath}`);
        }

        const data = await response.json();
        const datosCurso = data[nivel];

        if (!datosCurso) {
            console.error(`No se encontraron datos para el nivel '${nivel}'.`);
            return;
        }

        // Actualizar contenido dinámico en el HTML
        document.querySelector(".title").textContent = datosCurso.titulo || "Título no disponible";
        document.querySelector(".subtitle").textContent = datosCurso.subtitulo || "Subtítulo no disponible";
        document.querySelector(".level").textContent = datosCurso.nivel || "Nivel no especificado";
        document.querySelector(".description").textContent = datosCurso.descripcion || "Descripción no disponible";

        const imageElement = document.querySelector(".image-container img");
        if (imageElement) {
            imageElement.src = datosCurso.imagen || "/public/img/placeholder.png";
            imageElement.alt = datosCurso.titulo || "Imagen no disponible";
        }

        // Actualizar recursos del curso
        const recursosContainer = document.querySelector(".recurso-lista");
        if (recursosContainer) {
            recursosContainer.innerHTML = ""; // Limpiar contenido previo
            datosCurso.recursos.forEach((recurso) => {
                const recursoHTML = `
                    <div class="content-card">
                        <img src="/public/img/ninos/apartadoH.jpg" alt="${recurso.titulo}">
                        <div class="course-details">
                            <div class="course-title">${recurso.titulo || "Título no disponible"}</div>
                            <div class="duration">
                                <i class="fas fa-clock mr-1"></i> ${recurso.duracion || "Duración no especificada"}
                            </div>
                            <div class="progress-bar">
                                <div class="progress-bar-fill" style="width: ${recurso.progreso || "0%"};"></div>
                            </div>
                        </div>
                    </div>
                `;
                recursosContainer.insertAdjacentHTML("beforeend", recursoHTML);
            });
        }
    } catch (error) {
        console.error("Error al cargar o procesar el archivo JSON:", error);
    }
});
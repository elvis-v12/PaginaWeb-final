document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const curso = urlParams.get("curso") || "sqlserver"; // Valor predeterminado
    const nivel = urlParams.get("nivel") || "basico";   // Valor predeterminado

    console.log("Parámetros de la URL:", window.location.search); // Depuración
    console.log("Valor de 'curso':", curso); // Depuración
    console.log("Valor de 'nivel':", nivel); // Depuración

    const jsonPath = `/src/html/src/data/Curso${curso.charAt(0).toUpperCase() + curso.slice(1)}.json`;
    console.log("Ruta JSON generada:", jsonPath); // Depuración

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo JSON desde ${jsonPath}`);
        }

        const data = await response.json();
        const datosCurso = data[nivel.toLowerCase()];

        if (!datosCurso) {
            console.error(`No se encontraron datos para el nivel '${nivel}' en el archivo JSON.`);
            return;
        }

        document.querySelector(".title").textContent = datosCurso.titulo || "Título no disponible";
        document.querySelector(".subtitle").textContent = datosCurso.subtitulo || "Subtítulo no disponible";
        document.querySelector(".level").textContent = datosCurso.nivel || "Nivel no especificado";
        document.querySelector(".description").textContent = datosCurso.descripcion || "Descripción no disponible";

        const imageElement = document.querySelector(".image-container img");
        if (imageElement) {
            imageElement.src = datosCurso.imagen || "/public/img/placeholder.png";
            imageElement.alt = datosCurso.titulo || "Imagen no disponible";
        }

        const recursosContainer = document.querySelector(".recurso-lista");
        if (recursosContainer) {
            recursosContainer.innerHTML = "";
            datosCurso.recursos.forEach((recurso) => {
                const recursoHTML = `
                    <div class="content-card">
                        <img src="/public/img/ninos/apartadoJ.jpg" alt="${recurso.titulo}">
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
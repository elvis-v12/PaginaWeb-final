const API_BASE_URL = "http://localhost:3000/api/curso";
const API_CURSOS_URL = `${API_BASE_URL}/listar`;
const API_RUTAS_URL = `${API_BASE_URL}/rutas`;
const API_CATEGORIAS_URL = `${API_BASE_URL}/categorias`;
const API_PROFESORES_URL = `${API_BASE_URL}/profesores`;
const API_AGREGAR_CURSO_URL = `${API_BASE_URL}/agregar`;

const API_ACTUALIZAR_CURSO_URL = `${API_BASE_URL}/actualizar`;
const API_DESCRIPCION_CURSO_URL = `${API_BASE_URL}/descripcion`;
const API_AGREGAR_VIDEO_URL = `${API_BASE_URL}/videos/agregar`;
const API_NOMBRES_CURSOS_URL = `${API_BASE_URL}/nombres-cursos`;

document.addEventListener("DOMContentLoaded", () => {
    cargarCursos();
    cargarRutas();
    cargarCategorias();
    cargarProfesores();
    cargarNombresCursos();
    configurarModales();
    configurarBotonesGenerales();
});

// Cargar y renderizar nombres de los cursos
async function cargarNombresCursos() {
    try {
        const response = await fetch(API_NOMBRES_CURSOS_URL);
        if (!response.ok) throw new Error("Error al cargar los nombres de los cursos");
        const nombresCursos = await response.json();
        renderNombresCursos(nombresCursos);
    } catch (error) {
        console.error("Error:", error.message);
    }
}
function renderNombresCursos(nombresCursos) {
    const selects = document.querySelectorAll("#ruta-nombresCur-nuevo");
    selects.forEach((select) => {
        select.innerHTML = nombresCursos
            .map((curso) => `<option value="${curso.id_curso}">${curso.nombre_curso}</option>`)
            .join("");
    });
}

// Cargar y renderizar cursos
async function cargarCursos() {
    try {
        const response = await fetch(API_CURSOS_URL);
        if (!response.ok) throw new Error("Error al cargar los cursos");
        const cursos = await response.json();
        renderCursos(cursos);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function renderCursos(cursos) {
    const cursosContainer = document.getElementById("cursos-container");
    if (!cursos || cursos.length === 0) {
        cursosContainer.innerHTML = "<p>No hay cursos registrados.</p>";
        return;
    }

    cursosContainer.innerHTML = cursos
        .map(
            (curso) => `
            <div class="curso-card" data-edad="${curso.nivel_edad || "todos"}" data-categoria="${curso.id_categoria}">
                <h3>${curso.nombre_curso}</h3>
                <p><strong>Docente:</strong> ${curso.docente}</p>
                <p><strong>Precio:</strong> S/${curso.precio}</p>
                <p><strong>Duración:</strong> ${curso.duracion_horas} horas</p>
                <button class="btn-insertar" data-curso-id="${curso.id_curso}">Insertar</button>
            </div>`
        )
        .join("");

    // Agregar evento a los botones "Insertar"
    document.querySelectorAll(".btn-insertar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const cursoId = e.target.getAttribute("data-curso-id");
            abrirModalInsertar(cursoId);
        });
    });
}

// Cargar y renderizar rutas
async function cargarRutas() {
    try {
        const response = await fetch(API_RUTAS_URL);
        if (!response.ok) throw new Error("Error al cargar rutas");
        const rutas = await response.json();
        renderRutas(rutas);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function renderRutas(rutas) {
    const rutaSelect = document.getElementById("ruta-curso-nuevo");
    rutaSelect.innerHTML = rutas
        .map((ruta) => `<option value="${ruta.id_ruta}">${ruta.nombre_ruta}</option>`)
        .join("");
}

// Cargar y renderizar categorías
async function cargarCategorias() {
    try {
        const response = await fetch(API_CATEGORIAS_URL);
        if (!response.ok) throw new Error("Error al cargar categorías");
        const categorias = await response.json();
        renderCategorias(categorias);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function renderCategorias(categorias) {
    const categoriaSelect = document.getElementById("categorias-curso-nuevo");
    categoriaSelect.innerHTML = categorias
        .map((categoria) => `<option value="${categoria.id_categoria}">${categoria.nombre_categoria}</option>`)
        .join("");
}

// Cargar y renderizar profesores
async function cargarProfesores() {
    try {
        const response = await fetch(API_PROFESORES_URL);
        if (!response.ok) throw new Error("Error al cargar profesores");
        const profesores = await response.json();
        renderProfesores(profesores);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function renderProfesores(profesores) {
    const profesorSelect = document.getElementById("docente-curso-nuevo");
    profesorSelect.innerHTML = profesores
        .map((profesor) => `<option value="${profesor.id_profesor}">${profesor.nombres}</option>`)
        .join("");
}

// Configuración de los modales
function configurarModales() {
    const modalAgregarCurso = document.getElementById("modal-agregar-curso");
    const modalCerrar = document.querySelectorAll(".close-modal");

    // Abrir modal de agregar curso
    document.getElementById("btn-agregar-curso").addEventListener("click", () => {
        modalAgregarCurso.style.display = "flex";
    });

    // Cerrar los modales
    modalCerrar.forEach((btn) =>
        btn.addEventListener("click", () => {
            document.querySelectorAll(".modal").forEach((modal) => {
                modal.style.display = "none";
            });
        })
    );

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });
}

// Abrir modal de insertar curso
function abrirModalInsertar(cursoId) {
    const modalEditar = document.getElementById("modal-editar-curso");
    modalEditar.style.display = "flex";
}

// Agregar un nuevo curso
document.getElementById("guardar-curso-nuevo").addEventListener("click", async function () {
    const nombreCurso = document.getElementById("nombre-curso-nuevo")?.value.trim();
    const idProfesor = document.getElementById("docente-curso-nuevo")?.value.trim();
    const precioCurso = document.getElementById("precio-curso-nuevo")?.value.trim();
    const rutaCurso = document.getElementById("ruta-curso-nuevo")?.value.trim();
    const categoriaCurso = document.getElementById("categorias-curso-nuevo")?.value.trim();
    const duracionCurso = document.getElementById("horas-curso-nuevo")?.value.trim();

    if (!nombreCurso || !idProfesor || !precioCurso || !rutaCurso || !categoriaCurso || !duracionCurso) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const nuevoCurso = {
        id_ruta: parseInt(rutaCurso),
        id_categoria: parseInt(categoriaCurso),
        nombre_curso: nombreCurso,
        id_profesor: parseInt(idProfesor),
        precio: parseFloat(precioCurso),
        duracion_horas: parseInt(duracionCurso),
    };

    try {
        const response = await fetch(API_AGREGAR_CURSO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoCurso),
        });

        if (!response.ok) throw new Error("Error al agregar el curso");

        alert("Curso agregado correctamente");
        cargarCursos(); // Recargar los cursos
        document.getElementById("modal-agregar-curso").style.display = "none"; // Cerrar el modal
    } catch (error) {
        console.error("Error:", error.message);
        alert("Error al agregar el curso");
    }
});

// Configuración de los botones generales
// Configuración de los botones generales
function configurarBotonesGenerales() {
    document.getElementById("btn-actualizarDT-curso").addEventListener("click", () => {
        abrirModalActualizarCurso();
    });

    document.getElementById("btn-descrip-curso").addEventListener("click", () => {
        abrirModalDescripcionCurso();
    });

    document.getElementById("btn-sesiones-curso").addEventListener("click", () => {
        abrirModalAgregarSesiones();
    });
}


// Abrir modal para actualizar datos del curso
function abrirModalActualizarCurso() {
    const modalEditar = document.getElementById("modal-editar-curso-1");
    modalEditar.style.display = "flex";

    document.getElementById("guardar-editar-1").addEventListener("click", async function () {
        const cursoId = document.querySelector("#ruta-nombresCur-nuevo").value; // ID seleccionado
        const nombreCurso = document.getElementById("nombre-curso").value.trim();
        const idProfesor = document.getElementById("docente-curso-nuevo").value.trim();
        const precioCurso = document.getElementById("precio-curso").value.trim();

        if (!cursoId || !nombreCurso || !idProfesor || !precioCurso) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const datosCurso = {
            id_curso: parseInt(cursoId),
            nombre_curso: nombreCurso,
            id_profesor: parseInt(idProfesor),
            precio: parseFloat(precioCurso),
        };

        try {
            const response = await fetch(API_ACTUALIZAR_CURSO_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCurso),
            });

            if (!response.ok) throw new Error("Error al actualizar el curso");

            alert("Datos actualizados correctamente");
            modalEditar.style.display = "none";
            cargarCursos();
        } catch (error) {
            console.error("Error:", error.message);
            alert("Error al actualizar el curso");
        }
    });
}

// Abrir modal para agregar descripción al curso
function abrirModalDescripcionCurso() {
    const modalDescripcion = document.getElementById("modal-descripcion-curso-1");
    modalDescripcion.style.display = "flex";

    document.getElementById("guardar-descripcion-1").addEventListener("click", async function () {
        const cursoId = document.querySelector("#ruta-nombresCur-nuevo").value; // ID seleccionado
        const descripcion = document.getElementById("descripcion-curso").value.trim();

        if (!cursoId || !descripcion) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const datosDescripcion = {
            id_curso: parseInt(cursoId),
            descripcion,
        };

        try {
            const response = await fetch(API_DESCRIPCION_CURSO_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosDescripcion),
            });

            if (!response.ok) throw new Error("Error al actualizar la descripción");

            alert("Descripción actualizada correctamente");
            modalDescripcion.style.display = "none";
        } catch (error) {
            console.error("Error:", error.message);
            alert("Error al actualizar la descripción");
        }
    });
}


// Variables para almacenar los módulos temporalmente
let modulosTemp = [];

// Función para añadir un módulo temporalmente
document.getElementById("add-modulo-1").addEventListener("click", function () {
    const cursoId = document.querySelector("#ruta-nombresCur-nuevo").value; // ID seleccionado
    const tituloSesion = document.getElementById("modulo-1").value.trim();
    const nombreVideo = document.getElementById("nombre-1").value.trim();
    const urlVideo = document.getElementById("url-1").value.trim();

    if (!tituloSesion || !nombreVideo || !urlVideo) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto para almacenar el módulo
    const nuevoModulo = {
        id_curso: parseInt(cursoId),
        titulo_sesion: tituloSesion,
        descripcion: "Descripción predeterminada", // Valor predeterminado
        orden: modulosTemp.length + 1, // Asignar el orden basado en el índice
        duracion_minutos: 10, // Duración predeterminada
        url_video: urlVideo,
        titulo_video: nombreVideo,
    };

    // Añadir el módulo a la lista temporal
    modulosTemp.push(nuevoModulo);

    // Renderizar los módulos en el contenedor
    renderizarModulosTemp();

    // Limpiar los campos del formulario
    document.getElementById("modulo-1").value = "";
    document.getElementById("nombre-1").value = "";
    document.getElementById("url-1").value = "";
});

// Función para renderizar los módulos temporales
function renderizarModulosTemp() {
    const videosContainer = document.getElementById("videos-container2");
    videosContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

    modulosTemp.forEach((modulo, index) => {
        const moduloHTML = `
            <div class="modulo-item">
                <p><strong>Módulo ${index + 1}:</strong> ${modulo.titulo_sesion}</p>
                <p><strong>Nombre del Video:</strong> ${modulo.titulo_video}</p>
                <p><strong>URL:</strong> <a href="${modulo.url_video}" target="_blank">${modulo.url_video}</a></p>
                <button class="btn-eliminar-modulo" data-index="${index}">Eliminar</button>
            </div>
        `;
        videosContainer.innerHTML += moduloHTML;
    });

    // Agregar evento para eliminar módulos
    document.querySelectorAll(".btn-eliminar-modulo").forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            modulosTemp.splice(index, 1); // Eliminar el módulo de la lista temporal
            renderizarModulosTemp(); // Volver a renderizar
        });
    });
}

// Función para guardar los módulos en la base de datos
document.getElementById("guardar-videos-1").addEventListener("click", async function () {
    if (modulosTemp.length === 0) {
        alert("No hay módulos para guardar.");
        return;
    }

    console.log("Datos que se enviarán al servidor:", JSON.stringify(modulosTemp, null, 2)); // Log para depuración

    try {
        const response = await fetch(API_AGREGAR_VIDEO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modulosTemp),
        });

        if (!response.ok) throw new Error("Error al guardar los módulos");

        alert("Módulos guardados correctamente");
        modulosTemp = []; // Limpiar la lista temporal
        renderizarModulosTemp(); // Limpiar el contenedor
        document.getElementById("modal-videos-curso-1").style.display = "none"; // Cerrar el modal
    } catch (error) {
        console.error("Error al guardar los módulos:", error.message);
        alert("Error al guardar los módulos");
    }
});

// Función para abrir el modal y configurar los botones
function abrirModalAgregarSesiones() {
    const modalSesiones = document.getElementById("modal-videos-curso-1");
    modalSesiones.style.display = "flex";

    // Botón para cerrar el modal
    document.getElementById("cerrar-modal-editar-1").addEventListener("click", function () {
        modalSesiones.style.display = "none";
    });

    // Renderizar módulos temporales (si existen)
    renderizarModulosTemp();
}

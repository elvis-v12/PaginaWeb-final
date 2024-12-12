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
// Variables globales
let modulosTemp = [];

const formData = new FormData();

document.addEventListener("DOMContentLoaded", () => {
    cargarCursos();
    cargarRutas();
    cargarCategorias();
    cargarProfesores();
    cargarNombresCursos();
    configurarModales();
    configurarBotonesGenerales();

    // Vincular el botón de guardar curso a la función agregarCurso
    const btnGuardarCurso = document.getElementById("guardar-curso-nuevo");
    if (btnGuardarCurso) {
        btnGuardarCurso.addEventListener("click", agregarCurso);
    } else {
        console.error("Error: Botón 'guardar-curso-nuevo' no encontrado.");
    }
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
        const data = await response.json();

        // Validar que data.cursos sea un array
        const cursos = Array.isArray(data) ? data : data.cursos || [];
        renderCursos(cursos);
    } catch (error) {
        console.error("Error al cargar los cursos:", error.message);
    }
}

async function cargarCursos() {
    try {
        const response = await fetch(API_CURSOS_URL);
        if (!response.ok) throw new Error("Error al cargar los cursos");
        const data = await response.json();
        const cursos = Array.isArray(data) ? data : data.cursos || []; // Manejo flexible de datos
        renderCursos(cursos); // Asegúrate de pasar "cursos"
    } catch (error) {
        console.error("Error al cargar los cursos:", error.message);
    }
}

function renderCursos(cursos) {
    // Validar que cursos sea un array
    if (!Array.isArray(cursos)) {
        console.error("Error: cursos no es un array", cursos);
        return;
    }

    const cursosContainer = document.getElementById("cursos-container");
    if (cursos.length === 0) {
        cursosContainer.innerHTML = "<p>No hay cursos registrados.</p>";
        return;
    }

    cursosContainer.innerHTML = cursos
        .map((curso) => {
            const imagenUrl = curso.imagen_url
                ? `http://localhost:3000${curso.imagen_url}`
                : "default-image-path";
            return `
                <div class="curso-card" data-edad="${curso.nivel_edad || "todos"}" data-categoria="${curso.id_categoria}">
                    <img src="${imagenUrl}" alt="Imagen del curso" />
                    <h3>${curso.nombre_curso}</h3>
                    <p><strong>Docente:</strong> ${curso.docente || "No asignado"}</p>
                    <p><strong>Precio:</strong> S/${parseFloat(curso.precio).toFixed(2)}</p>
                    <p><strong>Duración:</strong> ${curso.duracion_horas} horas</p>
                    <button class="btn-insertar" data-curso-id="${curso.id_curso}">Insertar</button>
                </div>`;
        })
        .join("");
}

if (Array.isArray(cursos)) {
    cursos.forEach((curso) => {
        console.log(`Imagen URL: ${curso.imagen_url}`);
    });
} else {
    console.error("Error: cursos no es un array", cursos);
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
for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}

// Agregar un nuevo curso
// Definimos la función agregarCurso correctamente
async function agregarCurso() {
    const formData = new FormData();
    const imagen = document.getElementById("imagen-curso-nuevo").files[0];
    const nombreCurso = document.getElementById("nombre-curso-nuevo")?.value.trim();
    const idProfesor = document.getElementById("docente-curso-nuevo")?.value.trim();
    const precioCurso = document.getElementById("precio-curso-nuevo")?.value.trim();
    const rutaCurso = document.getElementById("ruta-curso-nuevo")?.value.trim();
    const categoriaCurso = document.getElementById("categorias-curso-nuevo")?.value.trim();
    const duracionCurso = document.getElementById("horas-curso-nuevo")?.value.trim();

    if (!nombreCurso || !idProfesor || !precioCurso || !rutaCurso || !categoriaCurso || !duracionCurso || !imagen) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Agregar los datos al FormData
    formData.append("imagen", imagen);
    formData.append("nombre_curso", nombreCurso);
    formData.append("id_profesor", parseInt(idProfesor));
    formData.append("precio", parseFloat(precioCurso));
    formData.append("id_ruta", parseInt(rutaCurso));
    formData.append("id_categoria", parseInt(categoriaCurso));
    formData.append("duracion_horas", parseInt(duracionCurso));

    // Debugging: Mostrar los datos en consola
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await fetch(API_AGREGAR_CURSO_URL, {
            method: "POST",
            body: formData, // Enviar el FormData directamente
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al agregar el curso:", errorData.error);
            throw new Error(errorData.error || "Error desconocido");
        }

        alert("Curso agregado correctamente");
        cargarCursos(); // Recargar los cursos
        document.getElementById("modal-agregar-curso").style.display = "none"; // Cerrar el modal
    } catch (error) {
        console.error("Error al agregar el curso:", error.message);
        alert("Error al agregar el curso: " + error.message);
    }
}


// Configuración de los botones generales
function configurarBotonesGenerales() {
    const btnActualizar = document.getElementById("btn-actualizarDT-curso");
    if (btnActualizar) {
        btnActualizar.addEventListener("click", abrirModalActualizarCurso);
    } else {
        console.error("Error: 'btn-actualizarDT-curso' no existe en el DOM");
    }

    const btnDescripcion = document.getElementById("btn-descrip-curso");
    if (btnDescripcion) {
        btnDescripcion.addEventListener("click", abrirModalDescripcionCurso);
    } else {
        console.error("Error: 'btn-descrip-curso' no existe en el DOM");
    }

    const btnSesiones = document.getElementById("btn-sesiones-curso");
    if (btnSesiones) {
        btnSesiones.addEventListener("click", abrirModalAgregarSesiones);
    } else {
        console.error("Error: 'btn-sesiones-curso' no existe en el DOM");
    }

    const btnAddModulo = document.getElementById("add-modulo-1");
    if (btnAddModulo) {
        btnAddModulo.addEventListener("click", agregarModulo);
    } else {
        console.error("Error: 'add-modulo-1' no existe en el DOM");
    }

    const btnGuardarVideos = document.getElementById("guardar-videos-1");
    if (btnGuardarVideos) {
        btnGuardarVideos.addEventListener("click", guardarModulos);
    } else {
        console.error("Error: 'guardar-videos-1' no existe en el DOM");
    }
}

// Función para añadir un módulo temporalmente
function agregarModulo() {
    const cursoId = document.querySelector("#ruta-nombresCur-nuevo").value; // ID seleccionado
    const tituloSesion = document.getElementById("modulo-1").value.trim();
    const nombreVideo = document.getElementById("nombre-1").value.trim();
    const urlVideo = document.getElementById("url-1").value.trim();

    if (!tituloSesion || !nombreVideo || !urlVideo) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const nuevoModulo = {
        id_curso: parseInt(cursoId),
        titulo_sesion: tituloSesion,
        descripcion: "Descripción predeterminada", // Valor predeterminado
        orden: modulosTemp.length + 1, // Orden basado en el índice actual
        duracion_minutos: 10, // Valor predeterminado
        url_video: urlVideo,
        titulo_video: nombreVideo,
    };

    modulosTemp.push(nuevoModulo);
    renderizarModulosTemp();

    // Limpiar los campos del formulario
    document.getElementById("modulo-1").value = "";
    document.getElementById("nombre-1").value = "";
    document.getElementById("url-1").value = "";
}


function guardarModulos() {
    if (modulosTemp.length === 0) {
        alert("No hay módulos para guardar.");
        return;
    }

    try {
        fetch(API_AGREGAR_VIDEO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modulosTemp),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al guardar los módulos");
                alert("Módulos guardados correctamente");
                modulosTemp = []; // Limpiar la lista temporal
                renderizarModulosTemp(); // Actualizar la vista
                document.getElementById("modal-videos-curso-1").style.display = "none"; // Cerrar modal
            })
            .catch((error) => {
                console.error("Error al guardar los módulos:", error.message);
                alert("Error al guardar los módulos");
            });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Función para abrir el modal de actualizar datos del curso
function abrirModalActualizarCurso() {
    const modalEditar = document.getElementById("modal-editar-curso");
    if (!modalEditar) {
        console.error("Error: El modal 'modal-editar-curso' no existe en el DOM");
        return;
    }
    modalEditar.style.display = "flex";

    const btnCerrar = document.getElementById("cerrar-modal-editar");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            modalEditar.style.display = "none";
        });
    } else {
        console.error("Error: Botón 'cerrar-modal-editar' no existe en el DOM");
    }
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

// Función para abrir el modal de agregar sesiones
function abrirModalAgregarSesiones() {
    const modalSesiones = document.getElementById("modal-videos-curso-1"); // Cambia el ID
    if (!modalSesiones) {
        console.error("Error: modal-videos-curso-1 no existe en el DOM");
        return;
    }

    modalSesiones.style.display = "flex";

    // Configurar el botón para cerrar el modal
    const btnCerrar = document.getElementById("cerrar-modal-editar-1");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            modalSesiones.style.display = "none";
        });
    } else {
        console.error("Error: cerrar-modal-editar-1 no existe en el DOM");
    }
}
document.getElementById("cerrar-modal-editar-1").addEventListener("click", () => {
    const modal = document.getElementById("modal-videos-curso-1");
    if (modal) modal.style.display = "none";
});


// Renderizar módulos temporales
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

    document.querySelectorAll(".btn-eliminar-modulo").forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            modulosTemp.splice(index, 1); // Eliminar el módulo de la lista temporal
            renderizarModulosTemp(); // Volver a renderizar
        });
    });
}


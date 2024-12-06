document.addEventListener("DOMContentLoaded", () => {
  const filtroEdad = document.getElementById("filtro-edad");
  const filtroCategoria = document.getElementById("filtro-categoria");
  const cursosCards = document.querySelectorAll(".curso-card");

  const aplicarFiltros = () => {
    const edadSeleccionada = filtroEdad.value;
    const categoriaSeleccionada = filtroCategoria.value;

    cursosCards.forEach((card) => {
      const cardEdad = card.dataset.edad || "todos";
      const cardCategoria = card.dataset.categoria || "todas";

      const coincideEdad =
        edadSeleccionada === "todos" || edadSeleccionada === cardEdad;
      const coincideCategoria =
        categoriaSeleccionada === "todas" ||
        categoriaSeleccionada === cardCategoria;

      card.style.display = coincideEdad && coincideCategoria ? "block" : "none";
    });
  };

  filtroEdad.addEventListener("change", aplicarFiltros);
  filtroCategoria.addEventListener("change", aplicarFiltros);

  const btnInsertar = document.querySelectorAll(".btn-insertar");
  let cursoIdActual = null;

  btnInsertar.forEach((btn) => {
    btn.addEventListener("click", function () {
      cursoIdActual = this.getAttribute("data-curso-id");
      cargarDatosCurso(cursoIdActual);
      abrirModal();
    });
  });

  function cargarDatosCurso(cursoId) {
    const nombreCursoInput = document.getElementById("nombre-curso");
    const docenteCursoInput = document.getElementById("docente-curso");
    const precioCursoInput = document.getElementById("precio-curso");

    switch (cursoId) {
      case "1":
        nombreCursoInput.value = "Curso de Programación en Html";
        docenteCursoInput.value = "Carlos Méndez";
        precioCursoInput.value = "S/3";
        break;
      case "2":
        nombreCursoInput.value = "Curso Gratis de Introducción a Node js";
        docenteCursoInput.value = "Luis Torres";
        precioCursoInput.value = "S/30";
        break;
      case "3":
        nombreCursoInput.value = "Curso de Introducción a JavaScript";
        docenteCursoInput.value = "Luis Torres";
        precioCursoInput.value = "S/30";
        break;
    }
  }

  function abrirModal() {
    const modal = document.getElementById("modal-editar-curso");
    modal.style.display = "block";
  }

  window.cerrarModal = function () {
    const modal = document.getElementById("modal-editar-curso");
    modal.style.display = "none";
  };
});

// Guardar los cambios cuando se hace clic en el botón "Guardar Cambios"
// Abrir el modal con los datos del curso
function abrirModalEditarCurso(cursoId) {
  const modal = document.getElementById("modal-editar-curso");
  const nombreCurso = document.getElementById("nombre-curso");
  const docenteCurso = document.getElementById("docente-curso");
  const precioCurso = document.getElementById("precio-curso");
  const rutaCurso = document.getElementById("ruta-curso");
  const horasCurso = document.getElementById("horas-curso");
  const modulo1 = document.getElementById("modulo-curso-1");
  const urlModulo1 = document.getElementById("url-curso-1");
  const modulo2 = document.getElementById("modulo-curso-2");
  const urlModulo2 = document.getElementById("url-curso-2");

  // Obtener los datos actuales del curso
  const cardCurso = document.getElementById("curso-" + cursoId);
  nombreCurso.value = cardCurso.querySelector(".nombre-curso-card").textContent;
  docenteCurso.value = cardCurso.querySelector(
    ".descripcion-curso-card"
  ).textContent;
  precioCurso.value = cardCurso
    .querySelector(".precio-curso-card")
    .textContent.replace("S/", "");
  rutaCurso.value = cardCurso
    .querySelector(".ruta-curso-card")
    .textContent.replace("Ruta: ", "");
  horasCurso.value = cardCurso
    .querySelector(".horas-curso-card")
    .textContent.replace("Duración: ", "")
    .replace(" horas", "");
  modulo1.value = cardCurso
    .querySelector(".modulos-curso-card p")
    .textContent.replace("Módulo 1: ", "");
  modulo2.value = cardCurso
    .querySelector(".modulos-curso-card p")
    .textContent.replace("Módulo 2: ", "");
  urlModulo1.value = cardCurso.querySelector(".urls-curso-card a").href;
  urlModulo2.value = cardCurso.querySelector(
    ".urls-curso-card a:nth-child(2)"
  ).href;

  // Mostrar el modal
  modal.style.display = "block";

  // Guardar cambios al enviar el formulario
  const form = document.getElementById("form-editar-curso");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreCurso = document.getElementById("nombre-curso").value;
    const docenteCurso = document.getElementById("docente-curso").value;
    const precioCurso = document.getElementById("precio-curso").value;
    const rutaCurso = document.getElementById("ruta-curso").value;
    const horasCurso = document.getElementById("horas-curso").value;
    const modulo1 = document.getElementById("modulo-curso-1").value;
    const urlModulo1 = document.getElementById("url-curso-1").value;
    const modulo2 = document.getElementById("modulo-curso-2").value;
    const urlModulo2 = document.getElementById("url-curso-2").value;

    // Guardar cambios en la tarjeta
    const cursoId = document
      .getElementById("modal-editar-curso")
      .getAttribute("data-curso-id");
    const cardCurso = document.getElementById("curso-" + cursoId);

    cardCurso.querySelector(".nombre-curso-card").textContent = nombreCurso;
    cardCurso.querySelector(".descripcion-curso-card").textContent =
      docenteCurso;
    cardCurso.querySelector(".precio-curso-card").textContent =
      "S/" + precioCurso;
    cardCurso.querySelector(".ruta-curso-card").textContent =
      "Ruta: " + rutaCurso;
    cardCurso.querySelector(".horas-curso-card").textContent =
      "Duración: " + horasCurso + " horas";

    const modulosCurso = cardCurso.querySelectorAll(".modulos-curso-card p");
    modulosCurso[0].textContent = "Módulo 1: " + modulo1;
    modulosCurso[1].textContent = "Módulo 2: " + modulo2;

    const urlsCurso = cardCurso.querySelectorAll(".urls-curso-card a");
    urlsCurso[0].href = urlModulo1;
    urlsCurso[0].textContent = urlModulo1;
    urlsCurso[1].href = urlModulo2;
    urlsCurso[1].textContent = urlModulo2;

    // Cerrar el modal
    document.getElementById("modal-editar-curso").style.display = "none";
  });
}

// Cerrar el modal
document.querySelector(".close-modal").addEventListener("click", function () {
  document.getElementById("modal-editar-curso").style.display = "none";
});

// Obtener los elementos del DOM
const btnAgregarCurso = document.getElementById("btn-agregar-curso");
const modalAgregarCurso = document.getElementById("modal-agregar-curso");
const modalAgregarVideos = document.getElementById("modal-agregar-videos");
const cerrarModalCurso = document.getElementById("cerrar-modal");
const cerrarModalVideos = document.getElementById("cerrar-modal-videos");
const guardarCursoNuevo = document.getElementById("guardar-curso-nuevo");
const agregarVideoBtn = document.getElementById("agregar-video");
const guardarCursoFinal = document.getElementById("guardar-curso-final");
const videosContainer = document.getElementById("videos-container");
const cursosContainer = document.getElementById("cursos-container");

// Variable para almacenar el curso nuevo y sus videos
let cursoNuevo = {
  videos: [],
};

// Abrir el modal para agregar un nuevo curso
btnAgregarCurso?.addEventListener("click", function () {
  modalAgregarCurso.style.display = "flex";
});

// Cerrar el modal del curso
cerrarModalCurso?.addEventListener("click", function () {
  modalAgregarCurso.style.display = "none";
});

// Cerrar el modal de videos
cerrarModalVideos?.addEventListener("click", function () {
  modalAgregarVideos.style.display = "none";
});

// Guardar el curso básico y abrir el modal de videos
guardarCursoNuevo?.addEventListener("click", function () {
  const nombreCurso = document
    .getElementById("nombre-curso-nuevo")
    .value.trim();
  const docenteCurso = document
    .getElementById("docente-curso-nuevo")
    .value.trim();
  const precioCurso = document
    .getElementById("precio-curso-nuevo")
    .value.trim();
  const imagenCurso = document.getElementById("imagen-curso-nuevo").files[0];
  const rutaCurso = document.getElementById("ruta-curso-nuevo").value;
  const horasCurso = document.getElementById("horas-curso-nuevo").value.trim();

  if (
    nombreCurso &&
    docenteCurso &&
    precioCurso &&
    imagenCurso &&
    rutaCurso &&
    horasCurso
  ) {
    cursoNuevo = {
      nombre: nombreCurso,
      docente: docenteCurso,
      precio: parseFloat(precioCurso).toFixed(2),
      imagen: URL.createObjectURL(imagenCurso),
      ruta: rutaCurso,
      duracion: `${horasCurso} horas`,
      videos: [], // Lista de videos que se agregará en el siguiente paso
    };

    modalAgregarCurso.style.display = "none";
    modalAgregarVideos.style.display = "flex";

    // Limpiar el contenedor de videos (por si había algo previo)
    videosContainer.innerHTML = "";
  } else {
    alert("Por favor, complete todos los campos antes de continuar.");
  }
});

// Añadir un video al curso
agregarVideoBtn?.addEventListener("click", function () {
  const videoTitulo = document.getElementById("video-titulo").value.trim();
  const videoUrl = document.getElementById("video-url").value.trim();

  if (videoTitulo && videoUrl) {
    const videoModulo = cursoNuevo.videos.length + 1; // Asignar número de módulo automáticamente
    cursoNuevo.videos.push({
      modulo: videoModulo,
      titulo: videoTitulo,
      url: videoUrl,
    });

    // Mostrar el video agregado en el modal
    const videoElement = document.createElement("div");
    videoElement.classList.add("video-item");
    videoElement.innerHTML = `
            <p><strong>Módulo ${videoModulo}:</strong> ${videoTitulo} (${videoUrl})</p>
            <button class="btn-quitar-video" data-modulo="${videoModulo}">Quitar</button>
        `;
    videosContainer.appendChild(videoElement);

    // Limpiar los campos del formulario de video
    document.getElementById("video-titulo").value = "";
    document.getElementById("video-url").value = "";
  } else {
    alert("Por favor, complete el título y la URL del video.");
  }
});

// Eliminar video del curso
videosContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-quitar-video")) {
    const moduloAEliminar = event.target.getAttribute("data-modulo");
    cursoNuevo.videos = cursoNuevo.videos.filter(
      (video) => video.modulo != moduloAEliminar
    );

    // Eliminar el video del contenedor
    event.target.parentElement.remove();
  }
});

// Guardar el curso completo
guardarCursoFinal?.addEventListener("click", function () {
  if (cursoNuevo.videos.length === 0) {
    alert("Por favor, agregue al menos un video al curso.");
    return;
  }

  // Crear la tarjeta del curso
  const cursoCard = document.createElement("div");
  cursoCard.classList.add("curso-card");

  // Imagen del curso
  const imgCurso = document.createElement("img");
  imgCurso.src = cursoNuevo.imagen;
  imgCurso.alt = `Imagen del curso ${cursoNuevo.nombre}`;
  cursoCard.appendChild(imgCurso);

  // Nombre del curso
  const nombreCursoCard = document.createElement("h3");
  nombreCursoCard.textContent = cursoNuevo.nombre;
  cursoCard.appendChild(nombreCursoCard);

  // Detalles adicionales del curso
  const detallesCurso = document.createElement("p");
  detallesCurso.innerHTML = `
        <strong>Docente:</strong> ${cursoNuevo.docente}<br>
        <strong>Precio:</strong> S/${cursoNuevo.precio}<br>
        <strong>Ruta:</strong> ${cursoNuevo.ruta}<br>
        <strong>Duración:</strong> ${cursoNuevo.duracion}
    `;
  cursoCard.appendChild(detallesCurso);

  // Listado de videos
  const listaVideos = document.createElement("ul");
  cursoNuevo.videos.forEach((video) => {
    const videoItem = document.createElement("li");
    videoItem.textContent = `Módulo ${video.modulo}: ${video.titulo}`;
    listaVideos.appendChild(videoItem);
  });
  cursoCard.appendChild(listaVideos);

  // Botón "Insertar"
  const btnInsertar = document.createElement("button");
  btnInsertar.textContent = "Insertar";
  btnInsertar.classList.add("btn-insertar");
  btnInsertar.addEventListener("click", function () {
    alert(`¡Acción de insertar para el curso: ${cursoNuevo.nombre}!`);
  });
  cursoCard.appendChild(btnInsertar);

  // Añadir la tarjeta al contenedor de cursos
  cursosContainer.appendChild(cursoCard);

  // Limpiar y cerrar el modal de videos
  videosContainer.innerHTML = "";
  modalAgregarVideos.style.display = "none";

  // Limpiar la variable cursoNuevo
  cursoNuevo = { videos: [] };
});

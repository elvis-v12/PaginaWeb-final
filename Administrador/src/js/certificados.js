const BASE_Certi = "http://localhost:3000/api/datosCertificado"
let certificadoSeleccionado = null;

// Evento para manejar el clic en los botones de las categorías
document.querySelectorAll(".btn-categoria").forEach(function (button) {
  button.addEventListener("click", function () {
    // Ocultar todas las imágenes
    document
      .querySelectorAll(".galeria-imagenes .casillero")
      .forEach(function (image) {
        image.style.display = "none";
      });

    // Obtener la categoría seleccionada
    var categoria = this.getAttribute("data-categoria");

    // Mostrar las imágenes correspondientes a la categoría seleccionada
    document
      .querySelectorAll(".galeria-imagenes ." + categoria)
      .forEach(function (image) {
        image.style.display = "block";
      });
  });
});

// Por defecto, mostramos las imágenes de la categoría "niños"
document.querySelectorAll(".galeria-imagenes .ninos").forEach(function (image) {
  image.style.display = "block";
});

document.addEventListener("DOMContentLoaded", function () {
  const tablaEstadisticas = document.querySelector("#tabla-estadisticas tbody");
  const detallesCertificado = document.getElementById("detalles-certificado");
  const graficoCertificadosCanvas = document.createElement("canvas"); // Crear un canvas dinámicamente para el gráfico
  graficoCertificadosCanvas.id = "graficoCertificados"; // Asegurarse de tener un ID único
  document
    .querySelector("#certificates")
    .appendChild(graficoCertificadosCanvas); // Agregar al final de la sección principal

  // Cargar certificados desde la base de datos
  cargarCertificados();

  function cargarCertificados() {
    const enlace = new URL(`${BASE_Certi}/certificados`);

    fetch(enlace)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los certificados");
        return response.json();
      })
      .then((data) => {
        if (!tablaEstadisticas) {
          console.error("Elemento con ID 'tabla-estadisticas' no encontrado");
          return;
        }
        tablaEstadisticas.innerHTML = ""; // Limpiar el contenido previo

        data.forEach((certif) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${certif.estudiantes}</td>
            <td>${certif.cursos}</td>
            <td>${certif.examenes}</td>
            <td>${certif.fecha_emision}</td>
            <td><a href="${certif.url_certificado}" target="_blank">Ver Certificado</a></td>
            <td>${certif.estado}</td>
            <td>
              <button class="btn-accion" onclick="mostrarDetalles(${certif.id_certificado})">Ver Detalles</button>
            </td>
          `;
          tablaEstadisticas.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error en la carga de certificados: ", error.message);
      });
  }

  // Función para mostrar los detalles del certificado
  window.mostrarDetalles = function (id_certificado) {
    // Aquí puedes hacer otra llamada a la API para obtener los detalles del certificado específico
    const enlaceDetalles = new URL(`${BASE_Certi}/certificados/${id_certificado}`);

    fetch(enlaceDetalles)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los detalles del certificado");
        return response.json();
      })
      .then((detalles) => {
        document.getElementById("detalle-usuario").textContent = detalles.estudiantes;
        document.getElementById("detalle-curso").textContent = detalles.cursos;
        document.getElementById("detalle-fecha").textContent = detalles.fecha_emision;
        detallesCertificado.classList.remove("oculto");
      })
      .catch((error) => {
        console.error("Error al cargar los detalles del certificado: ", error.message);
      });
  };
});

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

  // Simulación de datos de certificados (esto debería venir de tu base de datos)
  const estadisticas = [
    {
      nombre: "Juan Pérez",
      curso: "Examen de HTML",
      fecha: "2024-10-01",
      tipo: "examen",
    },
    {
      nombre: "María López",
      curso: "Beca de Python",
      fecha: "2024-10-05",
      tipo: "beca",
    },
    {
      nombre: "Ana García",
      curso: "Examen de CSS",
      fecha: "2024-10-10",
      tipo: "examen",
    },
  ];

  // Cargar estadísticas en la tabla
  estadisticas.forEach((usuario) => {
    const fila = tablaEstadisticas.insertRow();
    fila.insertCell(0).textContent = usuario.nombre;
    fila.insertCell(1).textContent = usuario.curso;
    fila.insertCell(2).textContent = usuario.fecha;

    const accionesCell = fila.insertCell(3);
    const verBtn = document.createElement("button");
    verBtn.textContent = "Ver Detalles";
    verBtn.className = "btn-accion";
    verBtn.onclick = () => mostrarDetalles(usuario);
    accionesCell.appendChild(verBtn);
  });

  // Función para mostrar los detalles del certificado
  function mostrarDetalles(usuario) {
    document.getElementById("detalle-usuario").textContent = usuario.nombre;
    document.getElementById("detalle-curso").textContent = usuario.curso;
    document.getElementById("detalle-fecha").textContent = usuario.fecha;
    detallesCertificado.classList.remove("oculto");
  }
});

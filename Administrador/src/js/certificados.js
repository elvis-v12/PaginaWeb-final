const BASE_Certi = "http://localhost:3000/api/datosCertificado";
let certificadoSeleccionado = null;

document.addEventListener("DOMContentLoaded", function () {
    const tablaEstadisticas = document.querySelector("#tabla-estadisticas tbody");
    const detallesCertificado = document.getElementById("detalles-certificado");
    const galeriaImagenes = document.getElementById("galeria-imagenes");

    // Cargar certificados desde la base de datos
    cargarCertificados();

    function cargarCertificados() {
        const baseUrl = "http://localhost:3000"; // Base URL del servidor
        const enlace = new URL(`${BASE_Certi}/certificados`);

        fetch(enlace)
            .then((response) => {
                if (!response.ok) throw new Error("Error al cargar los certificados");
                return response.json();
            })
            .then((data) => {
                console.log("Datos de certificados cargados:", data);
                tablaEstadisticas.innerHTML = ""; // Limpiar el contenido previo
                galeriaImagenes.innerHTML = ""; // Limpiar galería

                data.forEach((certif) => {
                    console.log("Certificado individual:", certif);

                    // Construir URL completa para el certificado
                    const certificadoUrl = `${baseUrl}${certif.url_certificado}`;

                    // Agregar fila a la tabla
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${certif.estudiantes}</td>
                        <td>${certif.cursos}</td>
                        <td>${new Date(certif.fecha_emision).toLocaleDateString()}</td>
                        <td>
                            <button class="btn-accion" onclick="mostrarDetalles(${certif.id_certificado})">Ver Detalles</button>
                        </td>
                    `;
                    tablaEstadisticas.appendChild(tr);

                    // Agregar imagen a la galería
                    const div = document.createElement("div");
                    div.className = "casillero";
                    div.innerHTML = `
                        <img src="${certificadoUrl}" alt="Certificado de ${certif.estudiantes}" onerror="this.onerror=null;this.src='/public/img/default.png';" />
                        <p>${certif.estudiantes}</p>
                    `;
                    galeriaImagenes.appendChild(div);
                });
            })
            .catch((error) => {
                console.error("Error en la carga de certificados:", error.message);
            });
    }

    // Función para mostrar los detalles del certificado
    window.mostrarDetalles = function (id_certificado) {
      console.log("ID del certificado seleccionado:", id_certificado);
  
      if (!id_certificado) {
          console.error("ID del certificado no proporcionado o inválido");
          return; // Evitar continuar si no hay ID
      }
  
      const enlaceDetalles = new URL(`${BASE_Certi}/certificados/${id_certificado}`);
  
      fetch(enlaceDetalles)
          .then((response) => {
              if (!response.ok) throw new Error("Error al cargar los detalles del certificado");
              return response.json();
          })
          .then((detalles) => {
              console.log("Detalles del certificado:", detalles);
  
              // Actualizar los detalles en la sección
              document.getElementById("detalle-usuario").textContent = detalles.estudiantes;
              document.getElementById("detalle-curso").textContent = detalles.cursos;
              document.getElementById("detalle-fecha").textContent = new Date(detalles.fecha_emision).toLocaleDateString();
  
              // Mostrar el contenedor de detalles
              const detallesCertificado = document.getElementById("detalles-certificado");
              detallesCertificado.classList.remove("oculto");
  
              // Actualizar la galería de imágenes
              const galeriaImagenes = document.getElementById("galeria-imagenes");
              galeriaImagenes.innerHTML = ""; // Limpiar imágenes anteriores
  
              const certificadoUrl = `http://localhost:3000${detalles.url_certificado}`;
              console.log("URL del certificado:", certificadoUrl);
  
              const img = document.createElement("img");
              img.src = certificadoUrl;
              img.alt = `Certificado de ${detalles.estudiantes}`;
              img.onerror = () => console.error(`Error al cargar la imagen: ${certificadoUrl}`);
  
              const div = document.createElement("div");
              div.className = "casillero";
              div.appendChild(img);
              div.innerHTML += `<p>${detalles.estudiantes}</p>`;
              galeriaImagenes.appendChild(div);
          })
          .catch((error) => {
              console.error("Error al cargar los detalles del certificado:", error.message);
          });
  };
  
    // Agregar evento para ocultar los detalles al hacer clic fuera del área
    document.addEventListener("click", function (event) {
        if (!detallesCertificado.contains(event.target) && !detallesCertificado.classList.contains("oculto")) {
            detallesCertificado.classList.add("oculto");
        }
    });
});

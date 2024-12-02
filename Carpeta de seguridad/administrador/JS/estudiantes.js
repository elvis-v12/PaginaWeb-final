document.addEventListener("DOMContentLoaded", cargarEstudiantes);

const BASE_URL = "http://localhost:5000"; // URL base del servidor

// Cargar todos los estudiantes en la tabla
function cargarEstudiantes() {
  fetch(`${BASE_URL}/estudiantes`)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tabla-estudiantes tbody");
      tbody.innerHTML = ""; // Limpiar tabla

      data.forEach((estudiante) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${estudiante.id_usuario}</td>
          <td>${estudiante.nombre}</td>
          <td>${estudiante.email}</td>
          <td>${new Date(estudiante.fecha_registro).toLocaleDateString()}</td>
          <td>
            <button class="btn-ver-estudiante" onclick="abrirModalEstudiante(${
              estudiante.id_usuario
            }, '${estudiante.nombre}', '${estudiante.email}', '${
          estudiante.contrasena
        }', '${estudiante.foto_perfil}', '${estudiante.telefono}', '${
          estudiante.fecha_registro
        }', '${estudiante.id_suscripcion}', '${estudiante.id_estado}', ${
          estudiante.verificado
        })">
              Ver
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error al cargar los estudiantes:", error));
}

// Mostrar modal con detalles del estudiante
function abrirModalEstudiante(
  id,
  nombre,
  email,
  contrasena,
  foto_perfil,
  telefono,
  fecha_registro,
  id_suscripcion,
  id_estado,
  verificado
) {
  const modal = document.getElementById("modal-estudiante");
  modal.querySelector("#modal-estudiante-id").textContent = id;
  modal.querySelector("#modal-estudiante-nombre").textContent = nombre;
  modal.querySelector("#modal-estudiante-email").textContent = email;
  modal.querySelector("#modal-estudiante-contrasena").textContent = contrasena;
  modal.querySelector("#modal-estudiante-telefono").textContent =
    telefono || "N/A";
  modal.querySelector("#modal-estudiante-fecha").textContent = new Date(
    fecha_registro
  ).toLocaleDateString();
  modal.querySelector("#modal-estudiante-suscripcion").textContent =
    id_suscripcion || "N/A";
  modal.querySelector("#modal-estudiante-estado").textContent =
    id_estado === "1" ? "Activo" : "Inactivo";
  modal.querySelector("#modal-estudiante-verificado").textContent = verificado
    ? "Sí"
    : "No";
  modal.querySelector("#modal-estudiante-foto").src =
    foto_perfil || "img/avatar_placeholder.png";

  modal.style.display = "flex";
}

// Cerrar modal
function cerrarModalEstudiante() {
  document.getElementById("modal-estudiante").style.display = "none";
}

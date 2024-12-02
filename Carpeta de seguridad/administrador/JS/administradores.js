document.addEventListener("DOMContentLoaded", cargarAdministradores);

const BASE_URL = "http://localhost:5000"; // URL base del servidor
let administradorSeleccionado = null; // ID del administrador seleccionado para editar

// Cargar todos los administradores en la tabla
function cargarAdministradores() {
  fetch(`${BASE_URL}/administradores`)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tabla-administradores tbody");
      tbody.innerHTML = ""; // Limpiar tabla

      data.forEach((admin) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${admin.id}</td>
          <td>${admin.nombres}</td>
          <td>${admin.correo}</td>
          <td>${admin.rol}</td>
          <td>${admin.estado}</td>
          <td>${new Date(admin.fecha_registro).toLocaleDateString()}</td>
          <td>
            <button onclick="abrirModalEditar(${admin.id}, '${
          admin.nombres
        }', '${admin.correo}', '${admin.rol}', '${
          admin.estado
        }')">Editar</button>
            <button onclick="desactivarAdministrador(${
              admin.id
            })">Desactivar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(() =>
      mostrarModalMensaje(
        "Error",
        "Error al cargar los administradores",
        "error"
      )
    );
}

// Abrir modal para insertar administrador
function abrirModalInsertar() {
  document.getElementById("modal-insertar").style.display = "block";
}

// Cerrar modal para insertar
function cerrarModalInsertar() {
  document.getElementById("modal-insertar").style.display = "none";
}

// Manejar formulario de insertar administrador
document
  .getElementById("form-insertar-administrador")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const nombres = document.getElementById("nombres-insertar").value.trim();
    const correo = document.getElementById("correo-insertar").value.trim();
    const rol_id = document.getElementById("rol-id-insertar").value.trim();

    if (!nombres || !correo || !rol_id) {
      mostrarModalMensaje(
        "Advertencia",
        "Todos los campos son obligatorios",
        "warning"
      );
      return;
    }

    fetch(`${BASE_URL}/administradores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombres, correo, rol_id, estado: "Activo" }),
    })
      .then((response) => {
        if (response.ok) {
          mostrarModalMensaje(
            "Éxito",
            "Administrador insertado correctamente",
            "success"
          );
          cargarAdministradores();
          cerrarModalInsertar();
        } else {
          mostrarModalMensaje(
            "Error",
            "Error al insertar administrador",
            "error"
          );
        }
      })
      .catch(() =>
        mostrarModalMensaje("Error", "Error al insertar administrador", "error")
      );
  });

// Abrir modal para editar administrador
function abrirModalEditar(id, nombres, correo, rol, estado) {
  administradorSeleccionado = id; // Guardar ID del administrador

  // Prellenar los campos del modal con los datos actuales
  document.getElementById("nombres-editar").value = nombres;
  document.getElementById("correo-editar").value = correo;
  document.getElementById("rol-id-editar").value = rol;
  document.getElementById("estado-editar").value = estado;

  document.getElementById("modal-editar").style.display = "block";
}

// Cerrar modal de editar
function cerrarModalEditar() {
  document.getElementById("modal-editar").style.display = "none";
}

// Manejar formulario de editar administrador
document
  .getElementById("form-editar-administrador")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const nombres = document.getElementById("nombres-editar").value.trim();
    const correo = document.getElementById("correo-editar").value.trim();
    const rol_id = document.getElementById("rol-id-editar").value.trim();
    const estado = document.getElementById("estado-editar").value.trim();

    if (!nombres || !correo || !rol_id || !estado) {
      mostrarModalMensaje(
        "Advertencia",
        "Todos los campos son obligatorios",
        "warning"
      );
      return;
    }

    fetch(`${BASE_URL}/administradores/${administradorSeleccionado}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombres, correo, rol_id, estado }),
    })
      .then((response) => {
        if (response.ok) {
          mostrarModalMensaje(
            "Éxito",
            "Administrador actualizado correctamente",
            "success"
          );
          cargarAdministradores();
          cerrarModalEditar();
        } else {
          mostrarModalMensaje(
            "Error",
            "Error al actualizar administrador",
            "error"
          );
        }
      })
      .catch(() =>
        mostrarModalMensaje(
          "Error",
          "Error al actualizar administrador",
          "error"
        )
      );
  });

// Desactivar (eliminar lógicamente) un administrador
function desactivarAdministrador(id) {
  fetch(`${BASE_URL}/administradores/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        mostrarModalMensaje(
          "Éxito",
          "Administrador desactivado correctamente",
          "success"
        );
        cargarAdministradores();
      } else {
        mostrarModalMensaje(
          "Error",
          "Error al desactivar administrador",
          "error"
        );
      }
    })
    .catch(() =>
      mostrarModalMensaje(
        "Error",
        "Error al realizar la solicitud de desactivación",
        "error"
      )
    );
}

// Mostrar modal de mensaje con opciones dinámicas
function mostrarModalMensaje(titulo, mensaje, tipo = "info") {
  const modaladmin = document.getElementById("modal-mensaje");
  const modalTitulo = document.getElementById("modal-mensaje-titulo");
  const modalTexto = document.getElementById("modal-mensaje-texto");
  const modalIcono = document.getElementById("modal-mensaje-icono");

  modalTitulo.textContent = titulo;
  modalTexto.textContent = mensaje;

  // Configurar el icono según el tipo
  if (tipo === "success") {
    modalIcono.innerHTML =
      '<i class="bx bx-check-circle" style="color: #28a745;"></i>';
  } else if (tipo === "error") {
    modalIcono.innerHTML =
      '<i class="bx bx-x-circle" style="color: #dc3545;"></i>';
  } else if (tipo === "warning") {
    modalIcono.innerHTML =
      '<i class="bx bx-error-circle" style="color: #ffc107;"></i>';
  } else {
    modalIcono.innerHTML =
      '<i class="bx bx-info-circle" style="color: #007bff;"></i>';
  }

  // Mostrar el modal
  modaladmin.style.display = "flex";
}

// Cerrar el modal de mensaje
function cerrarModalMensaje() {
  document.getElementById("modal-mensaje").style.display = "none";
}
let administradores = []; // Almacenar todos los administradores
let paginaActual = 1; // Página actual
const itemsPorPagina = 7; // Número de elementos por página

// Modifica cargarAdministradores para soportar paginación
function cargarAdministradores() {
  fetch(`${BASE_URL}/administradores`)
    .then((response) => response.json())
    .then((data) => {
      administradores = data; // Guarda todos los datos
      mostrarPagina(1); // Muestra la primera página
    })
    .catch(() =>
      mostrarModalMensaje(
        "Error",
        "Error al cargar los administradores",
        "error"
      )
    );
}

// Mostrar los datos de la página actual
function mostrarPagina(pagina) {
  const tbody = document.querySelector("#tabla-administradores tbody");
  tbody.innerHTML = ""; // Limpia la tabla
  const inicio = (pagina - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;

  const paginaDatos = administradores.slice(inicio, fin); // Filtrar datos por página

  paginaDatos.forEach((admin) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${admin.id}</td>
      <td>${admin.nombres}</td>
      <td>${admin.correo}</td>
      <td>${admin.rol}</td>
      <td>${admin.estado}</td>
      <td>${new Date(admin.fecha_registro).toLocaleDateString()}</td>
      <td>
        <button onclick="abrirModalEditar(${admin.id}, '${admin.nombres}', '${
      admin.correo
    }', '${admin.rol}', '${admin.estado}')">Editar</button>
        <button onclick="desactivarAdministrador(${
          admin.id
        })">Desactivar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  actualizarPaginacion(); // Actualiza la paginación
}

// Actualizar la barra de paginación
function actualizarPaginacion() {
  const totalPaginas = Math.ceil(administradores.length / itemsPorPagina);
  const paginacionContainer = document.getElementById("paginacion");
  paginacionContainer.innerHTML = ""; // Limpia los botones

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement("button");
    boton.textContent = i;
    boton.classList.add("pagina-boton");
    if (i === paginaActual) {
      boton.classList.add("activo");
    }
    boton.addEventListener("click", () => {
      paginaActual = i;
      mostrarPagina(i);
    });
    paginacionContainer.appendChild(boton);
  }
}
function descargarReporte() {
  // Aquí puedes implementar la lógica para descargar el reporte
  alert("Descargando reporte...");
}
// Agrega un contenedor para la paginación en el HTML
document.addEventListener("DOMContentLoaded", () => {
  const adminContainer = document.querySelector(".admin-container");
  const paginacionContainer = document.createElement("div");
  paginacionContainer.id = "paginacion";
  paginacionContainer.classList.add("paginacion-container");
  adminContainer.appendChild(paginacionContainer);
});

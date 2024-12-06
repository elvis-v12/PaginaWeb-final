document.addEventListener("DOMContentLoaded", cargarAdministradores);

const BASE_URL = "http://localhost:3000/api/datosAdmin";
let administradorSeleccionado = null; // ID del administrador seleccionado para editar

// Cargar todos los administradores en la tabla
function cargarAdministradores() {
  fetch(`${BASE_URL}/administradores`)
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar los administradores");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#tabla-administradores tbody");
      if (!tbody) {
        console.error("Elemento con ID 'tabla-administradores' no encontrado");
        return;
      }
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
            <button onclick="abrirModalEditar(${admin.id}, '${admin.nombres}', '${admin.correo}', '${admin.rol}', '${admin.estado}')">Editar</button>
            <button onclick="desactivarAdministrador(${admin.id})">Desactivar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      mostrarModalMensaje("Error", error.message, "error");
    });
}

// Abrir modal para insertar administrador
function abrirModalInsertar() {
  const modal = document.getElementById("modal-insertar");
  if (!modal) {
    console.error("Modal de insertar no encontrado");
    return;
  }
  modal.style.display = "block";
}

// Cerrar modal para insertar
function cerrarModalInsertar() {
  const modal = document.getElementById("modal-insertar");
  if (!modal) {
    console.error("Modal de insertar no encontrado");
    return;
  }
  modal.style.display = "none";
}

// Manejar formulario de insertar administrador
document.getElementById("form-insertar-administrador")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombres = document.getElementById("nombres-insertar").value.trim();
  const correo = document.getElementById("correo-insertar").value.trim();
  const rol_id = document.getElementById("rol-id-insertar").value.trim();

  if (!nombres || !correo || !rol_id) {
    mostrarModalMensaje("Advertencia", "Todos los campos son obligatorios", "warning");
    return;
  }

  fetch(`${BASE_URL}/administradores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombres, correo, rol_id, estado: "Activo" }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al insertar administrador");
      return response.json();
    })
    .then(() => {
      mostrarModalMensaje("Éxito", "Administrador insertado correctamente", "success");
      cargarAdministradores();
      cerrarModalInsertar();
    })
    .catch((error) => {
      mostrarModalMensaje("Error", error.message, "error");
    });
});

// Abrir modal para editar administrador
function abrirModalEditar(id, nombres, correo, rol, estado) {
  administradorSeleccionado = id;

  document.getElementById("nombres-editar").value = nombres || "";
  document.getElementById("correo-editar").value = correo || "";
  document.getElementById("rol-id-editar").value = rol || "";
  document.getElementById("estado-editar").value = estado || "";

  document.getElementById("modal-editar").style.display = "block";
}

// Cerrar modal de editar
function cerrarModalEditar() {
  document.getElementById("modal-editar").style.display = "none";
}

// Manejar formulario de editar administrador
document.getElementById("form-editar-administrador")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombres = document.getElementById("nombres-editar").value.trim();
  const correo = document.getElementById("correo-editar").value.trim();
  const rol_id = document.getElementById("rol-id-editar").value.trim();
  const estado = document.getElementById("estado-editar").value.trim();

  if (!nombres || !correo || !rol_id || !estado) {
    mostrarModalMensaje("Advertencia", "Todos los campos son obligatorios", "warning");
    return;
  }

  fetch(`${BASE_URL}/administradores/${administradorSeleccionado}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombres, correo, rol_id, estado }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al actualizar administrador");
      return response.json();
    })
    .then(() => {
      mostrarModalMensaje("Éxito", "Administrador actualizado correctamente", "success");
      cargarAdministradores();
      cerrarModalEditar();
    })
    .catch((error) => {
      mostrarModalMensaje("Error", error.message, "error");
    });
});

// Desactivar (lógicamente) un administrador
function desactivarAdministrador(id) {
  fetch(`${BASE_URL}/administradores/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al desactivar administrador");
      return response.json();
    })
    .then(() => {
      mostrarModalMensaje("Éxito", "Administrador desactivado correctamente", "success");
      cargarAdministradores();
    })
    .catch((error) => {
      mostrarModalMensaje("Error", error.message, "error");
    });
}

// Mostrar modal de mensaje con opciones dinámicas
function mostrarModalMensaje(titulo, mensaje, tipo = "info") {
  const modaladmin = document.getElementById("modal-mensaje");
  if (!modaladmin) {
    console.error("Modal de mensaje no encontrado");
    return;
  }

  document.getElementById("modal-mensaje-titulo").textContent = titulo;
  document.getElementById("modal-mensaje-texto").textContent = mensaje;

  const modalIcono = document.getElementById("modal-mensaje-icono");
  modalIcono.innerHTML = {
    success: '<i class="bx bx-check-circle" style="color: #28a745;"></i>',
    error: '<i class="bx bx-x-circle" style="color: #dc3545;"></i>',
    warning: '<i class="bx bx-error-circle" style="color: #ffc107;"></i>',
  }[tipo] || '<i class="bx bx-info-circle" style="color: #007bff;"></i>';

  modaladmin.style.display = "flex";
}

// Cerrar modal de mensaje
function cerrarModalMensaje() {
  const modal = document.getElementById("modal-mensaje");
  if (!modal) {
    console.error("Modal de mensaje no encontrado");
    return;
  }
  modal.style.display = "none";
}

// Configuración de paginación
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
        <button onclick="abrirModalEditar(${admin.id}, '${admin.nombres}', '${admin.correo}', '${admin.rol}', '${admin.estado}')">Editar</button>
        <button onclick="desactivarAdministrador(${admin.id})">Desactivar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  actualizarPaginacion();
}

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





// Agrega un contenedor para la paginación en el HTML
document.addEventListener("DOMContentLoaded", () => {
  const adminContainer = document.querySelector(".admin-container");
  const paginacionContainer = document.createElement("div");
  paginacionContainer.id = "paginacion";
  paginacionContainer.classList.add("paginacion-container");
  adminContainer.appendChild(paginacionContainer);
});



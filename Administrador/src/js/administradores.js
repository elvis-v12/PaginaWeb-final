document.addEventListener("DOMContentLoaded", cargarAdministradores);

const BASE_URL = "http://localhost:3000/api/datosAdmin";
let administradorSeleccionado = null; // ID del administrador seleccionado para editar

// Cargar todos los administradores en la tabla
function cargarAdministradores() {
  const rol = document.querySelector(".filter-container select:nth-child(1)").value;
  const estado = document.querySelector(".filter-container select:nth-child(2)").value;

  const url = new URL(`${BASE_URL}/administradores`);
  if (rol !== "all") url.searchParams.append("rol", rol);
  if (estado !== "all") url.searchParams.append("estado", estado);

  fetch(url)
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

// Actualiza la tabla cuando cambian los filtros
document.querySelectorAll(".filter-container select").forEach((select) => {
  select.addEventListener("change", cargarAdministradores);
});


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

async function descargarReporte() {
  const { jsPDF } = window.jspdf;

  // Crear instancia de jsPDF
  const doc = new jsPDF();

  const fechaActual = new Date();
  const fecha = fechaActual.toLocaleDateString(); // Ejemplo: 05/12/2024
  const hora = fechaActual.toLocaleTimeString(); // Ejemplo: 14:35:00

  const title = "LEARNLY";

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.text(title, 105, 20, { align: "center" });

  // Subtítulo con fecha y hora
  doc.setFontSize(12);
  doc.setFont("Helvetica", "italic");
  doc.setTextColor(100);
  doc.text(`Reporte generado el ${fecha} a las ${hora}`, 105, 30, {
    align: "center",
  });

  // Línea secundaria
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 35, 190, 35);

  try {
    // Asegúrate de definir BASE_URL o remplazarlo con la URL real
    const response = await fetch(`${BASE_URL}/administradores`);
    const administradores = await response.json();

    const encabezados = [
      ["ID", "Nombres", "Correo", "Rol", "Estado", "Fecha de Registro"],
    ];
    const filas = administradores.map((admin) => [
      admin.id,
      admin.nombres,
      admin.correo,
      admin.rol,
      admin.estado,
      new Date(admin.fecha_registro).toLocaleDateString(),
    ]);

    // Verifica que autoTable esté disponible
    if (doc.autoTable) {
      doc.autoTable({
        head: encabezados,
        body: filas,
        startY: 40,
        styles: {
          fontSize: 10,
          font: "Helvetica",
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [5, 14, 26], // Color de fondo encabezado de tabla
          textColor: [255, 255, 255],
          fontSize: 11,
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 40 },
      });
    } else {
      throw new Error("El plugin autoTable no está disponible.");
    }

    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
    }

    // Descargar el PDF
    doc.save("reporte_administradores_corporativo.pdf");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    mostrarModalMensaje("Error", "No se pudo descargar el reporte", "error");
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



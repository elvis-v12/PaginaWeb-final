
/* Seleccionamos todos los botones de descarga
document.querySelectorAll(".download-btn_be").forEach(button => {
  button.addEventListener("click", function () {
    // Seleccionamos el enlace invisible para la descarga
    const link = document.getElementById("download-linkss");

    // Hacemos clic en el enlace para iniciar la descarga
    link.click();
  });
});

// Esperar que el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
  const botonDescarga = document.querySelector(".descargarreportebecas"); // El botón para descargar el reporte

  botonDescarga.addEventListener("click", function () {
    // Seleccionar la tabla y las filas (maximo 7)
    const tabla = document.getElementById("tabla-administradores");
    const filas = tabla.querySelectorAll("tbody tr");

    // Limitar a 7 filas
    const filasLimitadas = Array.from(filas).slice(0, 7);

    // Crear un array de objetos con los datos de la tabla
    const datos = [];
    filasLimitadas.forEach(fila => {
      const celdas = fila.querySelectorAll("td");
      const filaDatos = {
        DNI: celdas[0].textContent,
        Nombre: celdas[1].textContent,
        Fecha: celdas[2].textContent,
        Curso: celdas[3].textContent,
        Nivel: celdas[4].textContent,
        Estado: celdas[5].textContent
      };
      datos.push(filaDatos);
    });

    // Usar SheetJS para crear el archivo Excel
    const wb = XLSX.utils.book_new(); // Crear un nuevo libro de trabajo
    const ws = XLSX.utils.json_to_sheet(datos); // Convertir los datos a una hoja de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Reporte"); // Agregar la hoja al libro
    XLSX.writeFile(wb, "Reporte_Solicitudes_Becas.xlsx"); // Descargar el archivo Excel
  });
});*/

// Variable global para almacenar los datos de las postulaciones
let datosPostulaciones = [];

async function cargarPostulaciones() {
  try {
    const response = await fetch('http://localhost:3000/api/becas/listar');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    // Accedemos al arreglo dentro de `data`
    const data = result.data;

    // Validamos si `data` es un arreglo
    if (!Array.isArray(data)) {
      throw new Error("La respuesta del servidor no contiene un arreglo en 'data'.");
    }

    // Guardamos los datos en la variable global
    datosPostulaciones = data;

    const tbody = document.querySelector("#tabla-becas tbody");
    if (!tbody) {
      throw new Error("No se encontró el elemento tbody en el DOM.");
    }

    tbody.innerHTML = ""; // Limpia la tabla antes de agregar contenido.

    // Recorremos los datos y los insertamos en la tabla
    datosPostulaciones.forEach(postulacion => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${postulacion.dni}</td>
        <td>${postulacion.nombre}</td>
        <td>${postulacion.correo}</td>
        <td>${new Date(postulacion.fecha).toLocaleDateString()}</td>
        <td>${postulacion.id_categoria}</td>
        <td>${postulacion.estado}</td>
        <td>
          <button class="settings-btn" onclick="mostrarDetalles('${postulacion.dni}')">
            <i class="fa fa-info-circle"></i> Más detalles
          </button>
          <button class="settings-btn" onclick="editarBeca('${postulacion.dni}')">
            <i class="fa fa-edit"></i> Editar
          </button>
          <button class="settings-btn">
            <i class="fa fa-download"></i> Descargar
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al cargar las postulaciones:", error);
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarPostulaciones();
});






// Función para mostrar detalles
function mostrarDetalles(dni) {
  // Busca los datos en la tabla ya cargada
  const postulacion = datosPostulaciones.find(post => post.dni === dni);
  
  if (postulacion) {
    // Rellena los campos del modal
    document.getElementById("detail-dni").textContent = postulacion.dni;
    document.getElementById("detail-nombre").textContent = postulacion.nombre;
    document.getElementById("detail-correo").textContent = postulacion.correo;
    document.getElementById("detail-fecha").textContent = new Date(postulacion.fecha).toLocaleDateString();
    document.getElementById("detail-categoria").textContent = postulacion.id_categoria;
    document.getElementById("detail-motivo").textContent = postulacion.motivo;
    document.getElementById("detail-estado-certificado").textContent = postulacion.estado;
    document.getElementById("detail-nivel").textContent = postulacion.nivel;

    // Muestra el modal
    document.getElementById("beca-details").classList.remove("hidden");
  }
}

// Función para cerrar el modal de detalles
function cerrarDetalles() {
  document.getElementById("beca-details").classList.add("hidden");
}











// Función para abrir el modal de edición
function editarBeca(dni) {
  const postulacion = datosPostulaciones.find(post => post.dni === dni);

  if (postulacion) {
    // Rellena los campos del formulario
    document.getElementById("edit-nombre").value = postulacion.nombre;
    document.getElementById("edit-correo").value = postulacion.correo;
    document.getElementById("edit-estado-certificado").value = postulacion.estado.toLowerCase();

    // Guarda el DNI actual en un atributo para usar al guardar cambios
    document.getElementById("beca-edit-form").setAttribute("data-dni", postulacion.dni);

    // Muestra el modal
    document.getElementById("beca-edit-modal").classList.remove("hidden");
  }
}

// Función para cerrar el modal de edición
function cerrarEdicion() {
  document.getElementById("beca-edit-modal").classList.add("hidden");
}







// Maneja el envío del formulario de edición
document.getElementById("beca-edit-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const dni = e.target.getAttribute("data-dni");
  const nombre = document.getElementById("edit-nombre").value.trim();
  const correo = document.getElementById("edit-correo").value.trim();
  const estado = document.getElementById("edit-estado-certificado").value.trim();

  // Validación básica para asegurarse de que los campos no estén vacíos
  if (!nombre || !correo || !estado) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Verifica el formato del correo antes de enviarlo
  const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!regexCorreo.test(correo)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }

  // Realiza la solicitud PUT para actualizar la beca
  fetch(`http://localhost:3000/api/becas/editar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dni, nombre, correo, estado }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al actualizar la beca.");
      }
      return response.json();
    })
    .then(data => {
      console.log("Beca actualizada:", data);

      // Actualiza la tabla localmente sin recargar la página
      const postulacion = datosPostulaciones.find(post => post.dni === dni);
      if (postulacion) {
        postulacion.nombre = nombre;
        postulacion.correo = correo;
        postulacion.estado = estado.charAt(0).toUpperCase() + estado.slice(1); // Capitaliza la primera letra
      }

      // Refresca la tabla
      cargarPostulaciones();

      // Cierra el modal
      cerrarEdicion();
    })
    .catch(error => {
      console.error("Error al editar la beca:", error);
      alert("Hubo un problema al actualizar la beca. Por favor, inténtelo de nuevo.");
    });
});




// Escuchar eventos para los filtros
document.getElementById("busqueda_becas").addEventListener("input", aplicarFiltros);
document.getElementById("nivel_becas").addEventListener("change", aplicarFiltros);
document.getElementById("estado_certificado").addEventListener("change", aplicarFiltros);

// Función para aplicar los filtros
function aplicarFiltros() {
  const busqueda = document.getElementById("busqueda_becas").value.toLowerCase();
  const nivel = document.getElementById("nivel_becas").value.toLowerCase();
  const estado = document.getElementById("estado_certificado").value.toLowerCase();

  // Filtra los datos en función de los valores de los filtros
  const datosFiltrados = datosPostulaciones.filter(postulacion => {
    // Filtrar por búsqueda (nombre, correo, dni)
    const matchesBusqueda = postulacion.nombre.toLowerCase().includes(busqueda) || 
                            postulacion.correo.toLowerCase().includes(busqueda) || 
                            postulacion.dni.toLowerCase().includes(busqueda);

    // Filtrar por nivel (convertimos todo a minúsculas para comparar sin importar mayúsculas/minúsculas)
    const matchesNivel = nivel === 'nivel' || postulacion.nivel.toLowerCase() === nivel;

    // Filtrar por estado (convertimos todo a minúsculas para comparar sin importar mayúsculas/minúsculas)
    const matchesEstado = estado === 'estado' || postulacion.estado.toLowerCase() === estado;

    // Devuelve true si pasa todas las comprobaciones
    return matchesBusqueda && matchesNivel && matchesEstado;
  });

  // Actualizar la tabla con los datos filtrados
  mostrarPostulaciones(datosFiltrados);
}

// Función para mostrar las postulaciones filtradas en la tabla
function mostrarPostulaciones(datos) {
  const tbody = document.querySelector("#tabla-becas tbody");
  tbody.innerHTML = ""; // Limpia la tabla

  // Recorre las postulaciones filtradas y las agrega a la tabla
  datos.forEach(postulacion => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${postulacion.dni}</td>
      <td>${postulacion.nombre}</td>
      <td>${postulacion.correo}</td>
      <td>${new Date(postulacion.fecha).toLocaleDateString()}</td>
      <td>${postulacion.id_categoria}</td>
      <td>${postulacion.estado}</td>
      <td>
        <button class="settings-btn" onclick="mostrarDetalles('${postulacion.dni}')">
          <i class="fa fa-info-circle"></i> Más detalles
        </button>
        <button class="settings-btn" onclick="editarBeca('${postulacion.dni}')">
          <i class="fa fa-edit"></i> Editar
        </button>
        <button class="settings-btn">
          <i class="fa fa-download"></i> Descargar
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Llamar a esta función para cargar las postulaciones al inicio
cargarPostulaciones();

document.getElementById("form-ruta").addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar valores del formulario
  const nombreRuta = document.getElementById("nombre-ruta").value;
  const descripcionRuta = document.getElementById("descripcion-ruta").value;
  const cursoSeleccionado = document.getElementById("seccion-select").value;

  // Validar que se haya seleccionado un curso
  if (!cursoSeleccionado) {
    alert("Por favor, selecciona un curso.");
    return;
  }

  // Crear una nueva fila para la tabla
  const tableBody = document.querySelector("#tabla-rutas tbody");
  const newRow = document.createElement("tr");

  // Crear celdas
  const nombreCell = document.createElement("td");
  nombreCell.textContent = nombreRuta;

  const descripcionCell = document.createElement("td");
  descripcionCell.textContent = descripcionRuta;

  const cursoCell = document.createElement("td");
  cursoCell.textContent = cursoSeleccionado;

  const accionesCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.className = "btn-eliminar";
  accionesCell.appendChild(deleteButton);

  // Agregar celdas a la fila
  newRow.appendChild(nombreCell);
  newRow.appendChild(descripcionCell);
  newRow.appendChild(cursoCell);
  newRow.appendChild(accionesCell);

  // Agregar fila a la tabla
  tableBody.appendChild(newRow);

  // Limpiar formulario
  document.getElementById("form-ruta").reset();

  // Evento para eliminar una fila
  deleteButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
});

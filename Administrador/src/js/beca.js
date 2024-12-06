
// Seleccionamos todos los botones de descarga
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
});
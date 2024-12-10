const STUDENTS_API_URL = "http://localhost:3000/api/estudiantes"; // Cambiar el nombre de la constante

 
document.addEventListener("DOMContentLoaded", () => {
  cargarEstudiantes();
});

// Función para cargar estudiantes desde la API
function cargarEstudiantes() {
  fetch(STUDENTS_API_URL)
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar estudiantes");
      return response.json();
    })
    .then((data) => {
      renderTable(data);  
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

// Función para renderizar la tabla de estudiantes
function renderTable(students) {
  const tbody = document.querySelector("#students-table tbody");

  // Si no hay estudiantes, mostrar mensaje en la tabla
  if (!students || students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No hay estudiantes registrados.</td></tr>`;
    return;
  }

  // Generar las filas de la tabla
  tbody.innerHTML = students
    .map(
      (student) => `
        <tr>
          <td>${student.id_estudiante}</td>
          <td>${student.nombres}</td>
          <td>${student.correo}</td>
          <td>${new Date(student.fecha_registro).toLocaleDateString()}</td>
          <td>${student.cursos_inscritos || "N/A"}</td>
          <td><span class="status ${
            student.estado === "Activo" ? "active" : "inactive"
          }">${student.estado || "N/A"}</span></td>
          <td>
            <button class="btn-view" onclick="showDetails(${
              student.id_estudiante
            })">
              <i class="fa fa-eye"></i>
            </button>
          </td>
        </tr>`
    )
    .join(""); // Añadir las filas generadas al cuerpo de la tabla
}

// Función para mostrar los detalles del estudiante en el modal
function showDetails(id) {
  fetch(`${STUDENTS_API_URL}/${id}`) // Cambiar a STUDENTS_API_URL
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al obtener detalles del estudiante");
      return response.json();
    })
    .then((student) => {
      // Actualizar los datos en el modal
      document.getElementById("detail-id").innerText = student.id_estudiante;
      document.getElementById("detail-names").innerText = student.nombres;
      document.getElementById("detail-email").innerText = student.correo;
      document.getElementById("detail-birthdate").innerText =
        student.fecha_nacimiento || "N/A";
      document.getElementById("detail-phone").innerText =
        student.telefono || "N/A";
      document.getElementById("detail-address").innerText =
        student.direccion || "N/A";
      document.getElementById("detail-biography").innerText =
        student.biografia || "N/A";
      document.getElementById("detail-gender").innerText =
        student.genero || "N/A";
      document.getElementById("detail-age-range").innerText =
        student.rango_edad || "N/A";
      document.getElementById("detail-courses").innerHTML =
        student.cursos_inscritos
          ?.split(",")
          .map((curso) => `<li>${curso}</li>`)
          .join("") || "N/A";

      // Mostrar la imagen según el género
      const maleImg = document.getElementById("male-profile-img");
      const femaleImg = document.getElementById("female-profile-img");

      if (student.genero === "Masculino") {
        maleImg.classList.remove("hidden");
        femaleImg.classList.add("hidden");
      } else if (student.genero === "Femenino") {
        femaleImg.classList.remove("hidden");
        maleImg.classList.add("hidden");
      }

      // Mostrar el modal
      const details = document.querySelector(".student-details");
      details.classList.add("visible");
      details.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

document.getElementById("download-pdf-button").addEventListener("click", () => {
  const button = document.getElementById("download-pdf-button");
  const icon = button.querySelector("i");

   
  icon.classList.remove("fa-file-pdf");
  icon.classList.add("fa-spinner", "fa-spin");

   
  setTimeout(() => {
    icon.classList.remove("fa-spinner", "fa-spin");
    icon.classList.add("fa-file-pdf");

   
    console.log("PDF descargado");
  }, 2000);
});
async function descargarReporteEstudiantes() {
  const { jsPDF } = window.jspdf;

  // Crear instancia de jsPDF
  const doc = new jsPDF();

  // Agregar título y encabezado del reporte
  const fechaActual = new Date();
  const fecha = fechaActual.toLocaleDateString(); // Ejemplo: 10/12/2024
  const hora = fechaActual.toLocaleTimeString(); // Ejemplo: 14:45:00
  const title = "REPORTE DE ESTUDIANTES - LEARNLY";

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.text(title, 105, 20, { align: "center" });

  // Subtítulo con fecha y hora
  doc.setFontSize(12);
  doc.setFont("Helvetica", "italic");
  doc.setTextColor(100);
  doc.text(`Generado el ${fecha} a las ${hora}`, 105, 30, { align: "center" });

  // Línea decorativa
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 35, 190, 35);

  try {
 
    const response = await fetch(STUDENTS_API_URL);
    if (!response.ok)
      throw new Error("Error al cargar los datos de estudiantes.");
    const estudiantes = await response.json();

 
    const encabezados = [
      ["ID", "Nombres", "Correo", "Fecha Registro", "Cursos", "Estado"],
    ];
    const filas = estudiantes.map((estudiante) => [
      estudiante.id_estudiante,
      estudiante.nombres,
      estudiante.correo,
      new Date(estudiante.fecha_registro).toLocaleDateString(),
      estudiante.cursos_inscritos || "N/A",
      estudiante.estado || "N/A",
    ]);

    
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
          fillColor: [5, 14, 26], // Color de fondo del encabezado de la tabla
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

 
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
    }

 
    doc.save("reporte_estudiantes.pdf");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("No se pudo generar el reporte de estudiantes.");
  }
}

 
document.getElementById("download-pdf-button").addEventListener("click", () => {
  const button = document.getElementById("download-pdf-button");
  const icon = button.querySelector("i");

 
  icon.classList.remove("fa-file-pdf");
  icon.classList.add("fa-spinner", "fa-spin");

 
  descargarReporteEstudiantes()
    .then(() => {
  
      icon.classList.remove("fa-spinner", "fa-spin");
      icon.classList.add("fa-file-pdf");
    })
    .catch(() => {
      icon.classList.remove("fa-spinner", "fa-spin");
      icon.classList.add("fa-file-pdf");
    });
});


 
document.getElementById("close-details").addEventListener("click", () => {
  document.querySelector(".student-details").classList.add("hidden");
});

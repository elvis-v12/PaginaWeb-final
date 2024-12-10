const STUDENTS_API_URL = "http://localhost:3000/api/estudiantes"; // Cambiar el nombre de la constante

// Función principal para cargar estudiantes
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
      renderTable(data); // Renderizar la tabla con los datos obtenidos
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

// Cerrar el modal de detalles
document.getElementById("close-details").addEventListener("click", () => {
  document.querySelector(".student-details").classList.add("hidden");
});

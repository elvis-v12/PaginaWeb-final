// Datos simulados
const students = [
  {
    id: 1,
    nombres: "Brandon Roque",
    correo: "brandon@example.com",
    fechaRegistro: "2024-11-01",
    cursosInscritos: ["JavaScript", "CSS Avanzado"],
    estado: "Activo",
    fechaNacimiento: "2000-05-18",
    telefono: "123456789",
    direccion: "Calle 123",
    biografia: "Estudiante avanzado de tecnología",
    genero: "Masculino",
    rangoEdad: "Adultos",
  },
  {
    id: 2,
    nombres: "Fernanda Torres",
    correo: "ferd@example.com",
    fechaRegistro: "2024-11-01",
    cursosInscritos: ["JavaScript", "CSS Avanzado", "Html"],
    estado: "Activo",
    fechaNacimiento: "2000-08-10",
    telefono: "923456789",
    direccion: "Calle 103",
    biografia: "Estudiante",
    genero: "Femenino",
    rangoEdad: "Niños",
  }
];

// Renderizar tabla
const renderTable = () => {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = students
    .map(
      (student) => `
            <tr>
                <td>${student.id}</td>
                <td>${student.nombres}</td>
                <td>${student.correo}</td>
                <td>${student.fechaRegistro}</td>
                <td>${student.cursosInscritos.length}</td>
                <td><span class="status ${
                  student.estado === "Activo" ? "active" : "inactive"
                }">${student.estado}</span></td>
                <td><button class="btn-view" onclick="showDetails(${
                  student.id
                })"><i class="fa fa-eye"></i></button></td>
            </tr>`
    )
    .join("");
};

const searchButtonEstudiante = document.querySelector(
  ".form-input-estudiante button"
);
const searchButtonIconEstudiante = document.querySelector(
  ".form-input-estudiante button .bx"
);
const searchFormEstudiante = document.querySelector(".form-input-estudiante");
const searchInputEstudiante = document.querySelector(
  ".form-input-estudiante input"
);

// Expansión del input al enfocarse
searchInputEstudiante.addEventListener("focus", () => {
  searchInputEstudiante.style.transition = "all 0.3s ease";
  searchInputEstudiante.style.width = "130%"; // Expande hacia la izquierda
  searchInputEstudiante.style.marginLeft = "-10%"; // Movimiento hacia la izquierda
  searchInputEstudiante.style.borderColor = "#007bff"; // Cambia el borde a azul celeste
});

// Contracción del input al desenfocarse o al presionar el botón buscar
const resetInput = () => {
  searchInputEstudiante.style.transition = "all 0.3s ease";
  searchInputEstudiante.style.width = "100%"; // Regresa a su tamaño original
  searchInputEstudiante.style.marginLeft = "0"; // Regresa a su posición original
  searchInputEstudiante.style.borderColor = "transparent"; // Elimina el color del borde
};

// Contracción al hacer clic en el botón de buscar
searchButtonEstudiante.addEventListener("click", (e) => {
  e.preventDefault(); // Prevenir envío del formulario
  resetInput();
});

// Contracción al presionar "Enter"
searchInputEstudiante.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevenir envío del formulario
    resetInput();
  }
});

// Mostrar detalles
const showDetails = (id) => {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  // Actualizar los detalles
  document.getElementById("detail-id").innerText = student.id;
  document.getElementById("detail-names").innerText = student.nombres;
  document.getElementById("detail-email").innerText = student.correo;
  document.getElementById("detail-birthdate").innerText = student.fechaNacimiento;
  document.getElementById("detail-phone").innerText = student.telefono || "N/A";
  document.getElementById("detail-address").innerText = student.direccion || "N/A";
  document.getElementById("detail-biography").innerText = student.biografia || "N/A";
  document.getElementById("detail-gender").innerText = student.genero || "N/A";
  document.getElementById("detail-age-range").innerText = student.rangoEdad || "N/A";
  document.getElementById("detail-courses").innerHTML = student.cursosInscritos
    .map((curso) => `<li>${curso}</li>`)
    .join("");

  // Mostrar imagen según género
  const maleImg = document.getElementById("male-profile-img");
  const femaleImg = document.getElementById("female-profile-img");

  if (student.genero === "Masculino") {
    maleImg.classList.remove("hidden");
    femaleImg.classList.add("hidden");
  } else if (student.genero === "Femenino") {
    femaleImg.classList.remove("hidden");
    maleImg.classList.add("hidden");
  }

  // Mostrar el contenedor de detalles
  document.getElementById("student-details").classList.remove("hidden");
};

// Cerrar detalles
document.getElementById("close-details").addEventListener("click", () => {
  document.getElementById("student-details").classList.add("hidden");
});

// Inicializar
renderTable();


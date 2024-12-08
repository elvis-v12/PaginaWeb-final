const teachers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    status: "Activo",
    category: "Programación",
    course: "JavaScript Avanzado",
    bio: "Profesor de programación",
    date: "2024-12-03",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@example.com",
    status: "Inactivo",
    category: "Diseño",
    course: "Photoshop Básico",
    bio: "Especialista en diseño gráfico",
    date: "2024-12-03",
  },
  {
    id: 3,
    name: "Carlos García",
    email: "carlos@example.com",
    status: "Activo",
    category: "Idiomas",
    course: "Inglés Básico",
    bio: "Profesor de inglés con amplia experiencia",
    date: "2024-12-03",
  },
];

// Cursos por categoría
const coursesByCategory = {
  Programación: ["JavaScript Avanzado", "Python Básico", "Java Intermedio"],
  Diseño: ["Photoshop Básico", "Illustrator Avanzado", "Diseño UI/UX"],
  Idiomas: ["Inglés Básico", "Francés Intermedio", "Alemán Avanzado"],
  Marketing: ["Marketing Digital", "SEO Básico", "Campañas PPC"],
  Negocios: [
    "Gestión Empresarial",
    "Contabilidad Básica",
    "Finanzas Personales",
  ],
};

// Función para popular la tabla de profesores
function populateTable() {
  const tbody = document.querySelector("#teacher-table tbody");
  tbody.innerHTML = "";

  teachers.forEach((teacher) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${teacher.id}</td>
      <td>${teacher.name}</td>
      <td>${teacher.email}</td>
      <td>${teacher.status}</td>
      <td>${teacher.category}</td>
      <td>${teacher.course}</td>
      <td>${teacher.date}</td>
      <td>
        <button onclick="openEditModal(${teacher.id})">✎</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

 
function openModal() {
  const modal = document.getElementById("teacher-modal");
  modal.classList.remove("hidden");
  document.getElementById("teacher-form").reset();
  handleCategoryChange("teacher-category", "teacher-course");
}

 
function closeModal() {
  const modal = document.getElementById("teacher-modal");
  modal.classList.add("hidden");
}

 
function openEditModal(teacherId) {
  const modal = document.getElementById("edit-teacher-modal");
  modal.classList.remove("hidden");

  const teacher = teachers.find((t) => t.id === teacherId);
  if (teacher) {
    document.getElementById("edit-teacher-name").value = teacher.name;
    document.getElementById("edit-teacher-email").value = teacher.email;
    document.getElementById("edit-teacher-status").value = teacher.status;
    document.getElementById("edit-teacher-category").value = teacher.category;
    document.getElementById("edit-teacher-bio").value = teacher.bio;
    handleCategoryChange(
      "edit-teacher-category",
      "edit-teacher-course",
      teacher.course
    );
  }
}

// Función para cerrar el modal de edición
function closeEditModal() {
  const modal = document.getElementById("edit-teacher-modal");
  modal.classList.add("hidden");
}

// Función para guardar un nuevo profesor
function saveTeacher() {
  const name = document.getElementById("teacher-name").value.trim();
  const email = document.getElementById("teacher-email").value.trim();
  const status = document.getElementById("teacher-status").value;
  const category = document.getElementById("teacher-category").value;
  const course = document.getElementById("teacher-course").value;
  const bio = document.getElementById("teacher-bio").value.trim();
  const date = new Date().toISOString().split("T")[0];

  if (!name || !email || !category || !course) {
    alert("Por favor, completa todos los campos requeridos.");
    return;
  }

  teachers.push({
    id: teachers.length + 1,
    name,
    email,
    status,
    category,
    course,
    bio,
    date,
  });

  closeModal();
  populateTable();
}

// Función para guardar los cambios en el profesor editado
function saveEditedTeacher() {
  const name = document.getElementById("edit-teacher-name").value.trim();
  const email = document.getElementById("edit-teacher-email").value.trim();
  const status = document.getElementById("edit-teacher-status").value;
  const category = document.getElementById("edit-teacher-category").value;
  const course = document.getElementById("edit-teacher-course").value;
  const bio = document.getElementById("edit-teacher-bio").value.trim();

  if (!name || !email || !category || !course) {
    alert("Por favor, completa todos los campos requeridos.");
    return;
  }

  const teacherIndex = teachers.findIndex((t) => t.email === email);
  if (teacherIndex !== -1) {
    teachers[teacherIndex] = {
      ...teachers[teacherIndex],
      name,
      email,
      status,
      category,
      course,
      bio,
    };
  }

  closeEditModal();
  populateTable();
}


function handleCategoryChange(categoryId, courseId, selectedCourse = "") {
  const category = document.getElementById(categoryId).value;
  const courseSelect = document.getElementById(courseId);
  courseSelect.innerHTML = "";

  if (coursesByCategory[category]) {
    coursesByCategory[category].forEach((course) => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      if (course === selectedCourse) {
        option.selected = true;
      }
      courseSelect.appendChild(option);
    });
  } else {
    const noCoursesOption = document.createElement("option");
    noCoursesOption.value = "";
    noCoursesOption.textContent = "No hay cursos disponibles";
    courseSelect.appendChild(noCoursesOption);
  }
}

// Eventos
document
  .getElementById("profesor-add-btn")
  .addEventListener("click", openModal);
document
  .getElementById("teacher-category")
  .addEventListener("change", () =>
    handleCategoryChange("teacher-category", "teacher-course")
  );
document
  .getElementById("edit-teacher-category")
  .addEventListener("change", () =>
    handleCategoryChange("edit-teacher-category", "edit-teacher-course")
  );

// Cargar tabla inicial
populateTable();
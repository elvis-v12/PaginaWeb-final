const teachers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    status: "Activo",
    category: "Programación",
    course: "JavaScript Avanzado",
    date: "2024-12-03",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@example.com",
    status: "Inactivo",
    category: "Diseño",
    course: "Photoshop Básico",
    date: "2024-12-03",
  },
  {
    id: 3,
    name: "Carlos García",
    email: "carlos@example.com",
    status: "Activo",
    category: "Idiomas",
    course: "Inglés Intermedio",
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
        <button onclick="editTeacher(${teacher.id})">✎</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openModal(isEdit = false, teacherId = null) {
  const modal = document.getElementById("teacher-modal");
  modal.classList.remove("hidden");

  const courseSelect = document.getElementById("teacher-course");
  courseSelect.innerHTML = "";

  if (isEdit) {
    const teacher = teachers.find((t) => t.id === teacherId);
    document.getElementById("teacher-id").value = teacher.id;
    document.getElementById("teacher-name").value = teacher.name;
    document.getElementById("teacher-email").value = teacher.email;
    document.getElementById("teacher-status").value = teacher.status;
    document.getElementById("teacher-category").value = teacher.category;

    // Cargar cursos correspondientes a la categoría
    coursesByCategory[teacher.category].forEach((course) => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      if (course === teacher.course) {
        option.selected = true;
      }
      courseSelect.appendChild(option);
    });
  } else {
    document.getElementById("teacher-form").reset();
    document.getElementById("teacher-id").value = "";
  }
}

function closeModal() {
  const modal = document.getElementById("teacher-modal");
  modal.classList.add("hidden");
}

function saveTeacher() {
  const id = document.getElementById("teacher-id").value;
  const name = document.getElementById("teacher-name").value;
  const email = document.getElementById("teacher-email").value;
  const status = document.getElementById("teacher-status").value;
  const category = document.getElementById("teacher-category").value;
  const course = document.getElementById("teacher-course").value;
  const date = new Date().toISOString().split("T")[0];

  if (id) {
    const teacher = teachers.find((t) => t.id === parseInt(id));
    teacher.name = name;
    teacher.email = email;
    teacher.status = status;
    teacher.category = category;
    teacher.course = course;
  } else {
    teachers.push({
      id: teachers.length + 1,
      name,
      email,
      status,
      category,
      course,
      date,
    });
  }

  closeModal();
  populateTable();
}

function handleCategoryChange() {
  const category = document.getElementById("teacher-category").value;
  const courseSelect = document.getElementById("teacher-course");
  courseSelect.innerHTML = "";

  coursesByCategory[category].forEach((course) => {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    courseSelect.appendChild(option);
  });
}

document
  .getElementById("profesor-add-btn")
  .addEventListener("click", () => openModal());

document
  .getElementById("teacher-category")
  .addEventListener("change", handleCategoryChange);

populateTable();

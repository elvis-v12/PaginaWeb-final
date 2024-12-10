// Obtener referencias a los elementos
const addButton = document.getElementById("profesor-add-btn");
const teacherTableBody = document.querySelector("#teacher-table tbody");
const teacherModal = document.getElementById("teacher-modal");
const teacherForm = document.getElementById("teacher-form");
const editTeacherModal = document.getElementById("edit-teacher-modal");
const teacherCategorySelect = document.getElementById("teacher-category");
const teacherCourseSelect = document.getElementById("teacher-course");
const editTeacherCategorySelect = document.getElementById("edit-teacher-category");
const editTeacherCourseSelect = document.getElementById("edit-teacher-course");

// Variable global para almacenar los cursos por categoría
let coursesByCategory = {};

// Función para cargar los cursos desde el backend
const fetchCoursesByCategory = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/profesores/courses/categories");
    if (!response.ok) {
      throw new Error("Error al cargar los cursos por categoría");
    }
    coursesByCategory = await response.json();
    updateCategorySelectors();
  } catch (error) {
    console.error("Error al obtener cursos por categoría:", error.message);
  }
};

// Función para actualizar los selectores de categoría dinámicamente
const updateCategorySelectors = () => {
  teacherCategorySelect.innerHTML = "<option value='' disabled selected>Seleccione una categoría</option>";
  editTeacherCategorySelect.innerHTML = "<option value='' disabled selected>Seleccione una categoría</option>";

  Object.entries(coursesByCategory).forEach(([id_categoria, { nombre_categoria }]) => {
    const optionAdd = document.createElement("option");
    const optionEdit = document.createElement("option");

    optionAdd.value = id_categoria; // ID de la categoría
    optionAdd.textContent = nombre_categoria; // Nombre de la categoría

    optionEdit.value = id_categoria;
    optionEdit.textContent = nombre_categoria;

    teacherCategorySelect.appendChild(optionAdd);
    editTeacherCategorySelect.appendChild(optionEdit);
  });
};

// Función para manejar cambios de categoría y actualizar los cursos disponibles
const handleCategoryChange = (categoryId, courseId, selectedCourse = "") => {
  const category = document.getElementById(categoryId).value;
  const courseSelect = document.getElementById(courseId);

  courseSelect.innerHTML = "<option value='' disabled selected>Seleccione un curso</option>";

  const categoryData = coursesByCategory[category];

  if (categoryData && categoryData.cursos.length > 0) {
    categoryData.cursos.forEach(({ id_curso, nombre_curso }) => {
      const option = document.createElement("option");
      option.value = id_curso;
      option.textContent = nombre_curso;

      if (id_curso == selectedCourse) {
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
};

// Listeners para cambios en categoría
teacherCategorySelect.addEventListener("change", () => handleCategoryChange("teacher-category", "teacher-course"));
editTeacherCategorySelect.addEventListener("change", () => handleCategoryChange("edit-teacher-category", "edit-teacher-course"));

// Función para cargar los profesores en la tabla
const fetchTeachers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/profesores");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const teachers = await response.json();
    teacherTableBody.innerHTML = "";

    teachers.forEach((teacher) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${teacher.id}</td>
        <td>${teacher.nombres}</td>
        <td>${teacher.correo}</td>
        <td>${teacher.estado}</td>
        <td>${teacher.categoria}</td>
        <td>${teacher.curso}</td>
        <td>${new Date(teacher.fecha_registro).toLocaleDateString()}</td>
        <td>
          <button onclick="editTeacher(${teacher.id})">✎</button>
        </td>
      `;
      teacherTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener los profesores:", error.message);
  }
};

// Función para abrir el modal de agregar profesor
const openAddModal = () => {
  teacherForm.reset();
  teacherModal.classList.remove("hidden");
  handleCategoryChange("teacher-category", "teacher-course");
};

// Función para cerrar el modal de agregar profesor
const closeModal = () => {
  teacherModal.classList.add("hidden");
};

// Función para abrir el modal de edición con datos prellenados
const editTeacher = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/profesores/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const teacher = await response.json();
    document.getElementById("edit-teacher-id").value = id;
    document.getElementById("edit-teacher-name").value = teacher.nombres;
    document.getElementById("edit-teacher-email").value = teacher.correo;
    document.getElementById("edit-teacher-status").value = teacher.estado;
    editTeacherCategorySelect.value = teacher.id_categoria;
    document.getElementById("edit-teacher-bio").value = teacher.biografia;
    handleCategoryChange("edit-teacher-category", "edit-teacher-course", teacher.id_curso);

    editTeacherModal.classList.remove("hidden");
  } catch (error) {
    console.error("Error al obtener datos del profesor:", error.message);
  }
};

// Función para cerrar el modal de edición
const closeEditModal = () => {
  editTeacherModal.classList.add("hidden");
};

// Función para guardar un nuevo profesor
const saveTeacher = async () => {
  const formData = new FormData(document.getElementById("teacher-form"));
  const nombres = formData.get("teacher-name")?.trim();
  const correo = formData.get("teacher-email")?.trim();
  const estado = formData.get("teacher-status");
  const id_categoria = formData.get("teacher-category");
  const id_curso = formData.get("teacher-course");
  const biografia = formData.get("teacher-bio")?.trim();
  const foto_url = formData.get("teacher-photo");

  // Validar campos obligatorios
  if (!nombres || !correo || !estado || !id_categoria || !id_curso || !biografia) {
    alert("Todos los campos obligatorios deben ser proporcionados.");
    return;
  }

  const data = { nombres, correo, estado, id_categoria, id_curso, biografia };

  try {
    const response = await fetch("http://localhost:3000/api/profesores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      closeModal();
      fetchTeachers(); // Refrescar la tabla
      alert("Profesor creado correctamente");
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error("Error al guardar profesor:", error.message);
  }
};

// Función para guardar cambios de edición
const saveEditedTeacher = async () => {
  const id = document.getElementById("edit-teacher-id").value;
  const nombres = document.getElementById("edit-teacher-name").value.trim();
  const correo = document.getElementById("edit-teacher-email").value.trim();
  const estado = document.getElementById("edit-teacher-status").value;
  const id_categoria = editTeacherCategorySelect.value;
  const id_curso = editTeacherCourseSelect.value;
  const biografia = document.getElementById("edit-teacher-bio").value.trim();

  if (!nombres || !correo || !estado || !id_categoria || !id_curso || !biografia) {
    alert("Todos los campos obligatorios deben ser proporcionados.");
    return;
  }

  const data = {
    nombres,
    correo,
    estado,
    id_categoria,
    id_curso,
    biografia,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/profesores/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      closeEditModal();
      await fetchTeachers(); // Actualizar tabla
      alert("Profesor actualizado correctamente.");
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error("Error al actualizar el profesor:", error.message);
  }
};


// Inicializar al cargar la página
addButton.addEventListener("click", openAddModal);
fetchCoursesByCategory().then(() => fetchTeachers());

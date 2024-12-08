// Selección de elementos del sidebar
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const sections = document.querySelectorAll("main .section"); // Todas las secciones de contenido

// Iterar sobre los enlaces del menú lateral
allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    // Quitar 'active' de todos los elementos
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });

    // Agregar 'active' al elemento actual
    li.classList.add("active");

    // Mostrar la sección correspondiente
    const sectionId = li.getAttribute("data-section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Si existe el id, asignar 'active' a la sección correspondiente
    if (sectionId) {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add("active");
      } else {
        console.warn(`Sección con id ${sectionId} no encontrada`);
      }
    }
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");
menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

// Toggle para el buscador en pantallas pequeñas
const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");
const searchInput = document.querySelector("#content nav form .form-input input");

// Agregar funcionalidad de filtrado
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    alert("Por favor, escribe un término para buscar.");
    return;
  }

  let found = false;

  allSideMenu.forEach((item) => {
    const text = item.textContent.trim().toLowerCase();
    const li = item.parentElement;

    if (text.includes(query)) {
      // Quitar 'active' de todos los elementos
      allSideMenu.forEach((i) => i.parentElement.classList.remove("active"));

      // Resaltar el elemento encontrado
      li.classList.add("active");

      const sectionId = li.getAttribute("data-section");
      sections.forEach((section) => section.classList.remove("active"));

      if (sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add("active");
          found = true;
        }
      }
    }
  });

  if (!found) {
    alert("No se encontró ninguna sección con ese término.");
  }
});

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

// Ajuste para responsive
if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// Switch para modo oscuro/claro
const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// PROGRESSBAR
const allProgress = document.querySelectorAll("main .card .progress");
allProgress.forEach((item) => {
  item.style.setProperty("--value", item.dataset.value);
});

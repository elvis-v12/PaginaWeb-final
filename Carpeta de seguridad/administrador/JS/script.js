// Selección de elementos del sidebar
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const sections = document.querySelectorAll("main .section"); // Todas las secciones de contenido

allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
        // Desactivar todas las opciones del sidebar
        allSideMenu.forEach((i) => {
            i.parentElement.classList.remove("active");
        });
        // Activar la opción seleccionada
        li.classList.add("active");

        // Mostrar la sección correspondiente y ocultar las demás
        const sectionId = li.getAttribute("data-section");
        sections.forEach((section) => {
            section.classList.remove("active");
            const element = document.querySelector('#coursesEdit');
            element.classList.remove('active');
        });
        if (sectionId) {
            document.getElementById(sectionId).classList.add("active");
        }
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");
sidebar.classList.toggle("hide");// quitar
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
const allProgress = document.querySelectorAll('main .card .progress');
allProgress.forEach(item => {
    item.style.setProperty('--value', item.dataset.value)
})

 
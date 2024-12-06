// Gestión del sidebar
(() => {
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
            });
            if (sectionId) {
                document.getElementById(sectionId).classList.add("active");
            }
        });
    });
})();


// Toggle del buscador en pantallas pequeñas
(() => {
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

    // Ajustes para responsive
    if (window.innerWidth < 768) {
        document.getElementById("sidebar").classList.add("hide");
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
})();

// Switch para modo oscuro/claro
(() => {
    const switchMode = document.getElementById("switch-mode");

    switchMode.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    });
})();

// Progress bar
(() => {
    const allProgress = document.querySelectorAll("main .card .progress");
    allProgress.forEach((item) => {
        item.style.setProperty("--value", item.dataset.value);
    });
})();

// Dropdown
(() => {
    document.addEventListener("DOMContentLoaded", function () {
        const infoButton = document.getElementById("Info_p"); // Botón para abrir el dropdown
        const dropdown = document.querySelector(".dropdow"); // Elemento del dropdown
        const closeButton = document.querySelector(".sali"); // Botón para cerrar el dropdown

        // Verifica si los elementos existen
        if (infoButton && dropdown && closeButton) {
            // Abrir o alternar el estado del dropdown
            infoButton.addEventListener("click", function () {
                dropdown.classList.toggle("show"); // Cambia la visibilidad
            });

            // Cerrar el dropdown al hacer clic en el botón de cerrar
            closeButton.addEventListener("click", function () {
                dropdown.classList.remove("show"); // Asegúrate de que el dropdown esté oculto
            });
        }
    });
})();

// Mostrar u ocultar el formulario al hacer clic en el botón "Agregar"
(() => {
    const agregarButton = document.getElementById("Agregar"); // Botón con ID "Agregar"
    const formulario = document.querySelector(".dropdowagregar"); // Div con clase "dropdowagregar"

    if (agregarButton && formulario) {
        agregarButton.addEventListener("click", function () {
            // Alterna la visibilidad del formulario
            formulario.style.display = formulario.style.display === "none" || formulario.style.display === "" ? "block" : "none";
        });
    }
})();
// Ocultar el formulario al hacer clic en el botón "X" (saliagregar)
(() => {
    const salirButton = document.querySelector(".saliagregar"); // Botón con clase "saliagregar"
    const formulario = document.querySelector(".dropdowagregar"); // Div con clase "dropdowagregar"

    if (salirButton && formulario) {
        salirButton.addEventListener("click", function () {
            // Cambiar el display del formulario a "none"
            formulario.style.display = "none";
        });
    }
})();


// Mostrar y ocultar el div de edición
(() => {
    const configButton = document.getElementById("Confi_p"); // Botón para mostrar
    const editDropdown = document.querySelector(".dropdoweditar"); // Div a mostrar/ocultar
    const closeButton = document.querySelector(".salieditar"); // Botón para cerrar

    if (configButton && editDropdown && closeButton) {
        // Mostrar el div al hacer clic en el botón "Confi_p"
        configButton.addEventListener("click", function () {
            editDropdown.style.display = "block"; // Cambiar a visible
        });

        // Ocultar el div al hacer clic en el botón "X" (salieditar)
        closeButton.addEventListener("click", function () {
            editDropdown.style.display = "none"; // Cambiar a oculto
        });
    }
})();

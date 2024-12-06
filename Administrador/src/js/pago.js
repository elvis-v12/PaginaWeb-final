// Elementos clave
const tableBody = document.querySelector("table tbody"); // Si no usas tabla, puedes omitir esto
const btnAgregar = document.querySelector(".agregar-btn"); // Botón Agregar

// Dropdowns
const dropdownInfo = document.querySelector(".dropdow");
const dropdownAgregar = document.querySelector(".dropdowagregar");
const dropdownEdit = document.querySelector(".dropdoweditar");

// Función para mostrar un dropdown específico
function showDropdown(dropdown) {
    hideAllDropdowns(); // Cierra cualquier otro dropdown abierto
    if (dropdown) {
        dropdown.style.display = "block";
    }
}

// Función para ocultar un dropdown específico
function hideDropdown(dropdown) {
    if (dropdown) {
        dropdown.style.display = "none";
    }
}

// Función para ocultar todos los dropdowns
function hideAllDropdowns() {
    document.querySelectorAll(".dropdow").forEach((dropdown) => {
        dropdown.style.display = "none";
    });
    document.querySelectorAll(".dropdowagregar").forEach((dropdown) => {
        dropdown.style.display = "none";
    });
    document.querySelectorAll(".dropdoweditar").forEach((dropdown) => {
        dropdown.style.display = "none";
    });
}

// Manejador de eventos para los botones
document.addEventListener("click", (event) => {
    const target = event.target.closest("button"); // Busca el botón más cercano
    if (!target) return;

    if (target.classList.contains("btn-info_p")) {
        console.log("Abrir dropdown información");
        showDropdown(dropdownInfo);
    } else if (target.classList.contains("btn-edit_p")) {
        console.log("Abrir dropdown editar");
        showDropdown(dropdownEdit);
    } else if (target.classList.contains("agregar-btn")) {
        console.log("Abrir dropdown agregar");
        showDropdown(dropdownAgregar);
    }
});

// Manejador de evento para el botón agregar
btnAgregar?.addEventListener("click", () => {
    console.log("Abrir dropdown agregar");
    showDropdown(dropdownAgregar);
});

// Manejadores para cerrar los dropdowns al hacer clic en los botones de cierre
document.querySelector(".close-info_p")?.addEventListener("click", () => {
    hideDropdown(dropdownInfo);
});

document.querySelector(".close-add_p")?.addEventListener("click", () => {
    hideDropdown(dropdownAgregar);
});

document.querySelector(".close-edit_p")?.addEventListener("click", () => {
    hideDropdown(dropdownEdit);
});

// Ocultar todos los dropdowns si se hace clic fuera de ellos
document.addEventListener("click", (event) => {
    const isDropdown = event.target.closest(".dropdow, .dropdowagregar, .dropdoweditar");
    const isButton = event.target.closest("button");

    if (!isDropdown && !isButton) {
        hideAllDropdowns();
    }
});
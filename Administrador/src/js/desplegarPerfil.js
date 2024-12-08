// Obtener los elementos necesarios
const profileDropdownList = document.querySelector(".profile-dropdown-list");
const profileBtn = document.querySelector(".profile-dropdown-btn");

// Función para alternar el estado del menú desplegable
const toggleDropdown = () => {
  profileDropdownList.classList.toggle("active");
};

// Agregar el evento click al botón del perfil
profileBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Evita que el evento se propague al window
  toggleDropdown();
});

// Cerrar el menú desplegable al hacer clic fuera de él
window.addEventListener("click", () => {
  profileDropdownList.classList.remove("active");
});

// Cerrar el menú desplegable con la tecla Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    profileDropdownList.classList.remove("active");
  }
});
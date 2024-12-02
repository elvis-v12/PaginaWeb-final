window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("preloader").style.opacity = "0";
    document.getElementById("preloader").style.transition = "opacity 0.5s ease"; // Suaviza la desaparición
  }, 1000); // Se acorta el tiempo a 1 segundo
  setTimeout(function () {
    document.getElementById("preloader").style.display = "none"; // Se oculta completamente después de la transición
  }, 1500); // Espera 1.5 segundos antes de ocultarlo completamente
});

// Lógica para el botón de Cerrar Sesión
document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
  e.preventDefault(); // Evitar comportamiento predeterminado del enlace

  // Eliminar datos de localStorage
  localStorage.removeItem("userId"); // Elimina el ID del usuario
  localStorage.removeItem("userRole"); // Elimina el rol del usuario

  // Redirigir al usuario al login
  window.location.href = "iniciar-sesion.html"; // Asegúrate de tener una página de login
});
const botonEliminar = document.createElement("button");
botonEliminar.textContent = "Eliminar";
botonEliminar.classList.add("btn-eliminar");
botonEliminar.addEventListener("click", function () {
  tablaBody.removeChild(nuevaFila);
});
celdaAcciones.appendChild(botonEliminar);

// Al cargar la página
window.onload = function () {
  const userName = localStorage.getItem("userName"); // Obtener el nombre completo del usuario
  if (userName) {
    // Dividir el nombre completo y obtener solo el primer nombre
    const primerNombre = userName.split(" ")[0];

    // Mostrar el mensaje de bienvenida
    const bienvenidaDiv = document.getElementById("bienvenida");
    bienvenidaDiv.textContent = `Bienvenido, ${primerNombre}`;
  }
};

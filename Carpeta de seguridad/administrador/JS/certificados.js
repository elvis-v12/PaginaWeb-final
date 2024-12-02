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

// Mostrar y ocultar galería de imágenes
const botonMostrar = document.getElementById("mostrar-imagenes");
const galeriaImagenes = document.getElementById("galeria-imagenes");

botonMostrar.addEventListener("click", () => {
  if (galeriaImagenes.style.display === "none") {
    galeriaImagenes.style.display = "grid";
    botonMostrar.textContent = "Ocultar Imágenes";
  } else {
    galeriaImagenes.style.display = "none";
    botonMostrar.textContent = "Mostrar Imágenes";
  }
});

// Función para cambiar las imágenes según la categoría seleccionada
function cambiarImagenes(categoria) {
  const imagenesPorCategoria = {
    ninos: [
      "/public/img/certificadoN.jpg",
      "/public/img/diplomaCi.png",
      "/public/img/diplomaH.jpg",
    ],
    adolescentes: [
      "/public/img/6.png",
      "/public/img/7.png",
      "/public/img/8.png",
    ],
    adultos: [
      "/public/img/diplomaH.png",
      "/public/img/diplomaJ.png",
      "/public/img/diplomaP.png",
    ],
  };

  // Obtener todas las imágenes en los casilleros
  const casilleros = document.querySelectorAll(
    ".galeria-imagenes .casillero img"
  );

  // Cambiar la fuente de las imágenes según la categoría
  imagenesPorCategoria[categoria].forEach((imagen, index) => {
    casilleros[index].src = imagen;
  });
}

// Añadir evento de clic a los botones de categoría
const botonesCategoria = document.querySelectorAll(".btn-categoria");
botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const categoria = e.target.getAttribute("data-categoria");
    cambiarImagenes(categoria);
  });
});

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

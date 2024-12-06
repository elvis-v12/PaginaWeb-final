document.addEventListener("DOMContentLoaded", function () {
  // Código relacionado con el DOM
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
    }
  }, 1000);

  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }, 1500);

  const cerrarSesion = document.getElementById("cerrar-sesion");
  if (cerrarSesion) {
    cerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      window.location.href = "iniciar-sesion.html";
    });
  }

  const userName = localStorage.getItem("userName");
  if (userName) {
    const primerNombre = userName.split(" ")[0];
    const bienvenidaDiv = document.getElementById("bienvenida");
    if (bienvenidaDiv) {
      bienvenidaDiv.textContent = `Bienvenido, ${primerNombre}`;
    }
  }
});

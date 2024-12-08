
      const userName = localStorage.getItem('userName');
if (userName) {
    const profileNameElement = document.getElementById('Nombre');
    const iconElement = profileNameElement.querySelector('i'); // Selecciona el ícono existente

    // Actualiza solo el texto del nombre, manteniendo el ícono
    profileNameElement.innerHTML = `${userName}`;
    if (iconElement) {
        profileNameElement.appendChild(iconElement); // Reagrega el ícono
    }
} else {
    console.warn('No se encontró el nombre del usuario en localStorage.');
}

// Selecciona todos los enlaces de cierre de sesión
const logoutLinks = document.querySelectorAll('a.logout, a.regd');

// Añade el evento de clic a todos los enlaces seleccionados
logoutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Elimina el nombre del usuario del localStorage
        localStorage.removeItem('userName');

        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '/src/html/loginadmin.html'; // Cambia la ruta según tu proyecto
    });
});


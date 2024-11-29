const preloaderCssPath = `/public/css/${result.css}/preloader.css?${new Date().getTime()}`;
const mainCssPath = `/public/css/${result.css}/inicio.css?${new Date().getTime()}`;

// Al cargar la página, verificamos si el usuario ya ha iniciado sesión.
window.addEventListener('DOMContentLoaded', () => {
    // Comprobamos si ya existe el CSS guardado en localStorage
    const cssType = localStorage.getItem('cssType');

    // Si no existe, aplicamos el CSS por defecto (para "niños").
    if (!cssType) {
        // Usamos 'ninos' como el CSS por defecto si no hay un usuario autenticado
        const preloaderCssPath = '/public/css/ninos/preloader.css';
        const mainCssPath = '/public/css/ninos/inicio.css';

        document.getElementById('preloader-style').href = preloaderCssPath;
        document.getElementById('main-style').href = mainCssPath;
    } else {
        // Si existe el cssType, aplicamos el estilo correspondiente (lo guardado en localStorage)
        const preloaderCssPath = `/public/css/${cssType}/preloader.css`;
        const mainCssPath = `/public/css/${cssType}/inicio.css`;

        document.getElementById('preloader-style').href = preloaderCssPath;
        document.getElementById('main-style').href = mainCssPath;
    }
});

// Ahora se maneja el evento de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.exito) {
            alert(result.mensaje);

            // Guardar el tipo de CSS en el Local Storage SOLO al iniciar sesión
            localStorage.setItem('cssType', result.css);

            // Cambiar los estilos según el tipo de CSS
            const preloaderCssPath = `/public/css/${result.css}/preloader.css`;
            const mainCssPath = `/public/css/${result.css}/inicio.css`;

            // Actualizar los estilos
            document.getElementById('preloader-style').href = preloaderCssPath;
            document.getElementById('main-style').href = mainCssPath;

            // Redirigir a la página de inicio (o dashboard)
            window.location.href = 'inicio.html';
        } else {
            alert(result.mensaje);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error en la conexión. Por favor, intenta de nuevo.");
    }
});

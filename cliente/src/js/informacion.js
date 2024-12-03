// Función para ocultar el preloader
function hidePreloader() {
    setTimeout(function () {
        document.getElementById('preloader').style.opacity = '0';
        document.getElementById('preloader').style.transition = 'opacity 0.5s ease';
    }, 1000);
    setTimeout(function () {
        document.getElementById('preloader').style.display = 'none';
    }, 1500);
}

// Contador de seguidores
function startCounting() {
    let conta1 = document.getElementById("conta1"),
        conta2 = document.getElementById("conta2");

    let cant1 = 1000, cant2 = 0;
    const maxCount1 = 1697;
    const maxCount2 = 230;
    const tiempo = 0.4;

    // Tiempo para Facebook
    let tiempo1 = setInterval(() => {
        conta1.textContent = ++cant1;
        if (cant1 === maxCount1) clearInterval(tiempo1);
    }, tiempo);

    // Tiempo para Instagram
    let tiempo2 = setInterval(() => {
        conta2.textContent = ++cant2;
        if (cant2 === maxCount2) clearInterval(tiempo2);
    }, tiempo);
}

// Inicializa los eventos al cargar la ventana
window.addEventListener('load', function () {
    hidePreloader();

    // Observador de intersección para iniciar el conteo
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(); // Iniciar conteo cuando la sección es visible
                observer.unobserve(entry.target); // Dejar de observar una vez que el conteo ha comenzado
            }
        });
    });

    const targetSection = document.querySelector('.contenedor-seguidores'); // Asegúrate de que la clase sea la correcta
    observer.observe(targetSection); // Comenzar a observar la sección
});

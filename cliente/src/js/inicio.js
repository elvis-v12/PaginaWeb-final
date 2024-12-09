// Script para el buscador
const searchBar = document.getElementById('searchBar');
const resultsContainer = document.getElementById('results');

searchBar.addEventListener('input', function() {
    const query = this.value.trim();
    console.log("Consulta actual:", query);
    resultsContainer.innerHTML = ''; // Limpia resultados anteriores

    if (query) {
        // Mostrar el resultado en el contenedor
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<a href="cursos.html?search=${encodeURIComponent(query)}">Buscar: ${query}</a>`;        
        resultsContainer.appendChild(resultItem);
        resultsContainer.style.display = 'block'; // Muestra los resultados
    } else {
        resultsContainer.style.display = 'none'; // Oculta si no hay entrada
    }
});


// CARRUSEL
let currentSlide = 0; // Variable para rastrear la diapositiva actual
const slides = document.querySelectorAll('.carousel-slide'); // Selecciona todas las diapositivas

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = '0'; // Empieza con opacidad cero
        setTimeout(() => {
            slide.classList.toggle('active', i === index); // Cambia la clase activa
            slide.style.opacity = '1'; // Aplica la opacidad cuando es la activa
        }, 300); // Retardo para una transición suave
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Incrementa el índice de la diapositiva
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Decrementa el índice de la diapositiva
    showSlide(currentSlide);
}

// Mostrar la primera diapositiva
showSlide(currentSlide);

// Cambiar diapositiva automáticamente cada 7 segundos (7000 milisegundos)
setInterval(nextSlide, 7000);

// SECCION DATOS
// Seleccionar todas las opciones
const options = document.querySelectorAll('.option');
const displayedMedia = document.getElementById('displayed-media');

// Función para cambiar la imagen mostrada
function changeImage(media) {
    displayedMedia.src = media; // Cambia la fuente de la imagen mostrada
}

// Añadir evento click a cada opción
options.forEach(option => {
    const media = option.getAttribute('data-media');
    
    // Evento click
    option.addEventListener('click', () => {
        changeImage(media);
    });

    // Evento mouseover
    option.addEventListener('mouseover', () => {
        changeImage(media);
    });

    // Opcional: Evento mouseout para volver a la imagen por defecto
    option.addEventListener('mouseout', () => {
        displayedMedia.src = '/public/img/ninos/robotito.gif'; // Cambia esto por la imagen por defecto que desees
    });
});


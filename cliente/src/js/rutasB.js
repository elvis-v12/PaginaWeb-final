function showCourses() {
    document.getElementById('courses').style.display = 'block';
  }

  // Asume que tienes el siguiente código en tu archivo 'rutasIngreso.js'
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', scrollToFooter);

function scrollToFooter() {
  // Código para hacer scroll hasta el footer
  const footer = document.querySelector('.footer');
  footer.scrollIntoView({ behavior: 'smooth' });

  // Código para hacer que el contenedor del footer rebote una vez
  footer.style.animation = 'bounce 1s ease-in-out';
}





const searchContainer = document.getElementById("search-container");
const input = document.getElementById("placeholder-text");

searchContainer.addEventListener("click", function() {
    input.focus(); // Activa el cursor en el campo de entrada
    input.style.animationPlayState = 'paused'; // Pausa la animación
});

document.addEventListener("click", function(event) {
    if (!searchContainer.contains(event.target)) {
        input.style.animationPlayState = 'running'; // Reanuda la animación si se hace clic fuera
    }
});

//Ç

const searchInput = document.getElementById('placeholder-text');
const searchResults = document.getElementById('search-results');
const courses = document.querySelectorAll('.course-info');

// Función para manejar la búsqueda
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';  // Limpiar los resultados anteriores

    if (searchTerm.trim() === '') {
        searchResults.style.display = 'none';  // Ocultar si el input está vacío
        return;
    }

    let hasResults = false;

    courses.forEach(course => {
        const courseTitle = course.querySelector('h3').textContent.toLowerCase();

        if (courseTitle.includes(searchTerm)) {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = courseTitle;
            searchResults.appendChild(resultDiv);
            hasResults = true;
        }
    });

    if (hasResults) {
        searchResults.style.display = 'block';  // Mostrar los resultados
    } else {
        searchResults.style.display = 'none';  // Ocultar si no hay coincidencias
    }
});
// Selecciona el campo de búsqueda y todas las tarjetas de curso
const searchBar = document.getElementById('searchBar');
const courseCards = document.querySelectorAll('.course-card');

// Escucha el evento de entrada en el campo de búsqueda
searchBar.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    courseCards.forEach(card => {
        // Busca el nombre del curso desde data-course-name
        const courseName = card.getAttribute('data-course-name').toLowerCase();

        // Filtra en base al nombre
        if (courseName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

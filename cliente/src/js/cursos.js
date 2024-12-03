/*// Selecciona el campo de búsqueda y todas las tarjetas de curso
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
}); */

// BUSQUEDA SIN BD
document.getElementById('searchBar').addEventListener('input', e => {
    const query = e.target.value.trim().toLowerCase();
    const courseCards = document.querySelectorAll('.course-card');
    let found = false;

    courseCards.forEach(card => {
        if (card.getAttribute('data-course-name').toLowerCase().includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    let noResultsMessage = document.getElementById('noResultsMessage');
    if (!noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.id = 'noResultsMessage';
        noResultsMessage.textContent = 'Aún no agregamos ese curso, pero muy pronto en nuestras plataformas.';
        noResultsMessage.style.backgroundColor = '#f8d7da';
        noResultsMessage.style.color = '#721c24';
        noResultsMessage.style.border = '1px solid #f5c6cb';
        noResultsMessage.style.padding = '15px';
        noResultsMessage.style.borderRadius = '5px';
        noResultsMessage.style.marginTop = '20px';
        noResultsMessage.style.fontSize = '16px';

        document.querySelector('.info-container').appendChild(noResultsMessage);
    }
    noResultsMessage.style.display = found ? 'none' : 'block';
});

// BUSQUEDA CON BD
document.getElementById('searchBar').addEventListener('input', async e => {
    const query = e.target.value.trim().toLowerCase();
    const courseCards = document.querySelectorAll('.course-card');
    let found = false;

    try {
        const response = await fetch(`/api/cursos?query=${encodeURIComponent(query)}`);
        const coursesFromDB = await response.json();

        if (coursesFromDB.length > 0) {
            found = true;
            document.querySelector('.info-container').innerHTML = '';
            coursesFromDB.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.setAttribute('data-course-name', course.name);
                courseCard.textContent = course.name;
                document.querySelector('.info-container').appendChild(courseCard);
            });
        } else {
            found = false;
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
    }
    let noResultsMessage = document.getElementById('noResultsMessage');
    if (!noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.id = 'noResultsMessage';
        noResultsMessage.textContent = 'Aún no agregamos ese curso, pero muy pronto en nuestras plataformas.';
        noResultsMessage.style.backgroundColor = '#f8d7da';
        noResultsMessage.style.color = '#721c24';
        noResultsMessage.style.border = '1px solid #f5c6cb';
        noResultsMessage.style.padding = '15px';
        noResultsMessage.style.borderRadius = '5px';
        noResultsMessage.style.marginTop = '20px';
        noResultsMessage.style.fontSize = '16px';
        document.querySelector('.info-container').appendChild(noResultsMessage);
    }
    noResultsMessage.style.display = found ? 'none' : 'block';
});
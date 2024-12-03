document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const mainContent = document.getElementById('main-content');

    const contents = {
        "Mis Cursos": `
            <div class="search-container">
                <input type="text" placeholder="Buscar cursos..." class="search-input">
            </div>
            <div class="courses-container">
                <div class="course-card card1">
                    <div class="course-info">
                        <h3>PYTHON KIDS</h3>
                        <button class="session-button">5 sesiones</button>
                        <a href="videoPython.html" class="course-button">Ingresar</a>
                    </div>
                </div>
                <div class="course-card card2">
                    <div class="course-info">
                        <h3>HTML : CREACIÓN DE PÁGINAS</h3>
                        <button class="session-button">5 sesiones</button>
                        <a href="videoHtml.html" class="course-button">Ingresar</a>
                    </div>
                </div>
                <div class="course-card card3">
                    <div class="course-info">
                        <h3>JAVA SCRIPT</h3>
                        <button class="session-button">5 sesiones</button>
                        <a href="videoJava.html" class="course-button">Ingresar</a>
                    </div>
                </div>
                <div class="course-card card4">
                    <div class="course-info">
                        <h3>MODELANDO CON CINEMA 4D</h3>
                        <button class="session-button">5 sesiones</button>
                        <button id="lock-button" class="course-button">Ingresar</button>
                    </div>
                </div>
            </div>
        `,
        "Cursos Online": `
            <div class="search-container">
                <input type="text" placeholder="Buscar cursos..." class="search-input">
            </div>
        `,
        "Programas Zoom": `
            <div class="search-container">
                <input type="text" placeholder="Buscar programas..." class="search-input">
            </div>
        `,
        "Informes": `
            <div class="search-container">
                <input type="text" placeholder="Buscar informes..." class="search-input">
            </div>
        `,
        "Configuraciones": `
            <div class="search-container">
                <input type="text" placeholder="Buscar configuraciones..." class="search-input">
            </div>
        `
    };

    // Inicializa el contenido predeterminado como "Mis Cursos"
    mainContent.innerHTML = contents["Mis Cursos"];

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.textContent.trim();
            mainContent.innerHTML = contents[title] || '<div class="search-container"><input type="text" placeholder="Buscar..." class="search-input"></div>';
            
            // Volver a añadir el evento al botón de candado, si es necesario
            const lockButton = document.getElementById('lock-button');
            if (lockButton) {
                lockButton.addEventListener('click', handleLockButtonClick);
            }
        });
    });

    // Función para manejar el clic en el botón de candado
    function handleLockButtonClick() {
        // Crear el elemento del candado
        const lockIcon = document.createElement('div');
        lockIcon.innerHTML = '🔒'; // Icono de candado
        lockIcon.style.fontSize = '50px'; // Tamaño del icono
        lockIcon.style.textAlign = 'center'; // Centrar el icono
        lockIcon.style.marginTop = '20px'; // Margen superior

        // Crear el mensaje de advertencia
        const warningMessage = document.createElement('div');
        warningMessage.innerHTML = 'Este curso está bloqueado. ¡Pronto estará disponible!';
        warningMessage.style.color = 'red'; // Color del mensaje
        warningMessage.style.textAlign = 'center'; // Centrar el mensaje
        warningMessage.style.marginTop = '10px'; // Margen superior

        // Obtener el contenedor del curso y agregar el candado y el mensaje
        const courseContainer = document.querySelector('.card4 .course-info');
        courseContainer.appendChild(lockIcon);
        courseContainer.appendChild(warningMessage);

        // Deshabilitar el botón después de hacer clic
        this.disabled = true;
    }

    // Añadir el evento al botón de candado al cargar
    const lockButton = document.getElementById('lock-button');
    if (lockButton) {
        lockButton.addEventListener('click', handleLockButtonClick);
    }
});

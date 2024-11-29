document.addEventListener('DOMContentLoaded', () => {
    console.log("menu.js cargado");  // Confirma que el script está cargado
    const loginButton = document.getElementById('login-button');
    const loginDropdown = document.getElementById('login-dropdown');
    const streakIcon = document.getElementById('streakIcon');  // Icono de racha
    
    // Verificar si el usuario está logueado
    const userName = localStorage.getItem('userName');
    console.log("Usuario en localStorage:", userName);  // Confirma que se está obteniendo el nombre del usuario

    if (userName && loginButton && loginDropdown) {
        // Cambiar el botón de "Acceder" al nombre del usuario
        loginButton.textContent = userName;
        console.log("Nombre del usuario cargado en el menú");

        // Mostrar el icono de la racha solo si el usuario está logueado
        streakIcon.style.display = 'inline-block';  // Mostrar el icono de la racha

        // Verificar la racha del usuario
        verificarRacha();

        // Actualizar opciones de menú para el usuario logueado
        loginDropdown.innerHTML = ` 
            <a href="cuenta.html">Editar perfil</a>
            <a href="clasificacion.html">Clasificación</a>
            <a href="progreso.html">Mi progreso</a>
            <a href="mis-cursos.html">Mis cursos</a>
            <a href="suscripciones.html">Suscripciones</a>
            <a href="#" id="logout-link">Cerrar sesión</a>
        `;

        // Agregar evento para cerrar sesión
        document.getElementById('logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    } else {
        // Si no está logueado, no mostrar el icono de la racha
        streakIcon.style.display = 'none';
    }

    // Función para verificar y mostrar la racha del usuario
    function verificarRacha() {
        const streak = localStorage.getItem('streak'); // Obtener la racha almacenada
        if (streak) {
            // Si existe una racha guardada, puedes mostrar el icono y/o algún mensaje adicional
            console.log("Racha del usuario:", streak); // Solo para depuración
            document.getElementById('streakMessage').style.display = "block"; // Mostrar el mensaje de racha
        } else {
            // Si no hay racha, puedes mostrar otro mensaje o no hacer nada
            console.log("No se encontró racha.");
        }
    }

    // Función para cerrar sesión
    function cerrarSesion() {
        console.log("Cerrando sesión");
        localStorage.removeItem('userName');
        localStorage.removeItem('cssType');
        localStorage.removeItem('streak'); // Eliminar la racha al cerrar sesión
        alert("Has cerrado sesión"); // Mensaje opcional
        window.location.href = 'inicio.html'; // Redirigir a inicio.html
    }
});

// Mostrar menú desplegable al hacer clic en el botón hamburguesa
document.querySelector('.hamburger').addEventListener('click', function() {
    document.getElementById('menu-links').classList.toggle('active');
});




//RACHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA


let popupVisible = false;
let currentQuestion = 0;
let correctAnswers = 0;
const questions = [
    {
        text: "¿Qué significa HTML?",
        options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 1
    },
    {
        text: "¿Qué hace el comando 'print' en Python?",
        options: ["Muestra un mensaje en pantalla", "Imprime un documento", "Inicia un bucle"],
        correct: 0
    },
    {
        text: "¿Cuál es el símbolo para comentarios en JavaScript?",
        options: ["//", "#", "/* */"],
        correct: 0
    },
    {
        text: "¿Qué etiqueta se usa para insertar una imagen en HTML?",
        options: ["<img>", "<image>", "<picture>"],
        correct: 0
    },
    {
        text: "¿Cómo se declara una variable en JavaScript?",
        options: ["var x = 10;", "let = 10;", "int x = 10;"],
        correct: 0
    },
    {
        text: "¿Qué significa CSS?",
        options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correct: 0
    }
];

// Función para cargar el calendario de racha
window.onload = function () {
    const today = new Date().getDay();
    const days = document.querySelectorAll("span");

    // Limpiar marcas previas
    days.forEach(day => day.classList.remove("day-marked"));

    // Marcar los días desde el domingo hasta hoy
    for (let i = 0; i <= today; i++) {
        days[i].classList.add("day-marked");
    }
};

// Función para mostrar el popup de la racha
function showStreakPopup() {
    document.getElementById("streakPopup").style.display = "block";
    popupVisible = true;
}

// Función para ocultar el popup de la racha
function hideStreakPopup() {
    popupVisible = false;
    setTimeout(() => {
        if (!popupVisible) {
            document.getElementById("streakPopup").style.display = "none";
        }
    }, 200);
}

// Función para comenzar una nueva racha
function startStreak() {
    alert("¡Has comenzado una nueva racha!");
    document.getElementById("streakPopup").style.display = "none"; // Cierra la ventana de racha
    showQuestionnaire(); // Inicia el cuestionario
}

// Función para mostrar el cuestionario de la racha
function showQuestionnaire() {
    document.getElementById("questionnairePopup").style.display = "flex";
    displayQuestion();
}

// Función para cerrar el cuestionario
function closeQuestionnaire() {
    document.getElementById("questionnairePopup").style.display = "none";
    currentQuestion = 0;
    correctAnswers = 0;
}

// Función para mostrar la pregunta del cuestionario
function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("questionText").textContent = `Pregunta ${currentQuestion + 1}: ${question.text}`;
    const options = document.querySelectorAll(".options-racha button");

    options.forEach((button, index) => {
        button.textContent = question.options[index];
        // Limpiar las clases anteriores de respuesta
        button.classList.remove("correct", "incorrect");
        button.disabled = false;  // Asegurarse de que los botones estén habilitados
        button.onclick = () => checkAnswer(index);  // Añadir el evento de clic
    });
}

// Función para verificar la respuesta seleccionada
function checkAnswer(selectedOption) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll(".options-racha button");

    // Marca la respuesta correcta en verde y la incorrecta en rojo
    if (selectedOption === question.correct) {
        options[selectedOption].classList.add("correct");  // Marca el botón seleccionado como correcto (verde)
        alert("¡Correcto!");
        correctAnswers++;
    } else {
        options[selectedOption].classList.add("incorrect");  // Marca el botón seleccionado como incorrecto (rojo)
        alert("Incorrecto, intenta la siguiente.");
    }

    // Deshabilita todos los botones después de que se haya respondido
    options.forEach(button => button.disabled = true);

    // Pasar a la siguiente pregunta o mostrar el mensaje de finalización
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        setTimeout(() => {
            displayQuestion();  // Muestra la siguiente pregunta
        }, 1000);  // Espera un segundo antes de mostrar la siguiente pregunta
    } else {
        closeQuestionnaire();
        showCompletionMessage();
    }
}

// Función para mostrar el mensaje de finalización
function showCompletionMessage() {
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    const expPoints = correctAnswers * 14;

    document.getElementById("scorePercentage").textContent = scorePercentage;
    document.getElementById("expPoints").textContent = expPoints;

    document.getElementById("completionMessage").style.display = "block";
}

// Función para cerrar el mensaje de finalización
function closeCompletionMessage() {
    document.getElementById("completionMessage").style.display = "none";
    showStreakMessage(); // Mostrar el mensaje de racha después de completar el cuestionario
}

// Función para mostrar el mensaje de racha
function showStreakMessage() {
    document.getElementById("streakMessage").style.display = "block";
}

// Función para cerrar el mensaje de racha
function closeStreakMessage() {
    document.getElementById("streakMessage").style.display = "none";
}


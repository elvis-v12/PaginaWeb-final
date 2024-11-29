const questions = [
    {
        text: "¿Qué es Cinema 4D?",
        options: [
            "Un videojuego",
            "Un programa de animación 3D",
            "Un software de música",
            "Un programa de pintura",
            "Un tipo de película"
        ],
        correct: "Un programa de animación 3D",
        theory: "Cinema 4D es un software utilizado para crear gráficos en 3D y animaciones."
    },
    {
        text: "¿Qué significa '3D'?",
        options: [
            "Tres dimensiones",
            "Tres días",
            "Tres dibujos",
            "Tres decoraciones",
            "Tres datos"
        ],
        correct: "Tres dimensiones",
        theory: "3D se refiere a objetos que tienen altura, ancho y profundidad."
    },
    {
        text: "¿Cuál es un elemento básico que se puede crear en Cinema 4D?",
        options: [
            "Una línea",
            "Un cubo",
            "Un sonido",
            "Un texto",
            "Una foto"
        ],
        correct: "Un cubo",
        theory: "Un cubo es una de las formas 3D más simples que puedes crear en Cinema 4D."
    },
    {
        text: "¿Qué herramienta se utiliza para mover objetos en Cinema 4D?",
        options: [
            "Herramienta de pincel",
            "Herramienta de mover",
            "Herramienta de seleccionar",
            "Herramienta de texto",
            "Herramienta de pintura"
        ],
        correct: "Herramienta de mover",
        theory: "La herramienta de mover permite ajustar la posición de los objetos en el espacio 3D."
    },
    {
        text: "¿Cómo se llama la vista que te permite ver tu proyecto desde arriba?",
        options: [
            "Vista frontal",
            "Vista lateral",
            "Vista de cámara",
            "Vista superior",
            "Vista de fondo"
        ],
        correct: "Vista superior",
        theory: "La vista superior te da una perspectiva desde arriba de tu escena 3D."
    },
    {
        text: "¿Qué es un 'material' en Cinema 4D?",
        options: [
            "Un color para la pantalla",
            "Un objeto 3D",
            "Una textura que se aplica a objetos",
            "Un sonido",
            "Una herramienta de dibujo"
        ],
        correct: "Una textura que se aplica a objetos",
        theory: "Los materiales se utilizan para darle apariencia a los objetos 3D."
    },
    {
        text: "¿Qué función tiene la animación en Cinema 4D?",
        options: [
            "Cambiar los colores",
            "Hacer que los objetos se muevan",
            "Agrandar los objetos",
            "Dibujar en 2D",
            "Agregar texto"
        ],
        correct: "Hacer que los objetos se muevan",
        theory: "La animación permite dar vida a los objetos en tu escena 3D."
    },
    {
        text: "¿Qué significa 'renderizar'?",
        options: [
            "Imprimir en papel",
            "Crear una imagen final de un proyecto",
            "Guardar el proyecto",
            "Compartir en redes sociales",
            "Borrar objetos"
        ],
        correct: "Crear una imagen final de un proyecto",
        theory: "Renderizar es el proceso de generar la imagen o animación final."
    },
    {
        text: "¿Cuál de estos es un efecto que se puede aplicar en Cinema 4D?",
        options: [
            "Efecto de sonido",
            "Efecto de distorsión",
            "Efecto de iluminación",
            "Efecto de color",
            "Efecto de textura"
        ],
        correct: "Efecto de iluminación",
        theory: "Los efectos de iluminación mejoran la apariencia de tu escena 3D."
    },
    {
        text: "¿Qué hace la 'línea de tiempo' en Cinema 4D?",
        options: [
            "Muestra los colores",
            "Muestra la duración de la animación",
            "Cambia la vista",
            "Guarda el proyecto",
            "Dibuja objetos"
        ],
        correct: "Muestra la duración de la animación",
        theory: "La línea de tiempo permite controlar y ajustar los movimientos de los objetos a lo largo del tiempo."
    },
    {
        text: "¿Qué se puede hacer con la 'cámara' en Cinema 4D?",
        options: [
            "Cambiar de color",
            "Mover la vista de la escena",
            "Crear objetos nuevos",
            "Dibujar en 2D",
            "Guardar el proyecto"
        ],
        correct: "Mover la vista de la escena",
        theory: "La cámara te permite cambiar la perspectiva desde la que se ve la escena."
    },
    {
        text: "¿Cuál de estos objetos es común en animaciones 3D?",
        options: [
            "Un archivo de texto",
            "Un personaje",
            "Una canción",
            "Un documento",
            "Un fondo de pantalla"
        ],
        correct: "Un personaje",
        theory: "Los personajes son elementos centrales en muchas animaciones 3D."
    },
    {
        text: "¿Qué es una 'escena' en Cinema 4D?",
        options: [
            "Un archivo de texto",
            "Un conjunto de objetos y luces",
            "Un sonido",
            "Un fondo",
            "Un color"
        ],
        correct: "Un conjunto de objetos y luces",
        theory: "La escena es el espacio donde se organizan todos los elementos 3D."
    },
    {
        text: "¿Para qué se usan las 'luces' en Cinema 4D?",
        options: [
            "Para dibujar",
            "Para mover objetos",
            "Para iluminar la escena",
            "Para cambiar colores",
            "Para crear textos"
        ],
        correct: "Para iluminar la escena",
        theory: "Las luces son esenciales para darle un aspecto realista a tus objetos."
    },
    {
        text: "¿Qué es un 'keyframe'?",
        options: [
            "Un sonido",
            "Un punto en el tiempo que guarda la posición de un objeto",
            "Un archivo de imagen",
            "Una herramienta de selección",
            "Un tipo de luz"
        ],
        correct: "Un punto en el tiempo que guarda la posición de un objeto",
        theory: "Los keyframes permiten animar objetos a lo largo del tiempo."
    },
    {
        text: "¿Qué se necesita para crear una animación?",
        options: [
            "Un cubo y una luz",
            "Un plano y una cámara",
            "Objetos y keyframes",
            "Un material y un texto",
            "Un sonido y un video"
        ],
        correct: "Objetos y keyframes",
        theory: "Para animar, debes tener objetos y definir su movimiento con keyframes."
    },
    {
        text: "¿Cuál es la primera cosa que debes hacer al empezar un proyecto en Cinema 4D?",
        options: [
            "Elegir un color",
            "Crear un nuevo archivo",
            "Añadir un sonido",
            "Dibujar un objeto",
            "Guardar el proyecto"
        ],
        correct: "Crear un nuevo archivo",
        theory: "Comenzar con un nuevo archivo es esencial para cualquier proyecto."
    }
];


let currentQuestion = 0;
let userResponses = [];
let timeLeft = 1175; // 19:35 en segundos
const timerDisplay = document.getElementById('time');

function updateQuestion() {
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.querySelector('.options');

    questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}:`;
    questionText.textContent = questions[currentQuestion].text;

    optionsContainer.innerHTML = ''; // Limpia las opciones anteriores
    questions[currentQuestion].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option input-wrapper';
        optionElement.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${option}" ${userResponses[currentQuestion] === option ? 'checked' : ''}>
            <label for="option${index}">${String.fromCharCode(65 + index)}. ${option}</label>
        `;

        optionElement.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('bounce');
            });
            optionElement.classList.add('bounce');
        });

        optionsContainer.appendChild(optionElement);
    });
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        alert("¡El tiempo se ha acabado!");
        showResults();
    }
}

const timerInterval = setInterval(updateTimer, 1000);

// Maneja el botón "Siguiente"
document.getElementById('nextButton').addEventListener('click', function() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Por favor, selecciona una respuesta.");
        return;
    }

    userResponses[currentQuestion] = selectedOption.value; // Guarda la respuesta del usuario
    currentQuestion++;

    // Verifica si es la última pregunta
    if (currentQuestion === questions.length) {
        clearInterval(timerInterval);
        showResults(); // Muestra resultados
    } else {
        updateQuestion(); // Actualiza a la siguiente pregunta
    }
});

// Maneja el botón "Saltar pregunta"
document.getElementById('previousButton').addEventListener('click', function() {
    userResponses[currentQuestion] = null; // Marca la pregunta como no respondida
    currentQuestion++;
    
    // Verifica si hay más preguntas
    if (currentQuestion < questions.length) {
        updateQuestion(); // Actualiza la pregunta
    } else {
        clearInterval(timerInterval); // Detiene el temporizador
        showResults(); // Muestra resultados
    }
});

// Nueva función para mostrar resultados
function showResults() {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    resultsContainer.innerHTML = `
        <h2 id="resultsTitle">Estas son tus respuestas : </h2>
        <div class="results-list" id="resultsList">
            ${questions.map((question, index) => `
                <div class="question-result" id="questionResult${index}">
                    <strong>${question.text}</strong><br>
                    <span id="selectedAnswer${index}">Respuesta seleccionada: ${userResponses[index] || 'No respondida'}</span>
                </div>
            `).join('')}
        </div>
        <button id="gradeButton">Calificar</button>
        
    `;

    document.body.innerHTML = ''; // Limpia la página actual
    document.body.appendChild(resultsContainer); // Agrega el contenedor de resultados

    // Añade el evento al botón "Calificar"
    document.getElementById('gradeButton').addEventListener('click', function() {
        console.log("Botón Calificar presionado"); // Verifica si se detecta el clic
        calificar(); // Llama a la función calificar
    });
}

function calificar() {
    const correctAnswers = questions.filter((question, index) => {
        return question.correct === userResponses[index];
    }).length;

    const totalQuestions = questions.length;

    // Calcula la calificación
    const score = (correctAnswers / totalQuestions) * 10; // Calificación sobre 10

    // Mensaje según la calificación
    let finalMessage;
    let restrictAccess = false; // Variable para controlar el acceso

    if (score < 5.0) {
        finalMessage = "¡No te rindas!";
        restrictAccess = true; // Activar restricción
    } else if (score < 9.0) {
        finalMessage = "¡Ya casi lo logras!";
        restrictAccess = true; // Activar restricción
    } else {
        finalMessage = "¡Excelente, lo lograste!";
        localStorage.removeItem('lastAttempt'); // Elimina la restricción si el examen se aprueba
    }

    // Si se activa la restricción, guarda la hora del intento
    if (restrictAccess) {
        localStorage.setItem('lastAttempt', new Date().getTime()); // Guarda la hora actual
    }

    // Muestra los resultados
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';

    // Franja para calificación y aciertos
    resultsContainer.innerHTML = `
        <div class="header-container">
            <h2 id="finalResultsTitle">${finalMessage}</h2>
            <div class="button-container">
                <button class="btn volver">Volver</button>
                <button class="btn finalizar" id="finalizar-btn" style="display: none;">Finalizar</button>
            </div>
        </div>
        <div class="score-container">
            <div class="score">
                ${score.toFixed(2)}<br>
                <span class="label">Calificación</span>
            </div>
            <div class="correct-answers">
                ${correctAnswers} / ${totalQuestions}<br>
                <span class="label">Aciertos</span>
            </div>
        </div>
        <div class="results-list">
            ${questions.map((question, index) => {
                const isCorrect = question.correct === userResponses[index];
                return `
                    <div class="${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? '✔️' : '❌'} ${question.text} <br>
                        Respuesta seleccionada: ${userResponses[index] || 'No respondida'}
                    </div>
                `;
            }).join('')}
        </div>
    `;

    document.body.innerHTML = ''; // Limpia la página actual
    document.body.appendChild(resultsContainer); // Agrega el contenedor de resultados

    // Agrega estilos mediante CSS
    const style = document.createElement('style');
    style.textContent = `
        .header-container {
            display: flex;
            justify-content: space-between; /* Espacio entre el título y los botones */
            align-items: center; /* Centra verticalmente */
            margin-bottom: 20px; /* Espacio abajo del encabezado */
        }

        .score-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 20px 0;
            padding: 10px;
            background-color: rgba(26, 113, 195, 0.432); 
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
            border-radius: 5px;
        }

        .score {
            font-size: 48px;
            font-weight: bold;
            color: #ffffff; /* Color blanco para la calificación */
            text-align: center; /* Centra el texto */
        }
        .correct-answers {
            font-size: 48px;
            font-weight: bold;
            color: #ffffff; /* Color blanco para los aciertos */
            text-align: center; /* Centra el texto */
        }
        .label {
            display: flex;
            justify-content: center; /* Centra la etiqueta */
            margin-top: 5px;
            font-size: 20px;
            color: #cccccc; /* Color gris */
        }
        
        .button-container {
            display: flex;
            align-items: center; /* Centra verticalmente */
        }

        .btn {
            padding: 15px 30px; /* Espaciado interno del botón */
            margin-left: 10px; /* Espacio entre los botones */
            border: none; /* Sin borde */
            border-radius: 8px; /* Esquinas redondeadas */
            cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
            font-size: 20px; /* Tamaño de la fuente */
            font-weight: bold; /* Fuente en negrita */
            transition: background-color 0.3s; /* Transición suave para el fondo */
            background-color: #b8c6ff; /* Color del botón */
            color: rgb(10, 1, 37); /* Color del texto */
        }

        .btn:hover {
            opacity: 0.9; /* Efecto hover */
        }
    `;
    document.head.appendChild(style); // Agrega los estilos al documento

    // Muestra el botón "Finalizar" solo si el usuario tiene 18 aciertos
    const finalizarBtn = document.getElementById('finalizar-btn');
    if (correctAnswers === totalQuestions) {
        finalizarBtn.style.display = 'block'; // Muestra el botón "Finalizar"
    }

    // Añade el evento para el botón "Volver"
    document.querySelector('.volver').addEventListener('click', function() {
        const lastAttempt = localStorage.getItem('lastAttempt');
        const now = new Date().getTime();

        // Si hay un intento anterior y no ha pasado 1 hora (3600000 ms)
        if (lastAttempt && (now - lastAttempt) < 3600000) {
            const remainingTime = 3600000 - (now - lastAttempt);
            const minutes = Math.floor((remainingTime % 3600000) / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            alert(`El examen está restringido. Intenta de nuevo en ${minutes} minutos y ${seconds} segundos.`);
        } else {
            localStorage.setItem('lastAttempt', now); // Guarda la hora actual
            location.reload(); // Recarga la página para reiniciar el cuestionario
        }
    });
}

// Función para iniciar el cronómetro en el inicio
function startCountdown(duration) {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    document.body.appendChild(countdownElement);

    let remainingTime = duration;

    const interval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "¡Tiempo de espera terminado! Puedes volver a intentar el examen.";
            return;
        }

        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        countdownElement.innerHTML = `Tiempo restante: ${minutes} minutos y ${seconds} segundos`;
        remainingTime -= 1000; // Reducir el tiempo en 1 segundo
    }, 1000);
}
// Inicializa la primera pregunta
updateQuestion(); 
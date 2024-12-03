const questions = [
    {
        text: "HTML significa _____________ y se utiliza para estructurar contenido en la web.",
        options: [
            "Hipertexto de Lenguaje",
            "Lenguaje de Marcado de Hipertexto",
            "Lenguaje de Hypertexto",
            "Hipertexto",
            "Lenguaje de Código Web"
        ],
        correct: "Lenguaje de Marcado de Hipertexto",
        theory: "HTML es el lenguaje de marcado utilizado para crear páginas web."
    },
    {
        text: "La etiqueta que se utiliza para crear un enlace es _____________.",
        options: [
            "/ link /",
            "/ a /",
            "/ url /",
            "/ anchor /",
            "/ ref /"
        ],
        correct: "/ a /",
        theory: "La etiqueta <a> se utiliza para enlazar a otras páginas o recursos."
    },
    {
        text: "Para insertar una imagen en un documento HTML, se utiliza la etiqueta _____________.",
        options: [
            "/ picture /",
            "/ img /",
            "/ image /",
            "/ src /",
            "/ photo /"
        ],
        correct: "/ img /",
        theory: "La etiqueta <img> permite mostrar imágenes en las páginas web."
    },
    {
        text: "Los párrafos en HTML se definen con la etiqueta _____________.",
        options: [
            "/ text /",
            "/ p /",
            "/ para /",
            "/ paragraph /",
            "/ block /"
        ],
        correct: "/ p /",
        theory: "La etiqueta <p> se utiliza para crear párrafos y mejorar la legibilidad del texto."
    },
    {
        text: "La etiqueta _____________ se utiliza para crear listas desordenadas en HTML.",
        options: [
            "/ list /",
            "/ ol /",
            "/ ul /",
            "/ item /",
            "/ unordered /"
        ],
        correct: "/ ul /",
        theory: "La etiqueta <ul> se usa para crear listas con viñetas."
    },
    {
        text: "El atributo _____________ se usa en la etiqueta &lt;a&gt; para definir la URL de un enlace.",
        options: [
            "src",
            "href",
            "link",
            "url",
            "target"
        ],
        correct: "href",
        theory: "El atributo href indica la dirección a la que el enlace apunta."
    },
    {
        text: "Para crear un encabezado de nivel 1, se utiliza la etiqueta _____________.",
        options: [
            "/ header /",
            "/ h1 /",
            "/ title /",
            "/ head /",
            "/ h /"
        ],
        correct: "/ h1 /",
        theory: "La etiqueta <h1> se utiliza para el encabezado más importante en una página."
    },
    {
        text: "La etiqueta _____________ se usa para crear una tabla en HTML.",
        options: [
            "/ table /",
            "/ tab /",
            "/ list /",
            "/ data /",
            "/ chart /"
        ],
        correct: "/ table /",
        theory: "La etiqueta <table> permite organizar datos en forma de tabla."
    },
    {
        text: "Los comentarios en HTML se definen utilizando _____________.",
        options: [
            "/* comentario */",
            "/!-- comentario --/",
            "# comentario",
            "// comentario",
            "@comentario"
        ],
        correct: "/!-- comentario --/",
        theory: "Los comentarios se crean con <!-- y -->, y no son visibles en la página."
    },
    {
        text: "La etiqueta _____________ proporciona metadatos sobre un documento HTML.",
        options: [
            "/ info /",
            "/ meta /",
            "/ data /",
            "/ description /",
            "/ head /"
        ],
        correct: "/ meta /",
        theory: "La etiqueta <meta> se utiliza para incluir información que no se muestra en el contenido."
    },
    {
        text: "Para agrupar contenido en un documento, se utiliza la etiqueta _____________.",
        options: [
            "/ section /",
            "/ div /",
            "/ group /",
            "/ block /",
            "/ container /"
        ],
        correct: "/ div /",
        theory: "La etiqueta <div> permite organizar secciones del HTML de forma estructurada."
    },
    {
        text: "La etiqueta _____________ se utiliza para crear un botón en HTML.",
        options: [
            "/ button /",
            "/ input /",
            "/ btn /",
            "/ submit /",
            "/ action /"
        ],
        correct: "/ button /",
        theory: "Puedes usar <button> o <input type=\"button\"> para crear botones interactivos."
    },
    {
        text: "Para incluir un video en HTML, se utiliza la etiqueta _____________.",
        options: [
            "/ video /",
            "/ media /",
            "/ movie /",
            "/ film /",
            "/ clip /"
        ],
        correct: "/ video /",
        theory: "La etiqueta <video> permite insertar contenido de video en una página web."
    },
    {
        text: "El atributo _____________ se utiliza para permitir que un enlace descargue un archivo en lugar de abrirlo.",
        options: [
            "download",
            "href",
            "target",
            "src",
            "url"
        ],
        correct: "download",
        theory: "El atributo download indica que el enlace es para descargar un archivo."
    },
    {
        text: "La etiqueta _____________ se utiliza para crear formularios en HTML.",
        options: [
            "/ form /",
            "/ input /",
            "/ data /",
            "/ submit /",
            "/ field /"
        ],
        correct: "/ form /",
        theory: "La etiqueta <form> permite a los usuarios ingresar datos y enviarlos."
    },
    {
        text: "El atributo _____________ en un enlace define cómo se abrirá (en la misma pestaña o en una nueva).",
        options: [
            "target",
            "href",
            "action",
            "link",
            "method"
        ],
        correct: "target",
        theory: "El atributo target especifica la forma en que se abrirá el enlace."
    },
    {
        text: "La etiqueta _____________ se usa para crear listas ordenadas en HTML.",
        options: [
            "/ ol /",
            "/ ul /",
            "/ list /",
            "/ ordered /",
            "/ item /"
        ],
        correct: "/ ol /",
        theory: "La etiqueta <ol> permite crear listas donde los elementos están numerados."
    },
    {
        text: "Para insertar una línea horizontal en HTML, se utiliza la etiqueta _____________.",
        options: [
            "/ line /",
            "/ hr /",
            "/ break /",
            "/ separator /",
            "/ horizontal /"
        ],
        correct: "/ hr /",
        theory: "La etiqueta <hr> se usa para insertar una línea horizontal."
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
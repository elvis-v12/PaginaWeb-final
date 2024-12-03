const questions = [
    {
        text: "El símbolo _____________ se usa para los comentarios en Python.",
        options: [
            "@",
            "!",
            "#",
            "$",
            "%"
        ],
        correct: "#"
    },
    {
        text: "La forma correcta de crear una variable en Python es _____________.",
        options: [
            "var x = 10",
            "x = 10",
            "let x = 10",
            "create x = 10",
            "define x = 10"
        ],
        correct: "x = 10"
    },
    {
        text: "La función correcta para imprimir algo en pantalla en Python es _____________.",
        options: [
            "display()",
            "print()",
            "show()",
            "output()",
            "escribir()"
        ],
        correct: "print()"
    },
    {
        text: "El tipo de dato que contiene texto en Python es _____________.",
        options: [
            "string",
            "numero",
            "code",
            "list",
            "booleano"
        ],
        correct: "string"
    },
    {
        text: "La palabra clave que se usa para definir una función en Python es _____________.",
        options: [
            "def",
            "create",
            "set",
            "function",
            "new"
        ],
        correct: "def"
    },
    {
        text: "El símbolo que se usa para multiplicar en Python es _____________.",
        options: [
            "+",
            "*",
            "-",
            "/",
            "x"
        ],
        correct: "*"
    },
    {
        text: "El operador que se usa para comparar si dos valores son iguales en Python es _____________.",
        options: [
            "==",
            "=",
            "!=",
            ">",
            ">="
        ],
        correct: "=="
    },
    {
        text: "La estructura que se usa para crear un bucle en Python es _____________.",
        options: [
            "for",
            "if",
            "list",
            "print",
            "break"
        ],
        correct: "for"
    },
    {
        text: "El tipo de dato que representa 'True' o 'False' en Python es _____________.",
        options: [
            "Texto",
            "Número entero",
            "Booleano",
            "Decimal",
            "Lista"
        ],
        correct: "Booleano"
    },
    {
        text: "La notación correcta para crear una lista en Python es _____________.",
        options: [
            "[1, 2, 3]",
            "(1, 2, 3)",
            "{1, 2, 3}",
            "<1, 2, 3>",
            "'1, 2, 3'"
        ],
        correct: "[1, 2, 3]"
    },
    {
        text: "Para manejar errores en Python, se usa la estructura _____________.",
        options: [
            "if-else",
            "try-except",
            "print()",
            "loop",
            "debug"
        ],
        correct: "try-except"
    },
    {
        text: "El comando que se usa para pedir una entrada del usuario en Python es _____________.",
        options: [
            "print()",
            "input()",
            "ask()",
            "display()",
            "enter()"
        ],
        correct: "input()"
    },
    {
        text: "El tipo de dato que representa un texto en Python se llama _____________.",
        options: [
            "string",
            "float",
            "bool",
            "int",
            "list"
        ],
        correct: "string"
    },
    {
        text: "El símbolo _____________ se usa para dividir en Python.",
        options: [
            "+",
            "-",
            "/",
            "*",
            "%"
        ],
        correct: "/"
    },
    {
        text: "El ciclo que se ejecuta mientras una condición es verdadera en Python es _____________.",
        options: [
            "for",
            "while",
            "do-while",
            "loop",
            "if"
        ],
        correct: "while"
    },
    {
        text: "La estructura _____________ se usa para realizar decisiones condicionales en Python.",
        options: [
            "if-else",
            "switch",
            "for",
            "loop",
            "case"
        ],
        correct: "if-else"
    },
    {
        text: "La palabra clave _____________ se usa para detener un bucle en Python.",
        options: [
            "stop",
            "end",
            "break",
            "exit",
            "halt"
        ],
        correct: "break"
    },
    {
        text: "El valor _____________ en Python indica que una variable no tiene valor.",
        options: [
            "null",
            "none",
            "undefined",
            "zero",
            "empty"
        ],
        correct: "none"
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
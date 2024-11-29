const questions = [
    {
        text: "¿Qué es SQL Server?",
        options: [
            "Un lenguaje de programación",
            "Un sistema de gestión de bases de datos",
            "Un servidor web",
            "Un sistema operativo",
            "Un editor de texto"
        ],
        correct: "Un sistema de gestión de bases de datos"
    },
    {
        text: "¿Qué significa SQL?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "Sequential Query Language",
            "Standard Query Language",
            "Special Query Language"
        ],
        correct: "Structured Query Language"
    },
    {
        text: "¿Cuál de estos comandos se usa para seleccionar todos los datos de una tabla en SQL Server?",
        options: [
            "SELECT * FROM nombre_tabla",
            "GET * FROM nombre_tabla",
            "FETCH * FROM nombre_tabla",
            "SHOW * FROM nombre_tabla",
            "FIND * FROM nombre_tabla"
        ],
        correct: "SELECT * FROM nombre_tabla"
    },
    {
        text: "¿Cuál es la sintaxis correcta para crear una base de datos en SQL Server?",
        options: [
            "CREATE DATABASE nombre_base;",
            "NEW DATABASE nombre_base;",
            "MAKE DATABASE nombre_base;",
            "OPEN DATABASE nombre_base;",
            "INIT DATABASE nombre_base;"
        ],
        correct: "CREATE DATABASE nombre_base;"
    },
    {
        text: "¿Qué comando se usa para agregar una nueva columna a una tabla en SQL Server?",
        options: [
            "ADD COLUMN nombre_columna tipo;",
            "CREATE COLUMN nombre_columna tipo;",
            "NEW COLUMN nombre_columna tipo;",
            "INSERT COLUMN nombre_columna tipo;",
            "ALTER TABLE nombre_tabla ADD nombre_columna tipo;"
        ],
        correct: "ALTER TABLE nombre_tabla ADD nombre_columna tipo;"
    },
    {
        text: "¿Cómo se eliminan los datos de una tabla, pero sin borrar la estructura de la tabla?",
        options: [
            "DELETE FROM nombre_tabla;",
            "REMOVE FROM nombre_tabla;",
            "DROP FROM nombre_tabla;",
            "TRUNCATE TABLE nombre_tabla;",
            "CLEAR TABLE nombre_tabla;"
        ],
        correct: "DELETE FROM nombre_tabla;"
    },
    {
        text: "¿Qué comando se utiliza para eliminar una tabla completa en SQL Server?",
        options: [
            "DELETE TABLE nombre_tabla;",
            "REMOVE TABLE nombre_tabla;",
            "DROP TABLE nombre_tabla;",
            "CLEAR TABLE nombre_tabla;",
            "TRUNCATE TABLE nombre_tabla;"
        ],
        correct: "DROP TABLE nombre_tabla;"
    },
    {
        text: "¿Qué tipo de dato se utiliza para almacenar cadenas de texto en SQL Server?",
        options: [
            "VARCHAR",
            "TEXT",
            "STRING",
            "CHAR",
            "BLOB"
        ],
        correct: "VARCHAR"
    },
    {
        text: "¿Cómo se realiza una consulta con condiciones en SQL Server?",
        options: [
            "SELECT * WHERE condición;",
            "SELECT * FROM nombre_tabla WHERE condición;",
            "FIND * FROM nombre_tabla WHERE condición;",
            "SHOW * FROM nombre_tabla WHERE condición;",
            "GET * FROM nombre_tabla WHERE condición;"
        ],
        correct: "SELECT * FROM nombre_tabla WHERE condición;"
    },
    {
        text: "¿Cómo se ordenan los resultados de una consulta de manera ascendente en SQL Server?",
        options: [
            "ORDER BY columna ASC;",
            "SORT BY columna ASC;",
            "GROUP BY columna ASC;",
            "ARRANGE BY columna ASC;",
            "SELECT BY columna ASC;"
        ],
        correct: "ORDER BY columna ASC;"
    },
    {
        text: "¿Qué comando se utiliza para insertar datos en una tabla en SQL Server?",
        options: [
            "INSERT INTO nombre_tabla VALUES();",
            "ADD INTO nombre_tabla VALUES();",
            "CREATE INTO nombre_tabla VALUES();",
            "PUT INTO nombre_tabla VALUES();",
            "INSERT VALUES INTO nombre_tabla();"
        ],
        correct: "INSERT INTO nombre_tabla VALUES();"
    },
    {
        text: "¿Qué tipo de datos se usa para almacenar fechas y horas en SQL Server?",
        options: [
            "DATE",
            "TIME",
            "DATETIME",
            "TIMESTAMP",
            "ALL OF THE ABOVE"
        ],
        correct: "ALL OF THE ABOVE"
    },
    {
        text: "¿Cómo se modifica un valor de una columna en SQL Server?",
        options: [
            "UPDATE nombre_tabla SET columna = valor WHERE condición;",
            "CHANGE nombre_tabla SET columna = valor WHERE condición;",
            "MODIFY nombre_tabla SET columna = valor WHERE condición;",
            "ALTER nombre_tabla SET columna = valor WHERE condición;",
            "EDIT nombre_tabla SET columna = valor WHERE condición;"
        ],
        correct: "UPDATE nombre_tabla SET columna = valor WHERE condición;"
    },
    {
        text: "¿Qué significa una clave primaria (PRIMARY KEY) en SQL Server?",
        options: [
            "Es un valor único para cada fila de la tabla.",
            "Es una columna que puede tener valores duplicados.",
            "Es una columna que no puede tener valores nulos.",
            "Es una columna que siempre tiene valores nulos.",
            "Es una columna que contiene texto."
        ],
        correct: "Es un valor único para cada fila de la tabla."
    },
    {
        text: "¿Cómo se vinculan dos tablas en SQL Server?",
        options: [
            "Usando JOIN",
            "Usando LINK",
            "Usando CONNECT",
            "Usando COMBINE",
            "Usando RELATE"
        ],
        correct: "Usando JOIN"
    },
    {
        text: "¿Qué comando se utiliza para crear un índice en una tabla en SQL Server?",
        options: [
            "CREATE INDEX nombre_indice ON nombre_tabla(columna);",
            "ADD INDEX nombre_indice ON nombre_tabla(columna);",
            "CREATE KEY nombre_indice ON nombre_tabla(columna);",
            "CREATE TABLE nombre_indice ON nombre_tabla(columna);",
            "INSERT INDEX nombre_indice ON nombre_tabla(columna);"
        ],
        correct: "CREATE INDEX nombre_indice ON nombre_tabla(columna);"
    },
    {
        text: "¿Cómo se agrega una restricción para que una columna no acepte valores nulos en SQL Server?",
        options: [
            "NOT NULL",
            "NULL",
            "UNIQUE",
            "PRIMARY KEY",
            "CHECK"
        ],
        correct: "NOT NULL"
    },
    {
        text: "¿Qué hace el comando `SELECT COUNT(*)` en SQL Server?",
        options: [
            "Cuenta el número de columnas en una tabla",
            "Cuenta el número de registros en una tabla",
            "Selecciona todos los registros de una tabla",
            "Cuenta los valores nulos en una tabla",
            "Selecciona una columna específica de una tabla"
        ],
        correct: "Cuenta el número de registros en una tabla"
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
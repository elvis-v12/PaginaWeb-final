// Manejo de eventos para los botones de nivel
document.querySelectorAll('.level-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('progress'); // Agrega o quita la clase 'progress'
        const message = document.getElementById('message');
        message.style.display = 'block'; // Muestra el mensaje
        message.classList.add('bounce'); // Aplica el efecto de rebote
    });
});

// Cerrar la ventana de mensaje
function cerrarVentana() {
    document.getElementById('message').style.display = 'none';
}

// Iniciar lección
function iniciarLeccion() {
    mostrarMensaje("Lección iniciada!");
    cerrarVentana();
    showPopup(); // Muestra la ventana emergente con la primera pregunta
}

// Preguntas para el cuestionario
const questions = [
    {
        question: "¿Qué es Node.js?",
        options: [
            "A) Un juego para computadora",
            "B) Un lenguaje de programación",
            "C) Un servidor para ejecutar código de JavaScript",
            "D) Un tipo de videojuego",
            "E) Un navegador de internet"
        ],
        correctAnswer: 2 // Índice de la respuesta correcta (C)
    },
    {
        question: "¿Para qué se utiliza Node.js?",
        options: [
            "A) Para dibujar en la pantalla",
            "B) Para crear páginas web con HTML",
            "C) Para ejecutar JavaScript en el servidor",
            "D) Para escribir texto en el computador",
            "E) Para diseñar videojuegos"
        ],
        correctAnswer: 2 // Índice de la respuesta correcta (C)
    },
    {
        question: "¿Qué es un 'paquete' en Node.js?",
        options: [
            "A) Un regalo",
            "B) Un archivo que contiene un programa o funcionalidad extra",
            "C) Un tipo de comida",
            "D) Un código de error",
            "E) Una página web"
        ],
        correctAnswer: 1 // Índice de la respuesta correcta (B)
    },
    {
        question: "¿Cómo se llama el gestor de paquetes en Node.js?",
        options: [
            "A) npm",
            "B) nodemanager",
            "C) download.js",
            "D) installit",
            "E) package.js"
        ],
        correctAnswer: 0 // Índice de la respuesta correcta (A)

    }
];


let currentQuestionIndex = 0; // Índice de la pregunta actual

// Mostrar la ventana emergente del cuestionario
function showPopup() {
    document.getElementById('question-popup').style.display = 'block';
    loadQuestion(currentQuestionIndex); // Carga la primera pregunta
}

// Cargar pregunta actual
function loadQuestion(index) {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    questionText.innerText = questions[index].question;
    optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

    questions[index].options.forEach((option, i) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.innerText = option;
        button.onclick = () => selectOption(i); // Llama a selectOption con el índice
        optionsContainer.appendChild(button);
    });
}

// Seleccionar opción
function selectOption(optionIndex) {
    const correctAnswerIndex = questions[currentQuestionIndex].correctAnswer;

    if (optionIndex === correctAnswerIndex) {
        mostrarMensaje("¡Respuesta correcta!");
        const currentCircle = document.getElementById(`level${currentQuestionIndex + 1}`);
        currentCircle.style.borderColor = '#7ed321'; // Cambia el color a verde
    } else {
        mostrarMensaje(`Respuesta incorrecta. La respuesta correcta es: ${questions[currentQuestionIndex].options[correctAnswerIndex]}`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex); // Carga la siguiente pregunta
    } else {
        cerrarPregunta();
        mostrarVentanaFinal(); // Llama a la función para mostrar la ventana final
    }
}

// Cerrar ventana de preguntas
function cerrarPregunta() {
    document.getElementById('question-popup').style.display = 'none';
}

// Mostrar ventana final
function mostrarVentanaFinal() {
    const finalPopup = document.getElementById('finalPopup');
    finalPopup.style.display = 'block'; // Muestra la ventana final
}

// Generar certificado
function generarCertificado() {
    var nombre = document.getElementById("nombre").value;
    if (!nombre) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    var canvas = document.getElementById("certificadoCanvas");
    var contexto = canvas.getContext("2d");
    var imagen = new Image();

    // Cargar la imagen del diploma
    imagen.src = "/public/img/ninos/diplomaN.jpg"; // Cambia esto por la ruta real de tu imagen

    imagen.onload = function() {
        // Establecer el tamaño del canvas
        var escala = 0.3; // Ajusta este valor para reducir o aumentar el tamaño (prueba con 0.3 o 0.25)
        canvas.width = imagen.width * escala;
        canvas.height = imagen.height * escala;

        // Dibujar la imagen en el canvas con la escala
        contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);

        // Configurar el estilo del texto
        contexto.font = "15px Franklin"; // Ajusta el tamaño según el nuevo tamaño de la imagen
        contexto.fillStyle = "black";
        contexto.textAlign = "center";

        // Ajustar la posición del texto para que esté más arriba
        var x = canvas.width / 2;
        var y = canvas.height * 0.35; // Cambia este valor para subir el texto (pruébalo con 0.35 o ajusta más)
        contexto.fillText(nombre, x, y);

        // Mostrar el canvas
        canvas.style.display = "block";

        // Generar el enlace para descargar la imagen generada
        var enlace = document.createElement("a");
        enlace.href = canvas.toDataURL("image/jpeg");
        enlace.download = "Certificado_" + nombre + ".jpg";
        enlace.textContent = "Descargar Certificado";
        document.body.appendChild(enlace);
    };
}

// Mostrar mensaje
function mostrarMensaje(texto) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = texto;
    messageElement.style.display = 'block';
}
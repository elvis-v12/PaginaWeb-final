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
        question: "¿Qué es lo primero que haces cuando inicias un proyecto en Cinema 4D?",
        options: [
            "A) Exportar tu proyecto",
            "B) Crear o importar un objeto 3D",
            "C) Colorear el fondo",
            "D) Agregar luces",
            "E) Poner música"
        ],
        correctAnswer: 1 // Índice de la respuesta correcta (B)
    },
    {
        question: "¿Qué herramienta usas en Cinema 4D para mover un objeto?",
        options: [
            "A) La herramienta de selección",
            "B) La herramienta de escalar",
            "C) La herramienta de rotar",
            "D) La herramienta de mover",
            "E) La herramienta de borrar"
        ],
        correctAnswer: 3 // Índice de la respuesta correcta (D)
    },
    {
        question: "¿Qué hace el proceso de 'renderizado' en Cinema 4D?",
        options: [
            "A) Guarda tu proyecto",
            "B) Crea texturas para los objetos",
            "C) Convierte tu escena en una imagen o video",
            "D) Añade música a la animación",
            "E) Borra los objetos no utilizados"
        ],
        correctAnswer: 2 // Índice de la respuesta correcta (C)
    },
    {
        question: "¿Cuál es la mejor opción para darle color y textura a un objeto en Cinema 4D?",
        options: [
            "A) Usar la herramienta de luces",
            "B) Cambiar el tamaño del objeto",
            "C) Agregar materiales",
            "D) Rotar el objeto",
            "E) Usar la herramienta de selección"
        ],
        correctAnswer: 2 // Índice de la respuesta correcta (C)
    },
    {
        question: "Si quieres que tu personaje en Cinema 4D se mueva, ¿qué debes hacer?",
        options: [
            "A) Cambiar el color del personaje",
            "B) Usar la herramienta de cámara",
            "C) Aplicar un material",
            "D) Crear una animación",
            "E) Guardar el proyecto"
        ],
        correctAnswer: 3 // Índice de la respuesta correcta (D)
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
    imagen.src = "/public/img/ninos/diplomaCi.png"; // Cambia esto por la ruta real de tu imagen

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
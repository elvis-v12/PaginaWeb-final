  // Obtener los datos del localStorage con las claves correctas
  const nombre = localStorage.getItem('userName');
  const email = localStorage.getItem('correo');
  
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const submitBtn = document.getElementById('submit-btn');
  const contactForm = document.getElementById('contact-form');
  
  // Comprobar si los datos existen en el localStorage
  if (nombre && email) {
      // Rellenar los campos con los valores del localStorage
      nombreInput.value = nombre;
      emailInput.value = email;
      
      // Bloquear los campos para que no sean editables
      nombreInput.disabled = true;
      emailInput.disabled = true;
      
      // Habilitar el botón de enviar
      submitBtn.disabled = false;
  } else {
      
      // Agregar un eventListener al formulario para redirigir si no hay datos
      contactForm.addEventListener('submit', function(event) {
          // Redirigir a la página de inicio de sesión
          window.location.href = 'iniciar-sesion.html';
          event.preventDefault(); // Evitar el envío del formulario
      });
  }


  // GUARDAR NUEVO MENSAJE
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (enviar por GET)

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Crear un objeto con los datos
    const datosFormulario = {
        nombre_cliente: nombre,
        correo_cliente: email,
        mensaje_cliente: mensaje
    };

    // Enviar los datos a la API utilizando Fetch API
    fetch('http://localhost:3000/api/mensaje/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Aseguramos que el contenido es JSON
        },
        body: JSON.stringify(datosFormulario) // Convertimos el objeto a JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Mostrar un mensaje de éxito
            // Limpiar los campos del formulario
            document.getElementById('contact-form').reset();
        } else {
            alert('Hubo un error al enviar el mensaje.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje.');
    });
});
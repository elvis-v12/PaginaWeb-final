// Mostrar la Bandeja de Entrada
function mostrarBandeja() {
  document.getElementById("bandeja").style.display = "block";
  document.getElementById("redactar").style.display = "none";
  document.getElementById("activos").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "none";
}

// Mostrar Mensajes Activos
function mostrarActivos() {
  document.getElementById("activos").style.display = "block";
  document.getElementById("redactar").style.display = "none";
  document.getElementById("bandeja").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "none";
}

// Mostrar el formulario de Redactar Nuevo Mensaje
function mostrarRedactar() {
  document.getElementById("redactar").style.display = "block";
  document.getElementById("bandeja").style.display = "none";
  document.getElementById("activos").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "none";
}

// Abrir el mensaje desde la Bandeja de Entrada
function abrirMensaje() {
  document.getElementById("bandeja").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "block";
}

// Cerrar el mensaje desde la Bandeja de Entrada
function cerrarMensaje() {
  document.getElementById("mensaje-leido").style.display = "none";
  document.getElementById("bandeja").style.display = "block";
}

// Abrir el mensaje desde los Mensajes Activos
function abrirActivo() {
  document.getElementById("activos").style.display = "none";
  document.getElementById("activo-leido").style.display = "block";
}

// Cerrar el mensaje desde los Mensajes Activos
function cerrarActivo() {
  document.getElementById("activo-leido").style.display = "none";
  document.getElementById("activos").style.display = "block";
}

// Función para borrar un mensaje en la Bandeja de Entrada
function borrarMensaje(button) {
  var row = button.closest("tr");
  row.remove();
}

// Función para borrar un mensaje en los Mensajes Activos
function borrarActivo(button) {
  var row = button.closest("tr");
  row.remove();
}

// Función para formatear la fecha
function formatearFecha(fechaISO) {
  const opciones = {
    weekday: 'long', // 'Monday'
    year: 'numeric', // '2024'
    month: 'long', // 'December'
    day: 'numeric', // '11'
    hour: '2-digit', // '07'
    minute: '2-digit', // '15'
    second: '2-digit', // '13'
    hour12: true, // Usa formato 12 horas (AM/PM)
  };

  const fecha = new Date(fechaISO);
  return fecha.toLocaleString('es-ES', opciones); // 'es-ES' es el idioma español
}



document.addEventListener('DOMContentLoaded', function () {
  // Llamada a la API para obtener los mensajes con estado NULL
  fetch('http://localhost:3000/api/mensaje/bandeja')
    .then(response => response.json())
    .then(data => {
      if (data.mensajes) {
        mostrarMensajes(data.mensajes);
      }
    })
    .catch(error => {
      console.error('Error al obtener los mensajes:', error);
    });
});

// Función para mostrar los mensajes en la tabla
function mostrarMensajes(mensajes) {
  const tbody = document.querySelector('#bandeja tbody');
  
  // Iterar sobre los mensajes que vienen de la API
  mensajes.forEach(mensaje => {
    // Verificar si ya existe la fila para este mensaje
    let tr = document.querySelector(`#mensaje-${mensaje.id_mensaje}`);

    // Si no existe, crear una nueva fila
    if (!tr) {
      tr = document.createElement('tr');
      tr.id = `mensaje-${mensaje.id_mensaje}`;  // Asignar un id único para cada fila

      // Crear las celdas para el nombre, correo, fecha y acciones
      const tdNombre = document.createElement('td');
      tdNombre.textContent = mensaje.nombre_cliente;
      const tdCorreo = document.createElement('td');
      tdCorreo.textContent = mensaje.correo_cliente;
      const tdFecha = document.createElement('td');
      tdFecha.textContent = formatearFecha(mensaje.fecha_envio); // Aplicamos el formato de fecha
      const tdAcciones = document.createElement('td');

      // Crear los botones
      const btnLeer = document.createElement('button');
      btnLeer.textContent = 'Leer';
      btnLeer.onclick = function () { abrirMensaje(mensaje); };

      const btnBorrar = document.createElement('button');
      btnBorrar.textContent = 'Borrar';
      btnBorrar.onclick = function () { borrarMensaje(mensaje.id_mensaje); };

      // Agregar los botones a la celda de acciones
      tdAcciones.appendChild(btnLeer);
      tdAcciones.appendChild(btnBorrar);

      // Agregar todas las celdas a la fila
      tr.appendChild(tdNombre);
      tr.appendChild(tdCorreo);
      tr.appendChild(tdFecha);
      tr.appendChild(tdAcciones);

      // Agregar la fila a la tabla
      tbody.appendChild(tr);
    }
  });
}

// Función para abrir el mensaje
function abrirMensaje(mensaje) {
  idMensajeActual = mensaje.id_mensaje; // Guarda el ID del mensaje actual
  document.getElementById('bandeja').style.display = 'none';
  const mensajeLeido = document.getElementById('mensaje-leido');
  mensajeLeido.style.display = 'block';

  // Llenar los detalles del mensaje
  document.querySelector('.mensaje-titulo').textContent = `MENSAJE: SOPORTE`;
  document.querySelector('#mensaje-leido p:nth-child(2)').textContent = `De: ${mensaje.nombre_cliente}`;
  document.querySelector('#mensaje-leido p:nth-child(3)').textContent = `Correo: ${mensaje.correo_cliente}`;
  document.querySelector('#mensaje-leido p:nth-child(4)').textContent = `Fecha: ${formatearFecha(mensaje.fecha_envio)}`; // Aplicamos el formato de fecha
  document.querySelector('.mensaje-contenido p').textContent = mensaje.mensaje_cliente;
}

// Función para borrar (cerrar) un mensaje y eliminar la fila correspondiente
function borrarMensaje(id_mensaje) {
  console.log('Cerrando mensaje con id:', id_mensaje);  // Debugging

  // Modificar la URL para que pase el id_mensaje como parámetro en la URL
  fetch(`http://localhost:3000/api/mensaje/cerrar/${id_mensaje}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log(data.message); // Mensaje de éxito
      alert('Mensaje cerrado correctamente.');

      // Encontrar y eliminar la fila correspondiente en la tabla
      const fila = document.querySelector(`#mensaje-${id_mensaje}`);
      if (fila) {
        fila.remove();  // Eliminar la fila del DOM
      }
    } else {
      console.log('No se pudo cerrar el mensaje.');
    }
  })
  .catch(error => {
    console.error('Error al cerrar el mensaje:', error);
  });
}








document.addEventListener('DOMContentLoaded', function () {
  // Llamada a la API para obtener los mensajes con estado 'abierto'
  fetch('http://localhost:3000/api/mensaje/activos')
    .then(response => response.json())
    .then(data => {
      if (data.mensajes) {
        mostrarMensajesActivos(data.mensajes);
      }
    })
    .catch(error => {
      console.error('Error al obtener los mensajes activos:', error);
    });
});

// Función para mostrar los mensajes activos en la tabla
function mostrarMensajesActivos(mensajes) {
  const tbody = document.querySelector('#mensajes-activos-table tbody');

  // Iterar sobre los mensajes que vienen de la API
  mensajes.forEach(mensaje => {
    // Verificar si ya existe la fila para este mensaje
    let tr = document.querySelector(`#mensaje-${mensaje.id_mensaje}`);

    // Si no existe, crear una nueva fila
    if (!tr) {
      tr = document.createElement('tr');
      tr.id = `mensaje-${mensaje.id_mensaje}`;  // Asignar un id único para cada fila

      // Crear las celdas para el nombre, correo, fecha y acciones
      const tdNombre = document.createElement('td');
      tdNombre.textContent = mensaje.nombre_cliente;
      const tdCorreo = document.createElement('td');
      tdCorreo.textContent = mensaje.correo_cliente;
      const tdFecha = document.createElement('td');
      tdFecha.textContent = formatearFecha(mensaje.fecha_envio); // Aplicamos el formato de fecha
      const tdAcciones = document.createElement('td');

      // Crear los botones
      const btnLeer = document.createElement('button');
      btnLeer.textContent = 'Leer';
      btnLeer.onclick = function () { abrirActivo(mensaje); };

      const btnBorrar = document.createElement('button');
      btnBorrar.textContent = 'Borrar';
      btnBorrar.onclick = function () { borrarActivo(mensaje.id_mensaje); };

      // Agregar los botones a la celda de acciones
      tdAcciones.appendChild(btnLeer);
      tdAcciones.appendChild(btnBorrar);

      // Agregar todas las celdas a la fila
      tr.appendChild(tdNombre);
      tr.appendChild(tdCorreo);
      tr.appendChild(tdFecha);
      tr.appendChild(tdAcciones);

      // Agregar la fila a la tabla
      tbody.appendChild(tr);
    }
  });
}

// Función para abrir el mensaje activo
function abrirActivo(mensaje) {
  idActivoActual = mensaje.id_mensaje; 
  document.getElementById('activos').style.display = 'none';
  const mensajeLeido = document.getElementById('activo-leido');
  mensajeLeido.style.display = 'block';

  // Llenar los detalles del mensaje activo
  document.querySelector('.mensaje-titulo').textContent = `MENSAJE: SOPORTE`;
  document.querySelector('#remitente-leido-activo').textContent = mensaje.nombre_cliente;
  document.querySelector('#correo-leido-activo').textContent = mensaje.correo_cliente;
  document.querySelector('#fecha-leido-activo').textContent = formatearFecha(mensaje.fecha_envio); // Aplicamos el formato de fecha
  document.querySelector('#contenido-leido-activo').textContent = mensaje.mensaje_cliente;

  // Cargar las respuestas del mensaje activo
  obtenerRespuestas(); // Llama a la función para obtener respuestas
}


// Función para borrar (cerrar) un mensaje y eliminar la fila correspondiente
function borrarActivo(id_mensaje) {
  console.log('Cerrando mensaje con id:', id_mensaje);  // Debugging

  // Modificar la URL para que pase el id_mensaje como parámetro en la URL
  fetch(`http://localhost:3000/api/mensaje/cerrar/${id_mensaje}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log(data.message); // Mensaje de éxito
      alert('Mensaje cerrado correctamente.');

      // Encontrar y eliminar la fila correspondiente en la tabla
      const fila = document.querySelector(`#mensaje-${id_mensaje}`);
      if (fila) {
        fila.remove();  // Eliminar la fila del DOM
      }
    } else {
      console.log('No se pudo cerrar el mensaje.');
    }
  })
  .catch(error => {
    console.error('Error al cerrar el mensaje:', error);
  });
}









let idMensajeActual = null;
let idActivoActual = null;

function mostrarAreaRespuesta() {
  const respuestaContainer = document.querySelector('#respuesta-container');
  respuestaContainer.style.display = 'block';
}

function mostrarAreaRespuestaActivo() {
  const respuestaContainer = document.querySelector('.respuesta-container');
  respuestaContainer.style.display = 'block'; 
}


function guardarRespuesta() {
  const cuerpo_respuesta = document.querySelector('#cuerpo-respuesta').value;

  if (cuerpo_respuesta.trim() === '') {
    alert('Por favor, escribe una respuesta antes de enviar.');
    return;
  }

  fetch(`http://localhost:3000/api/mensaje/respuestas/${idMensajeActual}`, { // Usa el ID del mensaje actual
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cuerpo_respuesta }), // Envía el contenido de la respuesta
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert('Respuesta enviada correctamente');
        cerrarMensaje(); // Cierra el modal del mensaje
      }
    })
    .catch(error => {
      console.error('Error al enviar la respuesta:', error);
    });
}

function guardarRespuestaActivo() {
  const cuerpo_respuesta = document.querySelector('#cuerpo-respuesta-activo').value;

  if (cuerpo_respuesta.trim() === '') {
      alert('Por favor, escribe una respuesta antes de enviar.');
      return;
  }

  fetch(`http://localhost:3000/api/mensaje/respuestas/${idActivoActual}`, { // Usa el ID del activo actual
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cuerpo_respuesta }), // Envía el contenido de la respuesta
  })
  .then(response => response.json())
  .then(data => {
      if (data.message) {
          alert('Respuesta enviada correctamente');
          cerrarActivo(); // Cierra el modal del activo
          // Aquí podrías también llamar a obtenerRespuestas() si quieres recargar las respuestas
          obtenerRespuestas(); // Opcional: recargar respuestas después de enviar
      }
  })
  .catch(error => {
      console.error('Error al enviar la respuesta:', error);
  });
}












async function obtenerRespuestas() {
  console.log('ID Activo Actual:', idActivoActual); // Verificar el valor de idActivoActual

  try {
      const response = await fetch(`http://localhost:3000/api/mensaje/listares/${idActivoActual}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      console.log('Respuesta de la API:', response); // Verificar la respuesta de la API

      if (!response.ok) {
          throw new Error('Error al obtener las respuestas');
      }

      const respuestas = await response.json();
      console.log('Respuestas obtenidas:', respuestas); // Verificar las respuestas recibidas
      cargarRespuestas(respuestas); // Llama a la función para mostrar las respuestas
  } catch (error) {
      console.error('Error:', error);
  }
}

function cargarRespuestas(respuestas) {
  const listaRespuestas = document.getElementById('lista-respuestas');
  listaRespuestas.innerHTML = ''; // Limpiar contenido anterior

  respuestas.forEach((respuesta, index) => {
      const fechaFormateada = new Date(respuesta.fecha_envio).toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });

      const respuestaElement = document.createElement('div');
      respuestaElement.innerHTML = `
          <p><strong>Respuesta ${index + 1}:</strong> ${respuesta.cuerpo_respuesta} <br><em>(${fechaFormateada})</em></p>
      `;
      listaRespuestas.appendChild(respuestaElement);
  });
}
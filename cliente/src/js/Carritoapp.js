// Array para almacenar los planes seleccionados
let carrito = [];

// Selecciona todos los botones de los planes
const botonesPlan = document.querySelectorAll('.boton-plan');
const numerito = document.getElementById('numerito'); // Contador del carrito

// Agregar evento a los botones de los planes
botonesPlan.forEach((boton, index) => {
  boton.addEventListener('click', () => {
    // Obtener datos del plan
    const planDiv = boton.closest('.recuadro');
    const titulo = planDiv.querySelector('.texto-principal').innerText;
    const precio = planDiv.querySelector('.pago').innerText.trim();

    // Crear un objeto para el plan seleccionado
    const planSeleccionado = {
      titulo,
      precio,
    };

    // Agregar el plan al carrito
    carrito.push(planSeleccionado);

    // Actualizar el contador del carrito
    numerito.innerText = carrito.length;

    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Notificación opcional
    alert(`Has agregado el plan "${titulo}" al carrito.`);
  });
});

// Mostrar resumen de compra en pagos.html
document.addEventListener('DOMContentLoaded', () => {
  const resumenContainer = document.getElementById('items-resumen');
  const totalResumen = document.getElementById('total-resumen');

  // Verifica si estamos en la página de resumen de compra
  if (resumenContainer && totalResumen) {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    // Mostrar cada plan en el resumen
    carritoGuardado.forEach(plan => {
      const item = document.createElement('div');
      item.classList.add('item-resumen');
      item.innerHTML = `
        <p><strong>Plan:</strong> ${plan.titulo}</p>
        <p><strong>Precio:</strong> ${plan.precio}</p>
      `;
      resumenContainer.appendChild(item);

      // Sumar al total
      const precioNumerico = parseFloat(plan.precio.replace('S/', '').replace(',', ''));
      total += precioNumerico;
    });

    // Actualizar total en el resumen
    totalResumen.innerText = `Total: S/${total.toFixed(2)}`;
  }
});

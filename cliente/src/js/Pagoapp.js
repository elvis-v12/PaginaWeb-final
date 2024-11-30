document.addEventListener('DOMContentLoaded', () => {
    const resumenContainer = document.getElementById('items-resumen');
    const totalResumen = document.getElementById('total-resumen');

    // Recuperar el carrito de localStorage
    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    // Función para renderizar el resumen dinámicamente
    function renderResumen() {
        resumenContainer.innerHTML = ''; // Limpiar contenido previo
        total = 0; // Reiniciar el total

        carritoGuardado.forEach((plan, index) => {
            const item = document.createElement('div');
            item.classList.add('item-resumen');
            item.innerHTML = `
                <p><strong>Plan:</strong> ${plan.titulo}</p>
                <p><strong>Precio:</strong> ${plan.precio}</p>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            resumenContainer.appendChild(item);

            // Sumar al total
            const precioNumerico = parseFloat(plan.precio.replace('S/', '').replace(',', ''));
            total += precioNumerico;
        });

        // Actualizar el total
        totalResumen.textContent = `Total: S/${total.toFixed(2)}`;

        // Reasignar eventos para eliminar botones
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarElemento);
        });
    }

    // Función para eliminar un elemento del carrito
    function eliminarElemento(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        carritoGuardado.splice(index, 1); // Eliminar del array
        localStorage.setItem('carrito', JSON.stringify(carritoGuardado)); // Guardar cambios
        renderResumen(); // Volver a renderizar el resumen
    }

    // Renderizar el resumen al cargar la página
    renderResumen();
});

function actualizarBoton() {
    const cuotas = document.getElementById('cuotas');
    const pagarBtn = document.getElementById('pagar-btn');
    const total = parseFloat(document.getElementById('total-resumen').textContent.replace('Total: S/', ''));

    if (cuotas.value == "4") {
        pagarBtn.innerHTML = "Pagar 4 Cuotas de S/ " + (total / 4).toFixed(2) + " PEN";
    } else {
        pagarBtn.innerHTML = "Pagar S/ " + total.toFixed(2) + " PEN";
    }
}
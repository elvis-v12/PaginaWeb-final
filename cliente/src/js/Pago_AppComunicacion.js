document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const token = 'tok_test'; // Token simulado de prueba
        const amount = 100; // Monto en dólares (100 equivale a $1.00)

        try {
            const response = await fetch('/api/payments/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    amount,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                alert('Pago procesado exitosamente');
                window.location.href = '/success';
            } else {
                alert(`Error procesando el pago: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al enviar los datos del pago:', error);
            alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
        }
    });
});

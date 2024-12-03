document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.exito) {
            alert(result.mensaje);

            // No se guarda el tipo de CSS en localStorage aquí
            // Solo se informa de que la cuenta ha sido creada

            // Reiniciar el formulario
            this.reset();
        } else {
            alert(result.mensaje);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error en la conexión. Por favor, intenta de nuevo.");
    }
});
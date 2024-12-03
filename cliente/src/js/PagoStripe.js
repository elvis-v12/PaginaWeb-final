document.addEventListener("DOMContentLoaded", () => {
    const stripe = Stripe("pk_test_51Q1H4cRodaQYZrxYzxybKMw54ev4rcVyh9MdwJSPD5DmMQHtLCDVry7f6whX6XNU6Pw7QD4wH2wTmoqNe7ZxYrIv003BaJGgt9"); // Tu clave pública de Stripe
    const elements = stripe.elements();

    const cardElement = elements.create("card", {
        style: {
            base: {
                fontSize: "18px",
                color: "#32325d",
                "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#fa755a" },
        },
    });

    cardElement.mount("#card-element");

    const pagarBtn = document.getElementById("pagar-btn");
    pagarBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const cardName = document.getElementById("nombre")?.value?.trim();
        const total = 139.98;

        if (!cardName) {
            alert("Por favor, ingresa el nombre del titular de la tarjeta.");
            return;
        }

        try {
            const { token, error } = await stripe.createToken(cardElement, { name: cardName });
            if (error) throw new Error(error.message);

            const response = await fetch("http://localhost:3000/api/payments/process-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token.id, amount: total }),
            });

            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

            const data = await response.json();
            if (data.success) {
                alert("Pago procesado exitosamente.");
                window.location.href = "/success";
            } else {
                alert(`Error procesando el pago: ${data.message}`);
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            alert("Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.");
        }
    });
});

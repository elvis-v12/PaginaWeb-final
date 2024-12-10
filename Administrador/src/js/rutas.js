(function () {
  const BASE_URL = "http://localhost:3000/api/datosRutas";
  let rutasSeleccionado = null;

  document.addEventListener("DOMContentLoaded", cargarRutas);

  function cargarRutas() {
    fetch(`${BASE_URL}/rutas`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar las rutas");
        return response.json();
      })
      .then((data) => {
        const tbody = document.querySelector("#tabla-rutas tbody");
        if (!tbody) {
          console.error("Elemento con ID 'tabla-rutas' no encontrado");
          return;
        }
        tbody.innerHTML = ""; // Limpiar tabla

        data.forEach((rutas) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${rutas.id_ruta}</td>
            <td>${rutas.nombre_ruta}</td>
            <td>${rutas.descripcion}</td>
            <td>
              <button onclick="desactivarRutas(${rutas.id_ruta})">Eliminar</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch((error) => {
        mostrarModalMensaje("Error", error.message, "error");
      });
  }

  document.getElementById("form-ruta")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreRuta = document.getElementById("nombre-ruta").value.trim();
    const descripcion = document.getElementById("descripcion-ruta").value.trim();

    if (!nombreRuta || !descripcion) {
      alert("Por favor, llene los campos.");
      return;
    }

    fetch(`${BASE_URL}/rutas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_ruta: nombreRuta, descripcion }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al guardar ruta");
        return response.json();
      })
      .then(() => {
        mostrarModalMensaje("Éxito", "Ruta guardada", "success");
        cargarRutas();
      })
      .catch((error) => {
        mostrarModalMensaje("Error", error.message, "error");
      });
  });
})();
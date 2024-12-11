let barChartInstance = null; // Variable global para almacenar la instancia del gráfico

const API_DASHBOARD_URL = "http://localhost:3000/api/GraficosDash/dashboard";
const API_RUTAS_POPULARES = "http://localhost:3000/api/GraficosDash/rutas-populares";
const API_TENDENCIAS_SUSCRIPCIONES = "http://localhost:3000/api/GraficosDash/suscripciones";

async function cargarGraficos() {
  try {
    const response = await fetch(API_DASHBOARD_URL);
    if (!response.ok) throw new Error("Error al cargar los datos del dashboard");

    const data = await response.json();

    // Actualizar los números de las tarjetas
    document.querySelector(".graficos .box-info li:nth-child(1) h3").textContent = `$${data.suscripciones}`;
    document.querySelector(".graficos .box-info li:nth-child(2) h3").textContent = `$${data.totalCuentas}`;
    document.querySelector(".graficos .box-info li:nth-child(3) h3").textContent = `283`; // Visitas estáticas
    document.querySelector(".graficos .box-info li:nth-child(4) h3").textContent = data.totalDocentes;

    // Generar gráficos
    if (data.rutas) generarGraficoBarras(data.rutas);
    if (data.categorias) generarGraficoDona(data.categorias);
    if (data.cursosPopulares) generarGraficoPie(data.cursosPopulares);

    // Verificar si existen datos para estudiantesTop
    if (data.estudiantesTop) {
      actualizarRanking(data.estudiantesTop);
    } else {
      console.warn("No se encontraron datos para el ranking de estudiantes.");
    }
  } catch (error) {
    console.error("Error al cargar los datos del dashboard:", error);
  }
}

function generarGraficoBarras(rutas) {
  const ctx = document.getElementById("horizontalBarChart").getContext("2d");
  
  // Destruir cualquier gráfico existente para evitar errores
  if (ctx.chart) {
    ctx.chart.destroy();
  }

  ctx.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: rutas.map((ruta) => ruta.nombre_ruta),
      datasets: [
        {
          label: "Estudiantes",
          data: rutas.map((ruta) => ruta.total),
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"],
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y",
    },
  });
}

function generarGraficoDona(categorias) {
  const ctx = document.getElementById("doughnutChart").getContext("2d");

  // Destruir cualquier gráfico existente para evitar errores
  if (ctx.chart) {
    ctx.chart.destroy();
  }

  ctx.chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categorias.map((cat) => cat.nombre_categoria),
      datasets: [
        {
          data: categorias.map((cat) => cat.total),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  });
}

function generarGraficoPie(cursos) {
  const ctx = document.getElementById("pieChart").getContext("2d");

  // Destruir cualquier gráfico existente para evitar errores
  if (ctx.chart) {
    ctx.chart.destroy();
  }

  ctx.chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: cursos.map((curso) => curso.nombre_curso),
      datasets: [
        {
          data: cursos.map((curso) => curso.total),
          backgroundColor: ["#4BC0C0", "#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  });
}

function actualizarRanking(estudiantesTop) {
  const rankingList = document.querySelector(".ranking-list");
  rankingList.innerHTML = estudiantesTop
    .map(
      (estudiante, index) => `
      <li class="${index === 0 ? "top" : ""}">
        <div class="rank">${index + 1}</div>
        <p>${estudiante.nombre_estudiante}</p>
        <span>Cursos completados: ${estudiante.total}</span>
      </li>
    `
    )
    .join("");
}

// Cargar el gráfico de tendencias de suscripciones
async function cargarGraficoSuscripciones() {
  try {
    const response = await fetch(API_TENDENCIAS_SUSCRIPCIONES);
    if (!response.ok) throw new Error("Error al cargar las tendencias de suscripciones");

    const suscripciones = await response.json();

    const ctx = document.getElementById("barChart").getContext("2d");

    // Destruir el gráfico existente si ya está inicializado
    if (barChartInstance) {
      barChartInstance.destroy();
    }

    // Crear el nuevo gráfico
    barChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Básico",
            data: suscripciones.basico,
            backgroundColor: "#4CAF50",
          },
          {
            label: "Medio",
            data: suscripciones.medio,
            backgroundColor: "#FF9800",
          },
          {
            label: "Avanzado",
            data: suscripciones.avanzado,
            backgroundColor: "#2196F3",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Crear leyenda personalizada (si es necesario)
    createLegend(barChartInstance, ".bar-legend");
  } catch (error) {
    console.error("Error al cargar el gráfico de tendencias de suscripciones:", error);
  }
}

// Crear leyenda personalizada
function createLegend(chart, containerSelector) {
  const legendContainer = document.querySelector(containerSelector);
  legendContainer.innerHTML = ""; // Limpiar el contenido anterior

  chart.data.datasets.forEach((dataset, index) => {
    const legendItem = document.createElement("div");
    legendItem.classList.add("legend-item");
    legendItem.innerHTML = `
      <span class="legend-color" style="background-color: ${dataset.backgroundColor}"></span>
      ${dataset.label}
    `;
    legendContainer.appendChild(legendItem);
  });
}

// Cargar gráficos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarGraficos();
  cargarGraficoSuscripciones();
});

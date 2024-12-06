const styles = getComputedStyle(document.documentElement);

// Función para crear la leyenda personalizada
const createLegend = (chart, containerSelector) => {
  const legendContainer = document.querySelector(containerSelector);
  legendContainer.innerHTML = ""; // Limpia cualquier contenido previo

  if (chart.config.type === "bar" || chart.config.type === "horizontalBar") {
    chart.data.datasets.forEach((dataset) => {
      const legendItem = document.createElement("span");
      legendItem.className = "legend-item";
      legendItem.innerHTML = `
        <span class="legend-circle" style="--circle-color: ${dataset.backgroundColor};"></span>
        ${dataset.label}
      `;
      legendContainer.appendChild(legendItem);
    });
  } else {
    chart.data.labels.forEach((label, index) => {
      const color = chart.data.datasets[0].backgroundColor[index];
      const legendItem = document.createElement("span");
      legendItem.className = "legend-item";
      legendItem.innerHTML = `
        <span class="legend-circle" style="--circle-color: ${color};"></span>
        ${label}
      `;
      legendContainer.appendChild(legendItem);
    });
  }
};

// Suscripciones más Demandadas
const barChart = new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Básica",
        data: [200, 300, 250, 400, 350],
        backgroundColor: styles.getPropertyValue("--primary-color"),
      },
      {
        label: "Media",
        data: [300, 250, 400, 300, 450],
        backgroundColor: styles.getPropertyValue("--secondary-color"),
      },
      {
        label: "Expert",
        data: [150, 200, 300, 250, 400],
        backgroundColor: styles.getPropertyValue("--tertiary-color"),
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { display: false } } },
});
createLegend(barChart, ".bar-legend");

// Distribución de Cursos por Categoría
const doughnutChart = new Chart(document.getElementById("doughnutChart"), {
  type: "doughnut",
  data: {
    labels: ["Programación", "Diseño", "Marketing"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: [
          styles.getPropertyValue("--primary-color"),
          styles.getPropertyValue("--secondary-color"),
          styles.getPropertyValue("--tertiary-color"),
        ],
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { display: false } } },
});
createLegend(doughnutChart, ".doughnut-legend");

// Cursos Más Comprados
const pieChart = new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: [
      "Ciberseguridad",
      "Diseño UX/UI",
      "Node.js",
      "React Native",
      "Python",
      "HTML/CSS",
      "SQL",
      "Kotlin",
      "Flutter",
      "Angular",
    ],
    datasets: [
      {
        data: [15, 20, 25, 18, 10, 12, 8, 14, 11, 9],
        backgroundColor: [
          styles.getPropertyValue("--primary-color"),
          styles.getPropertyValue("--secondary-color"),
          styles.getPropertyValue("--tertiary-color"),
          styles.getPropertyValue("--quaternary-color"),
          styles.getPropertyValue("--quinary-color"),
          styles.getPropertyValue("--senary-color"),
          styles.getPropertyValue("--septenary-color"),
          styles.getPropertyValue("--octonary-color"),
          styles.getPropertyValue("--nonary-color"),
          styles.getPropertyValue("--denary-color"),
        ],
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { display: false } } },
});
createLegend(pieChart, ".pie-legend");
// Ingresos Mensuales
const lineChart = new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Ingresos Semanales",
        data: [3000, 4800, 5500, 4500, 4100, 4000, 5600],
        borderColor: styles.getPropertyValue("--quaternary-color"),
        backgroundColor: styles.getPropertyValue("--primary-color"),
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
  },
});
// No llamamos a createLegend() para lineChart

// Rutas de Aprendizaje Populares
const horizontalBarChart = new Chart(
  document.getElementById("horizontalBarChart"),
  {
    type: "bar",
    data: {
      labels: [
        "Desarrollo Web Avanzado",
        "Ciencia de Datos",
        "React Native",
        "Diseño UX/UI",
        "Node.js",
        "Ciberseguridad",
      ],
      datasets: [
        {
          label: "Estudiantes",
          data: [600, 500, 400, 450, 300, 250],
          backgroundColor: [
            styles.getPropertyValue("--primary-color"),
            styles.getPropertyValue("--secondary-color"),
            styles.getPropertyValue("--tertiary-color"),
            styles.getPropertyValue("--quaternary-color"),
            styles.getPropertyValue("--quinary-color"),
            styles.getPropertyValue("--senary-color"),
          ],
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y",
      plugins: { legend: { display: false } },
    },
  }
);
// No llamamos a createLegend() para horizontalBarChart

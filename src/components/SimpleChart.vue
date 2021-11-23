<template>
  <div>
    <canvas id="simple-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

const simpleChartData = {
    type: "line",
    data: {
      labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
      datasets: [
        {
          label: "Number of Moons",
          data: [0, 0, 1, 2, 79, 82, 27, 14],
          backgroundColor: "rgba(54, 73, 93, 0.5)",
          borderColor: "#36495d",
          borderWidth: 3
        },
        {
          label: "Planetary Mass (relative to the Sun x 10^-6)",
          data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
          backgroundColor: "rgba(71, 183, 132, 0.5)",
          borderColor: "#47b784",
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }
        ]
      }
    }
  };

export default {
  name: 'SimpleChart',
  data() {
    return {
      simpleChartData: simpleChartData
    }
  },
  mounted() {
    const ctx = document.querySelector('#simple-chart').getContext('2d');
    new Chart(ctx, this.simpleChartData);
  }
}

</script>
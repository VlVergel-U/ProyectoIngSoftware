<template>
  <div class="w-full max-w-md mx-auto">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

const chartData = ref({
  labels: [],
  datasets: [
{
      label: 'Cantidad',
      backgroundColor: '#1c64f2',
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/viewProduct');
    const products = response.data;
    const categories = [...new Set(products.map(product => product.category_Type))];
    const quantities = categories.map(category => {
      return products.filter(product => product.category_Type === category).length;
    });

    chartData.value.labels = categories;
    chartData.value.datasets[0].label = 'Cantidad'; 
    chartData.value.datasets[0].data = quantities;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
</style>
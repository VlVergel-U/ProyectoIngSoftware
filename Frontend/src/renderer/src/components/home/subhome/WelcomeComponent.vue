<template>
  <div class="h-screen sm:w-[550px] lg:w-auto p-4 overflow-auto">
    <p class="text-start font-bold text-2xl mb-6 mt-2 ml-4" :class="{ 'text-white': !darkMode }">
      Inicio
    </p>
    <!-- Mensaje de Bienvenida -->
    <div class="w-auto h-auto p-4">

      <div class="bg-blue-100 rounded-lg shadow-md p-4" :class="{ 'text-white bg-blue-950': !darkMode }"
      >
        <p class="text-xl font-bold">¡Bienvenido!</p>
        <p class="text-md">
          Aquí puedes ver un resumen de tu actividad reciente y otros detalles importantes.
        </p>
      </div>
    </div>

    <!-- Resumen Diario -->
    <div class="w-auto h-auto p-4">
      <div class="bg-yellow-100 rounded-lg shadow-md p-4" :class="{ 'text-white bg-yellow-900': !darkMode }">
        <p class="text-lg font-bold">Resumen Diario</p>
        <p class="text-md">
          Hoy has vendido un total de {{ dailySales }} productos, generando ingresos de ${{
            dailyRevenue
          }}.
        </p>
      </div>
    </div>

    <div class="flex flex-wrap justify-left w-auto h-auto">
      <!-- Widget de Productos -->
      <div class="w-full md:w-1/2 xl:w-1/4 p-4">
        <div
          class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300" :class="{ 'text-white bg-zinc-800': !darkMode }"
        >
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined"> inventory_2 </span>
            <p class="text-lg font-bold ml-1">Productos</p>
          </div>
          <ul class="overflow-y-auto h-48">
            <li
              v-for="item in widgets[0].data"
              :key="item.id"
              class="py-2 border-b border-gray-200"
            >
              {{ item.id }} - {{ item.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Widget de Ventas -->
      <div class="w-full md:w-1/2 xl:w-1/4 p-4 w-auto h-auto">
        <div
          class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300" :class="{ 'text-white bg-zinc-800': !darkMode }"
        >
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined"> monitoring </span>
            <p class="text-lg font-bold ml-1">Ventas</p>
          </div>
          <ul class="overflow-y-auto h-48">
            <li
              v-for="item in widgets[1].data"
              :key="item.id"
              class="py-2 border-b border-gray-200"
            >
              {{ item.id_shopping }} - {{"$"+ item.final_price }} - {{ item.payment_metod }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Widget de Stock -->
      <div class="w-full md:w-1/2 xl:w-1/4 p-4 w-auto h-auto">
        <div
          class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300" :class="{ 'text-white bg-zinc-800': !darkMode }"
        >
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined"> warehouse </span>
            <p class="text-lg font-bold ml-1">Stock</p>
          </div>
          <p class="text-lg">Total productos: {{ totalStock }}</p>
          <div class="mt-4">
            <p class="text-md font-semibold">Progreso:</p>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div class="text-right">
                  <span class="text-xs font-semibold inline-block text-teal-600">
                    {{ totalStock }} / 1000
                  </span>
                </div>
              </div>
              <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200" :class="{ 'bg-teal-600': !darkMode }">
                <div
                  :style="{ width: `${(totalStock / 1000) * 100}%` }"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Widget de Facturas -->
      <!-- <div class="w-full md:w-1/2 xl:w-1/4 p-4">
        <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center mb-2">
            <i class="fas fa-file-invoice text-xl mr-2"></i>
            <p class="text-lg font-bold">Facturas</p>
          </div>
          <ul class="overflow-y-auto h-48">
            <li v-for="item in widgets[3].data" :key="item.id" class="py-2 border-b border-gray-200">
              {{ item.id }} - {{ item.date }}
            </li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()
const darkMode = computed(() => store.state.darkMode)

const widgets = ref([
  { title: 'Productos', type: 'list', data: [] },
  { title: 'Ventas', type: 'list', data: [] },
  { title: 'Stock', type: 'text', data: 0 }
])

const totalStock = ref(0)

onMounted(async () => {
  try {
    const responses = await Promise.all([
      axios.get('http://localhost:3000/viewProduct').catch((error) => {
        console.error('Error fetching products:', error)
        return { data: [] }
      }),
      axios.get('http://localhost:3000/viewShopping').catch((error) => {
        console.error('Error fetching sales:', error)
        return { data: [] }
      }),
    ])

    widgets.value[0].data = responses[0].data
    totalStock.value = responses[0].data.reduce((acc, product) => acc + product.stock, 0)

    widgets.value[1].data = responses[1].data
    widgets.value[3].data = responses[2].data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="h-screen lg:m-14">
    <div class="sm:w-[550px] lg:w-auto space-y-4 sm:max-h-[80vh] overflow-y-auto scrollbar-width: thin; scrollbar-color: gray dark-gray;">
      <!-- Encabezado -->
      <div class="p-4 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-center">Bienvenido al Sistema de Inventario de SoloCauchos</h1>
        <p class="mt-2 text-center">Bienvenido al Sistema de Inventario de SoloCauchos, tu solución integral para la gestión de inventarios. A continuación, te presentamos las principales funcionalidades de nuestra plataforma:</p>
      </div>
      
      <!-- Widget de Gestión de Productos -->
      <div class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold">Gestión de Productos</h2>
        <p class="mt-2">Administra tu inventario de productos de forma sencilla. Puedes agregar nuevos productos, actualizar la información de los existentes y mantener un control sobre el stock disponible.</p>
      </div>
      
      <!-- Widget de Gestión de Clientes -->
      <div class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold">Gestión de Clientes</h2>
        <p class="mt-2">Lleva un registro detallado de tus clientes. Agrega nuevos clientes, actualiza sus datos y accede a su historial de compras para ofrecer un servicio más personalizado.</p>
      </div>
      
      <!-- Widget de Gestión de Facturas -->
      <div class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold">Gestión de Facturas</h2>
        <p class="mt-2">Genera y administra facturas de manera eficiente. Emite facturas para tus ventas, lleva un registro de las mismas y facilita el seguimiento de pagos.</p>
      </div>
      
      <!-- Widget de Gestión de Ventas -->
      <div class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold">Gestión de Ventas</h2>
        <p class="mt-2">Controla y gestiona tus ventas diarias. Registra las ventas, consulta el historial y obtén reportes detallados para analizar el rendimiento de tu negocio.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const darkMode = computed(() => store.state.darkMode)
</script>
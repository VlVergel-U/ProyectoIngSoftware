<template>
    <div class="flex flex-col items-center justify-center">
      <div class="text-center w-full">
        <div class="rounded-t-xl h-48 flex justify-center items-center">
          <h1 class="text-4xl font-bold mb-6" :class="darkMode ? 'text-gray-800' : 'text-gray-200'">
            Bienvenido al Sistema de Inventario de SoloCauchos
          </h1>
          <p class="text-lg mb-6 text-justify p-10" :class="darkMode ? 'text-gray-700' : 'text-gray-300'">
            Bienvenido al Sistema de Inventario de SoloCauchos, tu solución integral para la gestión de inventarios. 
            A continuación, te presentamos las principales funcionalidades de nuestra plataforma:
          </p>
        </div>
  
        <div
          class="text-left flex px-10 text-justify"
          :class="darkMode ? 'text-gray-700' : 'text-gray-300'"
        >
          <h2 class="text-2xl font-semibold mr-6">Gestión de Productos</h2>
          <p class="mb-6">
            Administra tu inventario de productos de forma sencilla. Puedes agregar nuevos productos,
            actualizar la información de los existentes y mantener un control sobre el stock
            disponible.
          </p>
  
  
          <h2 class="text-2xl font-semibold mx-6">Gestión de Clientes</h2>
          <p class="mb-6">
            Lleva un registro detallado de tus clientes. Agrega nuevos clientes, actualiza sus datos y
            accede a su historial de compras para ofrecer un servicio más personalizado.
          </p>
  
    
          <h2 class="text-2xl font-semibold mx-6">Gestión de Facturas</h2>
          <p class="mb-6">
            Genera y administra facturas de manera eficiente. Emite facturas para tus ventas, lleva un
            registro de las mismas y facilita el seguimiento de pagos.
          </p>
  
          <h2 class="text-2xl font-semibold mx-6">Gestión de Ventas</h2>
          <p class="mb-6">
            Controla y gestiona tus ventas diarias. Registra las ventas, consulta el historial y obtén
            reportes detallados para analizar el rendimiento de tu negocio.
          </p>
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
  
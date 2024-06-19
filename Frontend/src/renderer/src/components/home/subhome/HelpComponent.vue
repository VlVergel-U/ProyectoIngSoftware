<template>
  <div
    class="modal-content fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-gray-950 bg-opacity-40 inset-0 animate-fade-in-up duration-75 delay-300"
  >
    <div
      class="bg-zinc-700 p-4 rounded-xl w-[450px] h-auto text-center shadow-md shadow-black"
    >
      <button class="close-button absolute text-white ml-44" @click="closeForm">
        <svg class="close-icon w-6 h-6 fill-gray-600" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4 text-gray-200 mt-6">
        Por favor, indique en qué área necesita asistencia
      </h2>
      <div class="mt-10 mb-8">
        <select
          v-model="selectedValue"
          class="select-menu bg-primary hover:bg-primary-hover text-gray-200 py-2 px-4 rounded"
          @change="showHelpContent"
        >
          <option value="" disabled selected>Seleccione una opción</option>
          <option value="client">Gestión de Clientes</option>
          <option value="billing">Facturación</option>
          <option value="inventory">Inventario</option>
          <option value="sales">Ventas</option>
        </select>
      </div>
      <div v-if="selectedValue" class="modal-body info-content" :class="{ block: showInfoContent }">
        <p id="infoText" class="info-text text-gray-600 mb-4">{{ infoText }}</p>
        <button
          class="submit-button bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded mb-2"
          @click="backToMenu"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const selectedValue = ref('')
const infoText = ref('')
const emit = defineEmits(['closeForm'])

function closeForm() {
const modal = document.querySelector('.modal-content')
  modal.classList.add('animate-fade-out-up')

  setTimeout(() => {
    emit('closeForm')
  }, 300) 
}

function showHelpContent() {
  switch (selectedValue.value) {
    case 'client':
      infoText.value = 'Aquí va la información de gestión de clientes.'
      break
    case 'billing':
      infoText.value = 'Aquí va la información de facturación.'
      break
    case 'inventory':
      infoText.value = 'Aquí va la información de inventario.'
      break
    case 'sales':
      infoText.value = 'Aquí va la información de ventas.'
      break
    default:
      infoText.value = ''
  }
}

function backToMenu() {
  selectedValue.value = ''
}
</script>

<template>
  <div
    class="modal-container overflow-hidden fixed inset-0 flex items-center justify-center w-auto h-auto animate-fade-in-up duration-75 delay-300"
  >
    <div class="bg-gray-950 bg-opacity-40 fixed inset-0"></div>
    <div class="z-50">
      <div
        class="relative shadow-xl shadow-gray-600 transition duration-300 rounded-lg bg-white w-96"
        :class="{ 'bg-zinc-600 shadow-gray-950': !darkMode }"
      >
        <button
          class="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          :class="{ 'text-white': !darkMode }"
          @click="closeForm"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2
          class="text-2xl font-semibold mb-4 pt-8 text-center"
          :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
        >
          Agregar Venta
        </h2>
        <form class="px-10 py-4" @submit.prevent="submitForm">
          <div class="mb-4 text-left">
            <label
              for="documentClient"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Documento del cliente <span class="text-red-600">*</span>
            </label>

            <input
              id="documentClient"
              v-model="documentClient"
              type="text"
              name="documentClient"
              required
              min="10"
              max="10"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="productName"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Nombre del producto <span class="text-red-600">*</span>
            </label>
            <input
              id="productName"
              v-model="productName"
              type="text"
              name="productName"
              required
              min="4"
              max="40"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>

          <div class="mb-4 text-left">
            <label
              for="amount"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Cantidad <span class="text-red-600">*</span>
            </label>
            <input
              id="amount"
              v-model="amount"
              type="number"
              name="amount"
              step="1"
              required
              min="1"
              max="40"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="date_shopping"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Fecha de la venta <span class="text-red-600">*</span>
            </label>
            <input
              id="date_shopping"
              v-model="date_shopping"
              type="datetime-local"
              name="date_shopping"
              required
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-8 text-left">
            <label
              for="payment_metod"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Método de pago <span class="text-red-600">*</span>
            </label>
            <select
              id="payment_metod"
              v-model="payment_metod"
              name="payment_metod"
              required
              class="mt-1 block w-full border border-gray-200 h-8 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            >
              <option value="Tarjeta">Tarjeta</option>
              <option value="Nequi">Nequi</option>
              <option value="Crediservir">Crediservir</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>

          <div class="flex justify-center">
            <button type="submit" class="text-white px-4 py-2 rounded font-semibold bg-primary">
              Agregar
            </button>
            <button
              type="button"
              class="ml-4 text-white px-4 py-2 rounded font-semibold"
              :class="{ 'bg-gray-400': darkMode, 'bg-gray-500': !darkMode }"
              @click="closeForm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import { defineEmits } from 'vue'

const emit = defineEmits(['close-form', 'sell-added'])
const store = useStore()
const darkMode = computed(() => store.state.darkMode)
const productName = ref('')
const date_shopping = ref(null)
const amount = ref(null)
const documentClient = ref('')
const payment_metod = ref('')
const errorMessage = ref('')

const closeForm = () => {
  const formContainer = document.querySelector('.modal-container')
  if (formContainer) {
    formContainer.classList.add('animate-fade-out-up')
    setTimeout(() => {
      emit('close-form')
    }, 300)
  } else {
    emit('close-form')
  }
}

const submitForm = async () => {
  errorMessage.value = ''

  if (
    !productName.value ||
    !date_shopping.value ||
    !amount.value ||
    !documentClient.value ||
    !payment_metod.value
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos son obligatorios!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#001b76'
    })
    throw new Error('Todos los campos son obligatorios.')
  }

  if (!Number.isInteger(amount.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La cantidad debe ser un número entero!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#001b76'
    })
    throw new Error('La cantidad debe ser un número entero.')
  }

  if (amount.value < 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La cantidad no puede ser negativa!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#001b76'
    })
    throw new Error('La cantidad no puede ser negativa.')
  }

  try {
    const requestBody = {
      date_shopping: date_shopping.value,
      payment_metod: payment_metod.value,
      productName: productName.value,
      amount: amount.value,
      document: documentClient.value
    };

    console.log('Request body:', requestBody);

    const response = await fetch('http://localhost:3000/addShopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 200) {
      date_shopping.value = null
      payment_metod.value = ''
      productName.value = ''
      amount.value = null
      documentClient.value = ''
      errorMessage.value = ''
      closeForm()
      Swal.fire({
        title: 'Bien!',
        text: 'Venta agregada exitosamente!',
        icon: 'success'
      })
      emit('sell-added')
    } else if (response.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay stock disponible para este producto.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#001b76'
      })
    } else if (response.status === 404) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El producto no existe.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#001b76'
      })
    } else if (response.status === 405) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El cliente no existe.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#001b76'
      })
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al agregar la venta. Intente nuevamente.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#001b76'
    })
  }
}
</script>

<style></style>

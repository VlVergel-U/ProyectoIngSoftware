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
          Agregar Producto
        </h2>
        <form class="px-10 py-4" @submit.prevent="submitForm">
          <div class="mb-4 text-left">
            <label
              for="name"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Nombre <span class="text-red-600">*</span>
            </label>

            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              required
              min="10"
              max="40"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="shopping_price"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
            >
              Precio de compra <span class="text-red-600">*</span>
            </label>
            <input
              id="shopping_price"
              v-model="shopping_price"
              type="number"
              name="shopping_price"
              step="1000"
              required
              min="1000"
              max="99999999"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="sale_price"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Precio de venta <span class="text-red-600">*</span>
              </label
            >
            <input
              id="sale_price"
              v-model="sale_price"
              type="number"
              name="sale_price"
              step="1000"
              required
              min="1000"
              max="99999999"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
         
          <div class="mb-4 text-left">
            <label
              for="stock"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Stock <span class="text-red-600">*</span>
              </label
            >
            <input
              id="stock"
              v-model="stock"
              type="number"
              name="stock"
              required
              min="1"
              max="2147483647"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="trademark"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Marca Comercial <span class="text-red-600">*</span>
              </label
            >
            <input
              id="trademark"
              v-model="trademark"
              type="text"
              name="trademark"
              required
              min="5"
              max="20"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left pb-4">
            <label
              for="category"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Categoría <span class="text-red-600">*</span>
              </label
            >
            <select
              id="category"
              v-model="category"
              required
              name="category"
              class="mt-1 block w-full border border-gray-200 h-8 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            >
              <option value="" disabled selected style="color: gray">Selecciona categoría</option>
              <option value="1">Manijas</option>
              <option value="2">Cauchos</option>
              <option value="3">Pines</option>
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

const emit = defineEmits(['close-form', 'product-added'])
const store = useStore()
const darkMode = computed(() => store.state.darkMode)
const name = ref('')
const shopping_price = ref(null)
const sale_price = ref(null)
const stock = ref(null)
const trademark = ref('')
const category = ref('')
const errorMessage = ref('')

const closeForm = () => {
  const formContainer = document.querySelector('.modal-container');
  if (formContainer) {
    formContainer.classList.add('animate-fade-out-up');
    setTimeout(() => {
      emit('close-form');
    }, 300); 
  } else {
    emit('close-form');
  }
}

const submitForm = async () => {
  errorMessage.value = ''

  if (
    !name.value ||
    !shopping_price.value ||
    !sale_price.value ||
    !stock.value ||
    !trademark.value ||
    !category.value
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

  if (
    !Number.isInteger(shopping_price.value) ||
    !Number.isInteger(sale_price.value) ||
    !Number.isInteger(stock.value)
  ) {
    console.log(sale_price)
    console.log(shopping_price)
    console.log(stock)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los precios y el stock deben ser números enteros!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#001b76'
    })
    throw new Error('Los precios y el stock deben ser números enteros.')
  }

  if (shopping_price.value < 0 || sale_price.value < 0 || stock.value < 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los precios y el stock no pueden ser negativos!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#001b76'
    })
    throw new Error('Los precios y el stock no pueden ser negativos.')
  }

  const response = await fetch('http://localhost:3000/addProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      shopping_price: shopping_price.value,
      sale_price: sale_price.value,
      stock: stock.value,
      trademark: trademark.value,
      category_Type: category.value
    })
  })
  if (response.ok) {
    name.value = ''
    shopping_price.value = null
    sale_price.value = null
    stock.value = null
    trademark.value = ''
    category.value = ''
    errorMessage.value = ''
    closeForm()
    Swal.fire({
      title: 'Bien!',
      text: 'Producto agregado exitosamente!',
      icon: 'success'
    })
    emit('product-added')
  } else {
    throw new Error('Error en la solicitud.')
  }
}
</script>

<style></style>

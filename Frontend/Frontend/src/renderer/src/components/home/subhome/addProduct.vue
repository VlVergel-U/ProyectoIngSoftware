<template>
  <div class="overflow-hidden fixed inset-0 flex items-center justify-center">
    <div class="bg-transparent fixed inset-0"></div>
    <div class="z-50">
      <div
        class="relative shadow-lg hover:shadow-xl transition duration-300 rounded-lg bg-white w-96"
        :class="{ 'bg-zinc-600': !darkMode }"
      >
        <button
          @click="closeForm"
          class="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          :class="{ 'text-gray-100': !darkMode }"
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
        <h2 class="text-2xl font-semibold mb-4 pt-8"  :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}">Agregar Producto</h2>
        <form @submit.prevent="submitForm" class="px-10 py-4">
          <div class="mb-4 text-left">
            <label for="name" class="block text-sm font-medium"  :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}">Nombre</label>
            <input
              type="text"
              v-model="name"
              id="name"
              name="name"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"  :class="{ 'bg-zinc-600 text-white ': !darkMode , 'border-zinc-500': !darkMode}"
            />
          </div>
          <div class="mb-4 text-left">
            <label for="shopping_price" class="block text-sm font-medium"  :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}"
              >Precio de compra</label
            >
            <input
              type="number"
              v-model="shopping_price"
              id="shopping_price"
              name="shopping_price"
              step="0.01"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" :class="{ 'bg-zinc-600 text-white ': !darkMode , 'border-zinc-500': !darkMode}"
            />
          </div>
          <div class="mb-4 text-left">
            <label for="sale_price" class="block text-sm font-medium" :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}"
              >Precio de venta</label
            >
            <input
              type="number"
              v-model="sale_price"
              id="sale_price"
              name="sale_price"
              step="0.01"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" :class="{ 'bg-zinc-600 text-white ': !darkMode , 'border-zinc-500': !darkMode}"
            />
          </div>
          <div class="mb-4 text-left">
            <label for="stock" class="block text-sm font-medium"  :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}">Stock</label>
            <input
              type="number"
              v-model="stock"
              id="stock"
              name="stock"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" :class="{ 'bg-zinc-600 text-white ': !darkMode , 'border-zinc-500': !darkMode}"
            />
          </div>
          <div class="mb-4 text-left">
            <label for="trademark" class="block text-sm font-medium"  :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}"
              >Marca comercial</label
            >
            <input
              type="text"
              v-model="trademark"
              id="trademark"
              name="trademark"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" :class="{ 'bg-zinc-600 text-white ': !darkMode , 'border-zinc-500': !darkMode}"
            />
          </div>
          <div class="mb-4 text-left pb-4">
            <label for="category" class="block text-sm font-medium"  :class="{'text-gray-800': darkMode, 'text-gray-100':!darkMode}">Categoría</label>
            <select
              v-model="category_Type"
              id="category"
              name="category"
              class="mt-1 block w-full border border-gray-200 h-8 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" :class="{ 'bg-zinc-600 text-white ': !darkMode , 'border-zinc-500': !darkMode}"
            >
              <option value="" disabled selected style="color: gray">Selecciona categoría</option>
              <option value="1">Manijas</option>
              <option value="2">Cauchos</option>
              <option value="3">Pines</option>
            </select>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="text-white px-4 py-2 rounded font-semibold" :class="{'bg-red-600': darkMode, 'bg-red-800':!darkMode}">
              Agregar
            </button>
            <button
              type="button"
              @click="closeForm"
              class="ml-4 text-white px-4 py-2 rounded font-semibold" :class="{'bg-gray-400': darkMode, 'bg-gray-500':!darkMode}"
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
const category_Type = ref('')
const errorMessage = ref('')

const closeForm = () => {
  emit('close-form')
}

const submitForm = async () => {
  errorMessage.value = ''

  if (
    !name.value ||
    !shopping_price.value ||
    !sale_price.value ||
    !stock.value ||
    !trademark.value ||
    !category_Type.value
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos son obligatorios!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#DC2626'
    })
    throw new Error('Todos los campos son obligatorios.')
  }

  if (
    !Number.isInteger(shopping_price.value) ||
    !Number.isInteger(sale_price.value) ||
    !Number.isInteger(stock.value)
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los precios y el stock deben ser números enteros!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#DC2626'
    })
    throw new Error('Los precios y el stock deben ser números enteros.')
  }

  if (shopping_price.value < 0 || sale_price.value < 0 || stock.value < 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los precios y el stock no pueden ser negativos!',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#DC2626'
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
      category_Type: category_Type.value
    })
  })
  if (response.ok) {
    name.value = ''
    shopping_price.value = null
    sale_price.value = null
    stock.value = null
    trademark.value = ''
    category_Type.value = ''
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

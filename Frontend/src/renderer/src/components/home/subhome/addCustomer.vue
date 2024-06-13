<template>
  <div class="overflow-hidden fixed inset-0 flex items-center justify-center w-auto h-auto">
    <div class="bg-gray-950 bg-opacity-30 fixed inset-0"></div>
    <div class="z-50">
      <div
        class="relative shadow-lg hover:shadow-xl transition duration-300 rounded-lg bg-white w-96"
        :class="{ 'bg-zinc-600': !darkMode }"
      >
        <button
          class="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          :class="{ 'text-gray-100': !darkMode }"
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
          Agregar Cliente
        </h2>
        <form class="px-10 py-4" @submit.prevent="submitForm">
          <div class="mb-4 text-left">
            <label
              for="document"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Documento <span class="text-red-600">*</span>
              </label
            >
            <input
              id="document"
              v-model="document"
              type="text"
              name="document"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="name"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Nombres <span class="text-red-600">*</span>
              </label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="last_name"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Apellidos <span class="text-red-600">*</span>
              </label
            >
            <input
              id="last_name"
              v-model="last_name"
              type="text"
              name="last_name"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="addres"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Dirección <span class="text-red-600">*</span>
              </label
            >
            <input
              id="address"
              v-model="addres"
              type="text"
              name="addres"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left">
            <label
              for="phone"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Celular <span class="text-red-600">*</span>
              </label
            >
            <input
              id="phone"
              v-model="phone"
              type="text"
              name="phone"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
          </div>
          <div class="mb-4 text-left pb-4">
            <label
              for="email"
              class="block text-sm font-medium"
              :class="{ 'text-gray-800': darkMode, 'text-gray-100': !darkMode }"
              >
              Email <span class="text-red-600">*</span>
              </label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              class="mt-1 block w-full border border-gray-200 h-8 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              :class="{ 'bg-zinc-600 text-white ': !darkMode, 'border-zinc-500': !darkMode }"
            />
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

const emit = defineEmits(['close-form', 'customer-added'])
const store = useStore()
const darkMode = computed(() => store.state.darkMode)
const document = ref('')
const name = ref('')
const last_name = ref('')
const addres = ref('')
const phone = ref('')
const email = ref('')
const errorMessage = ref('')

const closeForm = () => {
  emit('close-form')
}

const submitForm = async () => {
  errorMessage.value = ''

  if (
    !document.value ||
    !name.value ||
    !last_name.value ||
    !addres.value ||
    !phone.value ||
    !email.value
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

  const response = await fetch('http://localhost:3000/addCustomer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      document: document.value,
      name: name.value,
      last_name: last_name.value,
      addres: addres.value,
      phone: phone.value,
      email: email.value
    })
  })
  if (response.ok) {
    document.value = ''
    name.value = ''
    last_name.value = ''
    addres.value = ''
    phone.value = ''
    email.value = ''
    errorMessage.value = ''
    closeForm()
    Swal.fire({
      title: 'Bien!',
      text: 'Cliente agregado exitosamente!',
      icon: 'success'
    })
    emit('customer-added')
  } else {
    throw new Error('Error en la solicitud.')
  }
}
</script>

<style></style>

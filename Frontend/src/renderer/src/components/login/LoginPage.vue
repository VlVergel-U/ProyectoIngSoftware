<template>
  <div class="bg-custom h-screen bg-cover bg-center">
    <div class="container mx-auto">
      <div
        class="overflow-hidden font-sans h-screen flex items-center justify-center absolute inset-0 bg-opacity-50 backdrop-blur-[2px] z-0"
      >
        <div
          class="absolute bg-primary rounded-full w-32 h-32 justify-center items-center flex border-2 border-black"
          style="margin-bottom: 460px"
        >
          <img src="../../assets/icon_white.png" alt="IMG" class="w-30 h-14" />
        </div>

        <div
          v-if="mensaje"
          id="mensaje-de-error"
          class="absolute flex -translate-y-80 bg-zinc-900 w-64 h-14 rounded-md items-center justify-center mb-6"
        >
          <p class="text-white text-center font-semibold mb-2 mt-3 select-none mx-4 my-4">
            {{ mensajeTexto }}
          </p>
          <div
            class="w-4 h-4 bg-primary flex items-center justify-center rounded-md absolute right-2 -translate-y-3 border border-zinc-600"
          >
            <span
              class="material-symbols-outlined text-zinc-400 text-sm select-none cursor-pointer"
              @click="mensaje = !mensaje"
              >close</span
            >
          </div>
        </div>

        <form
          class="bg-zinc-950 rounded-lg p-8 space-y-4 w-96 shadow-2xl shadow-black border-2 border-zinc-900"
          @submit.prevent="submitForm"
        >
          <div class="flex flex-col items-center relative mt-10">
            <p class="text-center text-xl font-semibold text-white mb-4">Ingresa Aquí</p>

            <div class="w-72">
              <p class="text-left text-white font-semibold">Usuario</p>
              <div class="relative my-2 mt-2">
                <i
                  class="fa fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                ></i>
                <input
                  v-model="user_name"
                  class="input100 w-full border-b-2 border-solid border-neutral-500 pl-10 bg-zinc-950 py-2 text-white"
                  type="text"
                  name="user"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <p class="text-left text-white font-semibold mt-6">Contraseña</p>
              <div class="relative mt-2">
                <i
                  class="fa fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                ></i>
                <input
                  v-model="poswarrd"
                  class="input100 w-full border-b-2 border-solid border-neutral-500 pl-10 bg-zinc-950 py-2 text-white pr-3"
                  :type="type"
                  name="pass"
                  placeholder="Ingresa tu contraseña"
                />
                <span
                  class="material-symbols-outlined text-gray-400 absolute mt-2 right-2 cursor-pointer select-none"
                  @click="viewPassword"
                >
                  {{ view ? 'visibility' : 'visibility_off' }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              class="w-72 h-12 bg-primary text-white font-semibold rounded-3xl transition duration-300 hover:bg-primary-hover my-4"
            >
              Iniciar sesión
            </button>
          </div>
          <!-- <a
            class="flex justify-center text-primary-hover font-semibold cursor-pointer select-none"
            @click="goToRegister"
            >Registrar usuario</a
          > -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user_name = ref('')
const poswarrd = ref('')
const mensaje = ref(false)
const view = ref(false)
const type = ref('password')
const mensajeTexto = ref('')

const router = useRouter()

const viewPassword = () => {
  view.value = !view.value
  type.value = type.value === 'password' ? 'text' : 'password'
}

const submitForm = () => {
  if (!user_name.value || !poswarrd.value) {
    mensajeTexto.value = 'Por favor, llene todos los campos'
    mensaje.value = true
  } else {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_name: user_name.value, poswarrd: poswarrd.value })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Credenciales incorrectas')
        }
        return response.json()
      })
      .then((data) => {
        if (data.message === 'Usuario autenticado') {
          router.push({ path: `/home` })
        } else {
          mensajeTexto.value = 'Credenciales incorrectas'
          mensaje.value = true
        }
      })
      .catch((error) => {
        console.error('Error de inicio de sesión:', error.message)
        mensajeTexto.value = error.message
        mensaje.value = true
      })
  }
}
</script>

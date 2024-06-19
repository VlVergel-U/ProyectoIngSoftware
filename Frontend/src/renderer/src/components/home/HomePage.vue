<template>
  <div class="h-screen bg-custom flex">
    <!-- Primera Columna -->
    <div class="m-6 w-auto overflow-hidden h-auto flex flex-col">
      <div class="w-48 h-14 ml-2">
        <div
          class="bg-zinc-200 rounded-full w-20 h-20 justify-center items-center flex border-4 border-gray-400"
          style="margin-bottom: 460px"
        >
          <img src="../../assets/icon_blue.png" alt="IMG" class="w-14 h-10" />
        </div>
      </div>

      <!-- Menu -->
      <div class="flex flex-col justify-center h-full lg:mb-6 sm:mb-0">
        <div
          class="w-full bg-transparent h-16 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer overflow-hidden"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 0 }"
          @click="mostrarComponente(0)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">home</span>
          <p class="ml-4 text-gray-400 font-semibold">Inicio</p>
        </div>
        <div
          class="w-full bg-transparent h-16 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 1 }"
          @click="mostrarComponente(1)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">inventory</span>
          <p class="ml-4 text-gray-400 font-semibold">Inventario</p>
        </div>
        <div
          class="w-full bg-transparent h-16 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 2 }"
          @click="mostrarComponente(2)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">person</span>
          <p class="ml-4 text-gray-400 font-semibold">Clientes</p>
        </div>
        <div
          class="w-full bg-transparent h-16 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 3 }"
          @click="mostrarComponente(3)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">storefront</span>
          <p class="ml-4 text-gray-400 font-semibold">Ventas</p>
        </div>
        <div
          class="w-full bg-transparent h-16 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 4 }"
          @click="mostrarComponente(4)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">info</span>
          <p class="ml-4 text-gray-400 font-semibold">Info</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="h-16 flex items-center border-t border-gray-400 mt-auto">
        <div class="flex items-center select-none cursor-pointer">
          <span class="material-symbols-outlined text-gray-400 text-4xl">account_circle</span>
          <p class="font-semibold text-gray-400 ml-3">User</p>
        </div>

        <div
          class="select-none text-2xl text-gray-400 cursor-pointer ml-auto flex items-center"
          @click="toggleDarkMode"
        >
          <span v-if="darkMode" class="material-symbols-outlined absolute">sunny</span>
          <span v-if="!darkMode" class="material-symbols-outlined absolute">dark_mode</span>
        </div>
        <span
          class="material-symbols-outlined text-gray-400 text-2xl select-none cursor-pointer ml-auto"
          @click="signOff"
          >logout</span
        >
      </div>
    </div>

    <!-- Segunda columna -->
    <div
      class="rounded-xl m-6 flex-grow w-auto overflow-hidden h-auto"
      :class="[darkMode ? 'bg-zinc-200' : 'bg-zinc-700']"
    >
      <div class="flex py-4 px-8 items-center w-full mt-2">
        <p class="text-sm text-gray-400 font-semibold select-none">StockCraft - 2024 /</p>
        <p class="text-sm text-primary font-semibold ml-2 select-none">By TeamScrum</p>
        <button
          class="mx-2 ml-auto w-24 h-8 border text-gray-400 border-gray-400 rounded-xl select-none"
          @click="PopUp = !PopUp"
        >
          Ayuda
        </button>
        <button class="ml-4 select-none">
          <span class="material-symbols-outlined text-gray-400"> notifications </span>
        </button>
      </div>

      <!-- Componentes -->
      <div class="m-4 w-auto overflow-hidden h-auto">
        <component
          :is="componente"
          v-for="(componente, index) in componentes"
          v-show="mostrar[index]"
          :key="index"
        ></component>
        <help v-if="PopUp" @close-form="cancel"
        ></help>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InventoryPageVue from './subhome/InventoryPage.vue'
import WelcomeComponentVue from './subhome/WelcomeComponent.vue'
import CustomerPage from './subhome/CustomerPage.vue'
import SellPage from './subhome/SellPage.vue'
import InfoComponent from './subhome/InfoComponent.vue'
import Help from './subhome/HelpComponent.vue'

// Estado
let PopUp = ref(false)
const store = useStore()
const router = useRouter()
const darkMode = computed(() => store.state.darkMode)
const mostrar = ref([true, false, false, false, false])
const componentes = ref([
  WelcomeComponentVue,
  InventoryPageVue,
  CustomerPage,
  SellPage,
  InfoComponent
])

const componenteSeleccionado = ref(0)

// Métodos
const toggleDarkMode = () => {
  store.commit('toggleDarkMode')
}

const saveStateToLocalStorage = () => {
  const state = {
    darkMode: darkMode.value,
    mostrar: mostrar.value,
    componenteSeleccionado: componenteSeleccionado.value
  }
  localStorage.setItem('pageState', JSON.stringify(state))
}

const restoreStateFromLocalStorage = () => {
  const stateString = localStorage.getItem('pageState')
  if (stateString) {
    const state = JSON.parse(stateString)
    if (state.darkMode !== darkMode.value) {
      store.commit('toggleDarkMode')
    }
    mostrar.value = state.mostrar
    componenteSeleccionado.value = state.componenteSeleccionado
  }
}

const signOff = () => {
  localStorage.removeItem('pageState')
  router.push('/login')
}

const mostrarComponente = (index) => {
  componenteSeleccionado.value = index
  mostrar.value = mostrar.value.map(() => false)
  mostrar.value[index] = true
  saveStateToLocalStorage()
}

function cancel() {
  PopUp.value = false
}

// Ciclos de vida
onMounted(() => {
  restoreStateFromLocalStorage()
  window.addEventListener('beforeunload', saveStateToLocalStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveStateToLocalStorage)
})
</script>

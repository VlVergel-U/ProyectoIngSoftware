<template>
  <div class="min-h-screen bg-custom flex overflow-auto">
    <div class="flex flex-col lg:flex-row md:flex-row sm:flex-row xl:flex-row">
      <!-- Primera Columna -->
      <div class="m-6 w-64 lg:w-64 md:w-64 sm:w-40 xl:w-64">
        <div class="w-28 h-14 ml-2">
          <div
            class="bg-zinc-200 rounded-full w-20 h-20 justify-center items-center flex border-4 border-gray-400"
            style="margin-bottom: 460px"
          >
            <img src="../../assets/icon.png" alt="IMG" class="w-16 h-6" />
          </div>
        </div>

        <div
          class="w-full bg-transparent h-16 translate-y-36 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 0 }"
          @click="mostrarComponente(0)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">home</span>
          <p class="ml-4 text-gray-400 font-semibold">Inicio</p>
        </div>
        <div
          class="w-full bg-transparent h-16 translate-y-36 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 1 }"
          @click="mostrarComponente(1)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">inventory</span>
          <p class="ml-4 text-gray-400 font-semibold">Inventario</p>
        </div>
        <div
          class="w-full bg-transparent h-16 translate-y-36 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 2 }"
          @click="mostrarComponente(2)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">receipt_long</span>
          <p class="ml-4 text-gray-400 font-semibold">Facturación</p>
        </div>
        <div
          class="w-full bg-transparent h-16 translate-y-36 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 3 }"
          @click="mostrarComponente(3)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">person</span>
          <p class="ml-4 text-gray-400 font-semibold">Clientes</p>
        </div>
        <div
          class="w-full bg-transparent h-16 translate-y-36 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 4 }"
          @click="mostrarComponente(4)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">storefront</span>
          <p class="ml-4 text-gray-400 font-semibold">Ventas</p>
        </div>
        <div
          class="w-full bg-transparent h-16 translate-y-36 flex items-center rounded-md hover:bg-zinc-700 select-none cursor-pointer mt-2"
          :class="{ 'bg-zinc-900': componenteSeleccionado === 5 }"
          @click="mostrarComponente(5)"
        >
          <span class="material-symbols-outlined ml-4 text-gray-400">info</span>
          <p class="ml-4 text-gray-400 font-semibold">Info</p>
        </div>

        <div class="w-full h-16 flex items-center border-t border-gray-400 translate-y-96">
          <div class="flex items-center select-none cursor-pointer">
            <span class="material-symbols-outlined text-gray-400 text-4xl">account_circle</span>
            <p class="font-semibold text-gray-400 ml-3">User</p>
          </div>

          <div
            class="ml-28 select-none text-2xl text-gray-400 flex justify-center items-center cursor-pointer"
            @click="toggleDarkMode"
          >
            <span v-if="darkMode" class="material-symbols-outlined absolute">sunny</span>
            <span v-if="!darkMode" class="material-symbols-outlined absolute">dark_mode</span>
          </div>

          <span
            class="material-symbols-outlined text-gray-400 text-2xl select-none cursor-pointer ml-8"
            @click="signOff"
            >logout</span
          >
        </div>
      </div>

      <!-- Segunda columna -->
      <div class="rounded-xl m-4 flex-grow" :class="[darkMode ? 'bg-zinc-200' : 'bg-zinc-700']">
        <div class="flex py-4 px-8 items-center w-full mt-2">
          <p class="text-sm text-gray-400 font-semibold select-none">StockCraft - 2024 /</p>
          <p class="text-sm text-red-400 font-semibold ml-2 select-none">By TeamScrum</p>
          <button
            class="mx-2 ml-[1090px] w-24 h-8 border text-gray-400 border-gray-400 rounded-xl select-none"
          >
            Ayuda
          </button>
          <button class="ml-4 select-none">
            <span class="material-symbols-outlined text-gray-400"> notifications </span>
          </button>
        </div>

        <!-- Componentes -->
        <div class="text-center overflow-auto">
          <component
            :is="componente"
            v-for="(componente, index) in componentes"
            v-show="mostrar[index]"
            :key="index"
            class=""
          ></component>
        </div>
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
import BillingPage from './subhome/BillingPage.vue'
import CustomerPage from './subhome/CustomerPage.vue'
import SellPage from './subhome/SellPage.vue'
import InfoComponent from './subhome/InfoComponent.vue'


// Estado
const store = useStore()
const router = useRouter()
const darkMode = computed(() => store.state.darkMode)
const mostrar = ref([true, false, false, false, false, false])
const componentes = ref([
  WelcomeComponentVue,
  InventoryPageVue,
  BillingPage,
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

// Ciclos de vida
onMounted(() => {
  restoreStateFromLocalStorage()
  window.addEventListener('beforeunload', saveStateToLocalStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveStateToLocalStorage)
})
</script>

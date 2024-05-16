<template>
  <div class="h-screen" :class="{ 'bg-zinc-700': darkMode }">
    <div
      class="flex items-center"
      style="height: 8%"
      :class="{ 'bg-blue-900': !darkMode, 'bg-black': darkMode }"
    >
      <img src="../../assets/icon.png" alt="" class="w-10 h-12 ml-4" />
      <p class="text-sm ml-2 font-semibold" :class="{ 'text-black': moon, 'text-white': darkMode }">
        SoloCauchos
      </p>
      <p class="ml-4 mr-4 text-yellow-400 font-bold">|</p>
      <p class="text-yellow-500 font-bold justify-center">SISTEMA DE INVENTARIO</p>

      <div class="ml-auto relative" :class="{ 'text-white': darkMode }">
        <div class="mr-10">
          <button type="button" @click="toggleMenu" class="flex items-center">
            <span class="mr-2 font-semibold">{{ $route.params.username }}</span>
            <i class="fa-solid fa-user"></i>
          </button>
          <div
            v-if="menuOpen"
            class="absolute right-0 mt-10 bg-slate-100 rounded-md shadow-lg"
            :class="{ 'bg-gray-600': darkMode }"
          >
            <button @click="viewInfo" class="block w-full px-4 py-2 text-left font-semibold">
              Ver Información
            </button>
            <button @click="signOff" class="block w-full px-4 py-2 text-left font-semibold">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
      <li
        class="w-16 h-7 p-2 flex items-center justify-center relative rounded-3xl mr-4 cursor-pointer"
        @click="toggleDarkMode"
        :class="{ 'bg-yellow-600': !darkMode, 'bg-blue-950': darkMode }"
      >
        <div class="absolute bg-white w-8 h-6 rounded-full ml-7" v-if="!darkMode"></div>
        <div class="absolute bg-white w-8 h-6 rounded-full mr-7" v-if="darkMode"></div>
      </li>
    </div>

    <div>
      <div class="flex flex-col mt-4 ml-4">
        <button class="flex items-center w-48" @click="addProduct">
          <div class="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full mr-2">
            <i class="fas fa-plus text-black" :class="{ 'text-white': darkMode }"></i>
          </div>
          <span class="font-semibold" :class="{ 'text-white': darkMode }">Agregar Producto</span>
        </button>

        <div class="flex items-center mt-4 mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            v-model="identifier"
            class="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 w-96"
            :class="{ 'bg-zinc-700': darkMode }"
          />
          <button
            class="bg-yellow-500 text-white px-4 py-2 rounded-r-md font-semibold"
            @click="getProduct"
            :class="{ 'bg-yellow-600': darkMode }"
          >
            Buscar
          </button>
          <button
            class="bg-yellow-500 text-white px-4 py-2 rounded font-semibold ml-8"
            @click="getProducts"
            :class="{ 'bg-yellow-600': darkMode }"
          >
            Ver todos los productos
          </button>
          <button
            @click="exportToExcel"
            class="bg-yellow-500 text-white px-4 py-2 rounded font-semibold ml-8"
            :class="{ 'bg-yellow-600': darkMode }"
          >
            Exportar a Excel
          </button>
        </div>
      </div>

      <add-product-page v-if="showAddProductForm" @close-form="cancel" @product-added="updateProductList" class="absolute"></add-product-page>


      <div class="overflow-x-auto">
        <table
          ref="productsTable"
          class="min-w-full divide-y divide-gray-200"
          :class="{ 'divide-gray-200': !darkMode, 'divide-gray-700': darkMode }"
        >
          <thead class="bg-gray-50" :class="{ 'bg-zinc-700': darkMode }">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Id
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Nombre
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Precio de compra
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Precio de venta
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Stock
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Marca comercial
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                :class="{ 'text-white': darkMode }"
              >
                Categoría
              </th>
            </tr>
          </thead>
          <tbody
            :class="{
              'bg-zinc-600': darkMode,
              'bg-white divide-y divide-gray-200': !darkMode,
              'bg-white divide-y divide-gray-700': darkMode,
              'text-slate-300': darkMode
            }"
          >
            <tr v-for="product in products" :key="product.id">
              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.id }}</template>
                <span v-else>{{ product.editableId }}</span>
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.name }}</template>
                <input
                  v-else
                  v-model="product.editableName"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.shopping_price }}</template>
                <input
                  v-else
                  v-model="product.editableShoppingPrice"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.sale_price }}</template>
                <input
                  v-else
                  v-model="product.editableSalePrice"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.stock }}</template>
                <input
                  v-else
                  v-model="product.editableStock"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.trademark }}</template>
                <input
                  v-else
                  v-model="product.editableTrademark"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap select-none">
                <template v-if="!product.editMode">{{ product.category_Type }}</template>
                <input
                  v-else
                  v-model="product.editableCategoryType"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </td>

              <td class="px-6 py-3 text-center whitespace-nowrap">
              </td>
              <td class="px-6 py-3 text-center whitespace-nowrap">
                <button
                  v-if="!product.editMode"
                  @click="enableEditMode(product)"
                  class="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  :class="{ 'bg-teal-800': darkMode }"
                >
                  Modificar
                </button>
                <button
                  v-else
                  @click="saveChanges(product)"
                  class="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
                  :class="{ 'bg-green-800': darkMode }"
                >
                  Guardar
                </button>
                <button
                  v-if="product.editMode"
                  @click="cancelEdit(product)"
                  class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2';
import axios from 'axios';
import AddProductPage from './subhome/addProduct.vue'

export default {
  computed: {
    ...mapState(['darkMode'])
  },
  components: {
    'add-product-page': AddProductPage
  },
  mounted() {
    this.restoreStateFromLocalStorage() // Restaurar el estado cuando el componente se monta
    window.addEventListener('beforeunload', this.saveStateToLocalStorage) // Agregar evento antes de descargar la página
    this.getProducts();
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveStateToLocalStorage) // Quitar evento antes de descargar la página
  },
  data() {
    return {
      menuOpen: false,
      mostrar: [false, false, false],
      mostrarBienvenida: true,
      sun: false,
      moon: true,
      identifier: '',
      view: false,
      products: [],
      showAddProductForm: false // Initialize showAddProductForm
    }
  },
  methods: {
    saveStateToLocalStorage() {
      const state = {
        darkMode: this.darkMode,
        mostrar: this.mostrar,
        mostrarBienvenida: this.mostrarBienvenida
      }
      localStorage.setItem('pageState', JSON.stringify(state))
    },

    enableEditMode(product) {
      product.editMode = true;
      product.editableId = product.id;
      product.editableName = product.name;
      product.editableShoppingPrice = product.shopping_price;
      product.editableSalePrice = product.sale_price;
      product.editableStock = product.stock;
      product.editableTrademark = product.trademark;
      product.editableCategoryType = product.category_Type;
    },

    saveChanges(product) {
      Swal.fire({
        title: "¿Deseas modificar este producto?",
        text: "No se podrán deshacer los cambios realizados",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#facc15",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, modificar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatedProduct = {
            id: product.editableId,
            name: product.editableName,
            shopping_price: product.editableShoppingPrice,
            sale_price: product.editableSalePrice,
            stock: product.editableStock,
            trademark: product.editableTrademark,
            category_Type: product.editableCategoryType
          };

          try {
            await axios.put(`http://localhost:3000/updateProduct/${product.id}`, updatedProduct);
            product.editMode = false;
            Object.assign(product, updatedProduct);
            Swal.fire("Modificado!", "", "success");
          } catch (error) {
            console.error("Error al actualizar producto:", error);
            let errorMessage = "Error al actualizar producto. Por favor, revise los datos y vuelva a intentarlo.";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: errorMessage
            });
            product.editMode = false;
          }
        } else {
          product.editMode = false;
        }
      });
    },

    cancelEdit(product) {
      product.editMode = false;
    },

    async getProducts() {
      try {
        const response = await axios.get('http://localhost:3000/viewProduct');
        this.products = response.data;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },

    restoreStateFromLocalStorage() {
      const stateString = localStorage.getItem('pageState')
      if (stateString) {
        const state = JSON.parse(stateString)
        if (state.darkMode) {
          this.toggleDarkMode()
        }
        if (state.mostrar) {
          this.mostrar = state.mostrar
        }
        if (!state.mostrarBienvenida) {
          this.mostrarBienvenida = state.mostrarBienvenida
        }
      }
    },
    ...mapMutations(['toggleDarkMode']),
    toggleSwitch() {
      this.moon = !this.moon
      this.sun = !this.sun
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    viewInfo() {},
    signOff() {
      this.$router.push('/login')
    },
    addProduct() {
      this.showAddProductForm = true; 
    },
    cancel() {
      this.showAddProductForm = false;
    },
    updateProductList(product) {
      this.products.push(product)
    },
    getProduct() {
      // Implementar lógica para buscar un producto
    },

    exportToExcel() {
      // Implementar lógica para exportar a Excel
    },
    deleteProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId)
    },

  }
}
</script>

<style>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined', sans-serif;
}
</style>

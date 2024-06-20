<template>
  <div class="h-screen sm:w-[550px] lg:w-auto">
    <div class="flex flex-col mt-4 ml-6 w-auto overflow-hidden">
      <p class="text-start font-semibold text-2xl mb-6 mt-2" :class="{ 'text-white': !darkMode }">
        Inventario de Productos
      </p>
      <button class="flex items-center w-auto" @click="showAddProductForm = !showAddProductForm">
        <div
          class="flex items-center justify-center w-8 h-8 bg-primary rounded-full mr-2 hover:bg-primary-hover"
          :class="{ 'bg-dark-primary': !darkMode }"
        >
          <i class="fas fa-plus text-white"></i>
        </div>
        <span class="font-normal" :class="{ 'text-white': !darkMode }">Agregar Producto</span>
      </button>

      <div class="flex items-center mt-4 mb-4">
        <div class="flex items-center w-auto justify-center text-center">
          <input
            v-model="identifier"
            type="text"
            placeholder="Buscar por id o nombre"
            class="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 w-60 h-10"
            :class="{ 'bg-zinc-700 text-white': !darkMode, 'pr-8': close }"
            @input="close = true"
          />
          <span
            v-if="identifier !== ''"
            class="material-symbols-outlined absolute ml-36 cursor-pointer text-gray-600"
            @click="clean"
          >
            close
          </span>
          <button
            class="bg-primary text-white px-4 py-2 rounded-r-md font-normal h-10 hover:bg-primary-hover"
            :class="{ 'bg-dark-primary': !darkMode }"
            @click="getProduct"
          >
            <span class="material-symbols-outlined text-xl cursor-pointer">search</span>
          </button>
        </div>

        <button
          class="bg-primary text-white px-4 py-2 rounded font-normal ml-2 w-auto flex hover:bg-primary-hover"
          :class="{ 'bg-dark-primary': !darkMode }"
          @click="exportToExcel"
        >
          <img src="../../../assets/excel.png" alt="" class="w-6 h-6" />
          <p class="ml-2">Exportar a Excel</p>
        </button>
      </div>
    </div>

    <add-product-page
      v-if="showAddProductForm"
      @close-form="cancel"
      @product-added="getProducts"
    ></add-product-page>

    <div class="overflow-x-auto w-auto sm:h-56 lg:h-auto">
      <table
        ref="productsTable"
        class="min-w-full divide-y divide-gray-200"
        :class="{ 'divide-gray-200': darkMode, 'divide-gray-700': !darkMode }"
      >
        <thead class="bg-gray-50" :class="{ 'bg-zinc-600': !darkMode }">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Id
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Nombre
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Precio de compra
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Precio de venta
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Stock
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Marca comercial
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Categoría
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Acción
            </th>
          </tr>
        </thead>
        <tbody
          :class="{
            'bg-zinc-800': !darkMode,
            'bg-white divide-y divide-gray-200': darkMode,
            'bg-white divide-y divide-gray-700': !darkMode,
            'text-slate-300': !darkMode
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
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!product.editMode">{{ product.shopping_price }}</template>
              <input
                v-else
                v-model="product.editableShoppingPrice"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!product.editMode">{{ product.sale_price }}</template>
              <input
                v-else
                v-model="product.editableSalePrice"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!product.editMode">{{ product.stock }}</template>
              <input
                v-else
                v-model="product.editableStock"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!product.editMode">{{ product.trademark }}</template>
              <input
                v-else
                v-model="product.editableTrademark"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!product.editMode">{{ product.category.Trademark }}</template>
              <select
                v-else
                v-model="product.editableCategoryType"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              >
                <option value="1">Manijas</option>
                <option value="2">Cauchos</option>
                <option value="3">Pines</option>
              </select>
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap">
              <button
                v-if="!product.editMode"
                class=" text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                @click="enableEditMode(product)"
              >
                <span class="material-symbols-outlined flex text-yellow-500 font-semibold hover:text-yellow-400" :class="{ 'text-yellow-600': !darkMode }">  edit_square </span>
              </button>
              <button
                v-else
                class="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
                :class="{ 'bg-green-600': !darkMode }"
                @click="saveChanges(product)"
              >
                Guardar
              </button>
              <button
                v-if="product.editMode"
                class="border border-gray-500 hover:text-gray-700 text-gray-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                :class="{ 'text-white border-white': !darkMode }"

                @click="cancelEdit(product)"
              >
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
import AddProductPage from './addProduct.vue'
import ExcelJS from 'exceljs'

onMounted(() => {
  getProducts()
})

const productsTable = ref(null);
const store = useStore()
const darkMode = computed(() => store.state.darkMode)
let close = ref(false)
const identifier = ref('')
const products = ref([])
const showAddProductForm = ref(false)

function sortTableById() {
  products.value.sort((a, b) => a.id - b.id)
  console.log('sorteado')
}

const enableEditMode = (product) => {
  product.editMode = true
  product.editableId = product.id
  product.editableName = product.name
  product.editableShoppingPrice = product.shopping_price
  product.editableSalePrice = product.sale_price
  product.editableStock = product.stock
  product.editableTrademark = product.trademark
  product.editableCategoryType = product.category_Type
}

const saveChanges = (product) => {
  Swal.fire({
    title: '¿Deseas modificar este producto?',
    text: 'No se podrán deshacer los cambios realizados',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d8a507',
    cancelButtonColor: '#808080',
    confirmButtonText: 'Sí, modificar',
    cancelButtonText: 'Cancelar'
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
      }

      try {
        await axios.put(`http://localhost:3000/updateProduct/${product.id}`, updatedProduct)
        product.editMode = false
        Object.assign(product, updatedProduct)
        Swal.fire({
          title: 'Modificado!',
          text: '',
          icon: 'success',
          confirmButtonColor: '#4ade80'
        })
        getProducts()
      } catch (error) {
        console.error('Error al actualizar producto:', error)
        let errorMessage =
          'Error al actualizar producto. Por favor, revise los datos y vuelva a intentarlo.'
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        })
        product.editMode = false
      }
    } else {
      product.editMode = false
    }
  })
}

const cancelEdit = (product) => {
  product.editMode = false
}

async function getProducts() {
  try {
    const response = await axios.get('http://localhost:3000/viewProduct')
    products.value = response.data
    sortTableById()
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

function cancel() {
  showAddProductForm.value = false
}

const clean = () => {
  close.value = false
  identifier.value = ''
  getProducts()
}

async function getProduct() {
  try {
    let url = ''
    if (!isNaN(identifier.value)) {
      // si es un número
      url = `http://localhost:3000/viewProduct/${identifier.value}`
    } else {
      // si es una cadena
      url = `http://localhost:3000/viewProduct/name/${identifier.value}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error al obtener producto: La solicitud no pudo ser completada.')
    }
    const data = await response.json()
    if (!data || Object.keys(data).length === 0) {
      Swal.fire({
        title: 'Producto no encontrado',
        text: '¿Estás seguro de haber ingresado todos los valores de búsqueda correctamente?',
        icon: 'question',
        confirmButtonColor: '#001b76'
      })
      identifier.value = ''
      throw new Error('No se encontraron resultados para la búsqueda')
    }
    products.value = [data]
  } catch (error) {
    Swal.fire({
      title: 'Error al obtener el producto',
      text: 'Por favor, rectifica los valores de búsqueda ingresados',
      icon: 'error',
      confirmButtonColor: '#001b76'
    })
    console.error('Error al obtener producto:', error)
    identifier.value = ''
  }
}

function exportToExcel() {
  const table = productsTable.value;

  const columnsToSave = 7;
  const tableData = Array.prototype.map.call(table.rows, (row) => {
    return Array.prototype.slice.call(row.cells, 0, columnsToSave).map((cell) => cell.innerHTML);
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Products');

  tableData.forEach((rowData) => {
    worksheet.addRow(rowData);
  });

  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Productos.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
</script>

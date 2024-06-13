<template>
  <div class="h-screen sm:w-[550px] lg:w-auto">
    <div class="flex flex-col mt-4 ml-6 w-auto overflow-hidden">
      <p class="text-start font-semibold text-2xl mb-6 mt-2" :class="{ 'text-white': !darkMode }">
        Gestión de Ventas
      </p>
      <button class="flex items-center w-auto" @click="showAddSellForm = !showAddSellForm">
        <div
          class="flex items-center justify-center w-8 h-8 bg-primary rounded-full mr-2"
          :class="{ 'bg-dark-primary': !darkMode }"
        >
          <i class="fas fa-plus text-white"></i>
        </div>
        <span class="font-normal" :class="{ 'text-white': !darkMode }">Agregar Venta</span>
      </button>

      <div class="flex items-center mt-4 mb-4">
        <div class="flex items-center w-auto justify-center text-center">
          <input
            v-model="identifier"
            type="text"
            placeholder="Buscar por id o documento"
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
            class="bg-primary text-white px-4 py-2 rounded-r-md font-normal h-10"
            :class="{ 'bg-dark-primary': !darkMode }"
            @click="getSell"
          >
            <span class="material-symbols-outlined text-xl cursor-pointer">search</span>
          </button>
        </div>

        <button
          class="bg-primary text-white px-4 py-2 rounded font-normal ml-2 w-auto flex items-center"
          :class="{ 'bg-dark-primary': !darkMode }"
          @click="exportToExcel"
        >
          <img src="../../../assets/excel.png" alt="" class="w-6 h-6" />
          <span class="ml-2">Exportar a Excel</span>
        </button>
      </div>
    </div>

    <add-customer-page
      v-if="showAddCustomerForm"
      @close-form="cancel"
      @customer-added="getSells"
    ></add-customer-page>

    <div class="overflow-x-auto w-auto sm:h-56 lg:h-auto">
      <table
        ref="sellsTable"
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
              Precio Final
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Precio por Unidad
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Fecha
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Método de pago
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Documento Cliente
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
          <tr v-for="sell in sells" :key="sell.id_shopping">
            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.id_shopping }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.final_price }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.unit_price }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.date_shopping }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.payment_metod }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.document }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap">
              <div class="flex items-center justify-center">
                <button
                  class="text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  :class="{ 'bg-yellow-600': !darkMode }"
                  @click="generatePDF"
                >
                  <i class="fa-solid fa-file-pdf text-red-500 text-xl"></i>
                </button>
              </div>
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
import axios from 'axios'
import ExcelJS from 'exceljs'
import jsPDF from 'jspdf'

const sellsTable = ref(null)
const store = useStore()
let close = ref(false)
const darkMode = computed(() => store.state.darkMode)

const identifier = ref('')
const sells = ref([])
const showAddSellForm = ref(false)

onMounted(() => {
  getSells()
})

function sortTableById() {
  sells.value.sort((a, b) => a.id_shopping - b.id_shopping)
}

async function getSells() {
  try {
    const response = await axios.get('http://localhost:3000/viewSell')
    sells.value = response.data
  } catch (error) {
    console.error('Error al obtener ventas:', error)
  }
}

const clean = () => {
  close.value = false
  identifier.value = ''
  getSells()
}

function cancel() {
  showAddSellForm.value = false
}

async function generatePDF() {
  const doc = new jsPDF()
  doc.text('Datos desde la Base de Datos', 10, 10)

  sells.value.forEach((item, index) => {
    const y = 20 + index * 30
    doc.text(`Id Venta: ${item.id_shopping}`, 10, y)
    doc.text(`Fecha Venta: ${item.date_shopping}`, 10, y + 10)
    doc.text(`Precio Unitario: ${item.unit_price}`, 10, y + 20)
    doc.text(`Precio Final: ${item.final_price}`, 10, y + 30)
    doc.text(`Método de Pago: ${item.payment_metod}`, 10, y + 40)
  })

  doc.save('datos_desde_bd.pdf')
}

async function exportToExcel() {
  const table = sellsTable.value

  const columnsToSave = 5
  const tableData = Array.prototype.map.call(table.rows, (row) => {
    return Array.prototype.slice.call(row.cells, 0, columnsToSave).map((cell) => cell.innerHTML)
  })

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sells')

  tableData.forEach((rowData) => {
    worksheet.addRow(rowData)
  })

  worksheet.columns.forEach((column) => {
    let maxLength = 0
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10
      if (columnLength > maxLength) {
        maxLength = columnLength
      }
    })
    column.width = maxLength < 10 ? 10 : maxLength
  })

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Ventas.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
</script>

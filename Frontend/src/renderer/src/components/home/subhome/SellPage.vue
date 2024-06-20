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
            placeholder="Buscar por id"
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

    <add-sell-page
      v-if="showAddSellForm"
      @close-form="cancel"
      @sell-added="getSells"
    ></add-sell-page>

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
              Fecha y Hora
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
              ID Cliente
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Factura
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
              {{ formatDate(sell.date_shopping) }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.payment_metod }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              {{ sell.id_customer }}
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap">
              <div class="flex items-center justify-center">
                <button
                  class="text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  @click="generatePDF(sell)"
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
import AddSellPage from './addSell.vue'
import Swal from 'sweetalert2'
import logo from '../../../assets/icon_blue.png'

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
    const response = await axios.get('http://localhost:3000/viewShopping')
    sells.value = response.data
    sortTableById()
  } catch (error) {
    console.error('Error al obtener ventas:', error)
  }
}

async function getSell() {
  try {
    const response = await axios.get(`http://localhost:3000/viewShopping/${identifier.value}`)
    const data = response.data

    if (!data || Object.keys(data).length === 0) {
      Swal.fire({
        title: 'Venta no encontrada',
        text: '¿Estás seguro de haber ingresado todos los valores de búsqueda correctamente?',
        icon: 'question',
        confirmButtonColor: '#001b76'
      })
      identifier.value = ''
      throw new Error('No se encontraron resultados para la búsqueda')
    }

    sells.value.splice(0, sells.value.length)
    sells.value.push(data)
  } catch (error) {
    identifier.value = ''
    Swal.fire({
      title: 'Error al obtener la venta',
      text: 'Por favor, rectifica los valores de búsqueda ingresados',
      icon: 'error',
      confirmButtonColor: '#001b76'
    })
    console.error('Error al obtener el cliente:', error)
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

function formatDate(dateTimeStr) {
  const dateTime = new Date(dateTimeStr)
  const hours = dateTime.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  const formattedDateTime = `${pad(dateTime.getDate())}/${pad(dateTime.getMonth() + 1)}/${dateTime.getFullYear()} ${pad(hours12)}:${pad(dateTime.getMinutes())} ${ampm}`
  return formattedDateTime
}

function pad(number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}

async function generatePDF(sell) {
  try {
    const response = await axios.get(`http://localhost:3000/billing/${sell.id_shopping}`)
    const data = response.data
    const doc = new jsPDF()
    const font = 'helvetica'
    const fontSize = 12

    // Logo
    doc.addImage(logo, 'PNG', 180, 14, 15, 12)

    // Encabezado
    doc.setFont(font, 'bold')
    doc.setFontSize(fontSize + 2)
    doc.text('Factura de Venta', 10, 20)
    doc.text('Solo Cauchos', 10, 25)
    doc.line(10, 30, 200, 30) // línea de separación

    // Información del cliente
    doc.setFont(font, 'bold')
    doc.setFontSize(fontSize)
    doc.text('Cliente:', 10, 40)
    doc.setFont(font, 'normal')
    doc.text(
      `${data.billingShopping.customer.name} ${data.billingShopping.customer.last_name}`,
      30,
      40
    )
    doc.setFont(font, 'bold')
    doc.text('Documento:', 10, 50)
    doc.setFont(font, 'normal')
    doc.text(`${data.billingShopping.customer.document}`, 40, 50)

    doc.setFont(font, 'bold')
    doc.text('Dirección:', 10, 60)
    doc.setFont(font, 'normal')
    doc.text(`${data.billingShopping.customer.addres}`, 34, 60)

    doc.setFont(font, 'bold')
    doc.text('Teléfono:', 10, 70)
    doc.setFont(font, 'normal')
    doc.text(`${data.billingShopping.customer.phone}`, 32, 70)

    doc.setFont(font, 'bold')
    doc.text('Correo:', 10, 80)
    doc.setFont(font, 'normal')
    doc.text(`${data.billingShopping.customer.email}`, 30, 80)

    doc.line(10, 90, 200, 90) // línea de separación

    // Información de la venta
    doc.setFont(font, 'bold')
    doc.text('Venta:', 10, 100)
    doc.setFont(font, 'normal')
    doc.text(`N°: ${data.billingShopping.id_shopping}`, 30, 100)
    doc.text(`Fecha: ${formatDate(data.billingShopping.date_shopping)}`, 30, 110)
    doc.line(10, 120, 200, 120) // línea de separación

    // Información del producto
    doc.setFont(font, 'bold')
    doc.text('Producto:', 10, 130)
    doc.setFont(font, 'normal')
    doc.text(`Id: ${data.billingProduct.id}`, 30, 130)
    doc.text(`Nombre: ${data.billingProduct.name}`, 30, 140)
    doc.text(`Marca: ${data.billingProduct.trademark}`, 30, 150)
    doc.text(`Cantidad: ${data.billingDetail.amount}`, 30, 190)
    doc.text(`Precio Unitario: $${data.billingProduct.sale_price}`, 30, 160)
    doc.line(10, 170, 200, 170) // línea de separación

    // Información de la compra
    doc.setFont(font, 'bold')
    doc.text('Compra:', 10, 180)
    doc.setFont(font, 'normal')
    doc.text(`Método de Pago: ${data.billingShopping.payment_metod}`, 30, 180)
    doc.text(`Valor pagado: $${data.billingDetail.price}`, 30, 200)
    doc.line(10, 210, 200, 210) // línea de separación

    // Pie de página
    doc.setFont(font, 'normal')
    doc.text('¡Gracias por su compra en Solo Cauchos!', 10, 220)

    // Restrict copying
    doc.setProperties({
      userPermissions: {
        print: true,
        modify: false,
        annotate: false,
        formFill: false,
        extract: false,
        assemble: false
      }
    })

    doc.save('factura.pdf')
  } catch (error) {
    console.error('Error al obtener pdf:', error)
  }
}

async function exportToExcel() {
  const table = sellsTable.value

  const columnsToSave = 6
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

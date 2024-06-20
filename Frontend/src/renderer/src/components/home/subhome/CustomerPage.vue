<template>
  <div class="h-screen sm:w-[550px] lg:w-auto">
    <div class="flex flex-col mt-4 ml-6 w-auto overflow-hidden">
      <p class="text-start font-semibold text-2xl mb-6 mt-2" :class="{ 'text-white': !darkMode }">
        Gestión de Clientes
      </p>
      <button class="flex items-center w-auto" @click="showAddCustomerForm = !showAddCustomerForm">
        <div
          class="flex items-center justify-center w-8 h-8 bg-primary rounded-full mr-2"
          :class="{ 'bg-dark-primary': !darkMode }"
        >
          <i class="fas fa-plus text-white"></i>
        </div>
        <span class="font-normal" :class="{ 'text-white': !darkMode }">Agregar Cliente</span>
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
            @click="getCustomer"
          >
            <span class="material-symbols-outlined text-xl cursor-pointer">search</span>
          </button>
        </div>

        <button
          class="bg-primary text-white px-4 py-2 rounded font-normal ml-2 w-auto flex"
          :class="{ 'bg-dark-primary': !darkMode }"
          @click="exportToExcel"
        >
          <img src="../../../assets/excel.png" alt="" class="w-6 h-6" />
          <p class="ml-2">Exportar a Excel</p>
        </button>
      </div>
    </div>

    <add-customer-page
      v-if="showAddCustomerForm"
      @close-form="cancel"
      @customer-added="getCustomers"
    ></add-customer-page>

    <div class="overflow-x-auto w-auto sm:h-56 lg:h-auto">
      <table
        ref="customersTable"
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
              Documento
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Nombres
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Apellidos
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Dirección
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Celular
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider sm:table-cell lg:table-cell"
              :class="{ 'text-white': !darkMode }"
            >
              Email
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
          <tr v-for="customer in customers" :key="customer.id_customer">
            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.id_customer }}</template>
              <span v-else>{{ customer.editableId }}</span>
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.document }}</template>
              <span v-else>{{ customer.document }}</span>
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.name }}</template>
              <span v-else>{{ customer.name }}</span>
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.last_name }}</template>
              <span v-else>{{ customer.last_name }}</span>
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.addres }}</template>
              <input
                v-else
                v-model="customer.editableAddres"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.phone }}</template>
              <input
                v-else
                v-model="customer.editablePhone"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap select-none">
              <template v-if="!customer.editMode">{{ customer.email }}</template>
              <input
                v-else
                v-model="customer.editableEmail"
                type="text"
                class="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                :class="{ 'bg-zinc-800': !darkMode }"
              />
            </td>

            <td class="px-6 py-3 text-center whitespace-nowrap">
              <button
                v-if="!customer.editMode"
                class="text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                @click="enableEditMode(customer)"
              >
                <span class="material-symbols-outlined flex text-yellow-500 font-semibold hover:text-yellow-400" :class="{ 'text-yellow-600': !darkMode }">  edit_square </span>
              </button>
              <button
                v-else
                class="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
                :class="{ 'bg-green-600': !darkMode }"
                @click="saveChanges(customer)"
              >
                Guardar
              </button>
              <button
                v-if="customer.editMode"
                class="border border-gray-500 hover:text-gray-700 text-gray-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                :class="{ 'text-white border-white': !darkMode }"
                @click="cancelEdit(customer)"
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
import AddCustomerPage from './addCustomer.vue'
import ExcelJS from 'exceljs'

onMounted(() => {
  getCustomers()
})

const customersTable = ref(null);
const store = useStore()
let close = ref(false)
const darkMode = computed(() => store.state.darkMode)

const identifier = ref('')
const customers = ref([])
const showAddCustomerForm = ref(false)

function sortTableById() {
  customers.value.sort((a, b) => a.id_customer - b.id_customer)
}


const enableEditMode = (customer) => {
  customer.editMode = true
  customer.editableId = customer.id_customer
  customer.editableDocument = customer.document
  customer.editableName = customer.name
  customer.editableLastName = customer.last_name
  customer.editableAddres = customer.addres
  customer.editablePhone = customer.phone
  customer.editableEmail = customer.email
}

const saveChanges = (customer) => {
  Swal.fire({
    title: '¿Deseas modificar este cliente?',
    text: 'No se podrán deshacer los cambios realizados',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d8a507',
    cancelButtonColor: '#808080',
    confirmButtonText: 'Sí, modificar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const updatedCustomer = {
        addres: customer.editableAddres,
        phone: customer.editablePhone,
        email: customer.editableEmail
      }

      try {
        await axios.put(
          `http://localhost:3000/updateCustomer/${customer.id_customer}`,
          updatedCustomer
        )
        customer.editMode = false
        Object.assign(customer, updatedCustomer)
        Swal.fire({
          title: 'Modificado!',
          text: '',
          icon: 'success',
          confirmButtonColor: '#4ade80'
        })
        getCustomers()
      } catch (error) {
        console.error('Error al actualizar el cliente:', error)
        let errorMessage =
          'Error al actualizar el cliente. Por favor, revise los datos y vuelva a intentarlo.'
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        })
        customer.editMode = false
      }
    } else {
      customer.editMode = false
    }
  })
}

const cancelEdit = (customer) => {
  customer.editMode = false
}

async function getCustomers() {
  try {
    const response = await axios.get('http://localhost:3000/viewCustomer')
    customers.value = response.data
    sortTableById()
  } catch (error) {
    console.error('Error al obtener los clientes:', error)
  }
}

const clean = () => {
  close.value = false
  identifier.value = ''
  getCustomers()
}

function cancel() {
  showAddCustomerForm.value = false
}

async function getCustomer() {
  try {
    let url = '';
    if (identifier.value < 10) {
      // si es un número
      url = `http://localhost:3000/viewCustomer/${identifier.value}`;
    } else {
      // si es una cadena
      url = `http://localhost:3000/viewCustomer/document/${identifier.value}`;
    }

    const response = await axios.get(url);
    const data = response.data;

    if (!data || Object.keys(data).length === 0) {
      Swal.fire({
        title: 'Cliente no encontrado',
        text: '¿Estás seguro de haber ingresado todos los valores de búsqueda correctamente?',
        icon: 'question',
        confirmButtonColor: '#001b76'
      });
      identifier.value = '';
      throw new Error('No se encontraron resultados para la búsqueda');
    }

    customers.value = data;
  } catch (error) {
    identifier.value = '';
    Swal.fire({
      title: 'Error al obtener el cliente',
      text: 'Por favor, rectifica los valores de búsqueda ingresados',
      icon: 'error',
      confirmButtonColor: '#001b76'
    });
    console.error('Error al obtener el cliente:', error);
  }
}

function exportToExcel() {
  const table = customersTable.value;

  const columnsToSave = 7;
  const tableData = Array.prototype.map.call(table.rows, (row) => {
    return Array.prototype.slice.call(row.cells, 0, columnsToSave).map((cell) => cell.innerHTML);
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Customers');

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
    link.download = 'Clientes.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
</script>

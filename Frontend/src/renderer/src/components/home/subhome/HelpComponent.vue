<template>
  <div
    class="modal-content fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-gray-950 bg-opacity-40 inset-0 animate-fade-in-up duration-75 delay-300"
  >
    <div
      class="bg-zinc-700 p-4 rounded-xl w-[450px] h-auto text-center shadow-md shadow-black"
    >
      <button class="close-button absolute text-white ml-44" @click="closeForm">
        <svg class="close-icon w-6 h-6 fill-gray-600" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4 text-gray-200 mt-6">
        Por favor, indique en qué área necesita asistencia
      </h2>
      <div class="mt-10 mb-8">
        <select
          v-model="selectedValue"
          class="select-menu bg-primary hover:bg-primary-hover text-gray-200 py-2 px-4 rounded"
          @change="showHelpContent"
        >
          <option value="" disabled selected>Seleccione una opción</option>
          <option value="client">Gestión de Clientes</option>
          <option value="inventory">Inventario</option>
          <option value="sales">Ventas</option>
        </select>
        <div v-if="selectedValue" class="modal-body info-content overflow-y-auto max-h-[300px] mt-4" :class="{ block: showInfoContent }">
          <p id="infoText" class="info-text text-white mb-4 text-left m-4" v-html="infoText"></p>
          <button
            class="submit-button bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded mb-2"
            @click="backToMenu"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const selectedValue = ref('')
const infoText = ref('')
const emit = defineEmits(['closeForm'])

function closeForm() {
  const modal = document.querySelector('.modal-content')
  modal.classList.add('animate-fade-out-up')

  setTimeout(() => {
    emit('closeForm')
  }, 300) 
}

function showHelpContent() {
  switch (selectedValue.value) {
    case 'client':
      infoText.value = `
<strong>Pasos a seguir:</strong>
                    <ol>
                        <li>
                            <strong>Agregar Cliente:</strong>
                            <ul>
                                <li>Haz clic en el botón azul con el icono "+" etiquetado como "Agregar Cliente".</li>
                                <li>Se abrirá un formulario emergente.</li>
                                <li>Completa los campos del formulario: Documento, Nombres, Apellidos, Dirección, Celular, Email.</li>
                                <li>Haz clic en el botón "Agregar" para guardar la información del cliente.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Buscar Cliente:</strong>
                            <ul>
                                <li>En el campo de búsqueda, ingresa el ID o documento del cliente que deseas buscar.</li>
                                <li>Haz clic en el ícono de búsqueda (lupa) para filtrar los resultados.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Ver Todos los Clientes:</strong>
                            <ul>
                                <li>Haz clic en el botón "Ver todos los clientes" para mostrar la lista completa de clientes registrados.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Exportar a Excel:</strong>
                            <ul>
                                <li>Haz clic en el botón "Exportar a Excel" para descargar la lista de clientes en un archivo de Excel.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Editar Información del Cliente:</strong>
                            <ul>
                                <li>En la columna de "Acción", haz clic en el ícono de edición (lápiz) correspondiente al cliente que deseas modificar.</li>
                                <li>Se abrirá un formulario emergente con la información actual del cliente.</li>
                                <li>Realiza las modificaciones necesarias y guarda los cambios.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Eliminar Cliente:</strong>
                            <ul>
                                <li>(Si está disponible) En la columna de "Acción", haz clic en el ícono de eliminación (basura) correspondiente al cliente que deseas eliminar.</li>
                                <li>Confirma la eliminación en el mensaje emergente.</li>
                            </ul>
                        </li>
                    </ol>
                    <strong>Información Adicional:</strong>
                    <ul>
                        <li><strong>Campo Documento:</strong> Es un campo obligatorio y debe contener el número de identificación del cliente.</li>
                        <li><strong>Nombres y Apellidos:</strong> Asegúrate de ingresar el nombre completo del cliente.</li>
                        <li><strong>Dirección:</strong> Especifica la dirección física del cliente.</li>
                        <li><strong>Celular:</strong> Ingresa un número de contacto válido.</li>
                        <li><strong>Email:</strong> Asegúrate de ingresar una dirección de correo electrónico válida.</li>
                    </ul>
      `;
      break;
    case 'inventory':
      infoText.value = `
 <strong>Pasos a seguir:</strong>
                    <ol>
                        <li>
                            <strong>Agregar Producto:</strong>
                            <ul>
                                <li>Haz clic en el botón "Agregar Producto" (identificado con un ícono "+").</li>
                                <li>Se abrirá un formulario para ingresar la información del nuevo producto.</li>
                                <li>Completa los campos requeridos: Nombre, Precio de Compra, Precio de Venta, Stock, Marca Comercial y Categoría.</li>
                                <li>Haz clic en el botón "Guardar" para agregar el producto al inventario.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Buscar Producto:</strong>
                            <ul>
                                <li>En el campo de búsqueda, ingresa el ID o nombre del producto que deseas buscar.</li>
                                <li>Los resultados se filtrarán automáticamente a medida que escribes.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Ver Todos los Productos:</strong>
                            <ul>
                                <li>La interfaz muestra todos los productos registrados en el inventario.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Exportar a Excel:</strong>
                            <ul>
                                <li>Haz clic en el botón "Exportar a Excel" para descargar la lista completa de productos en un archivo de Excel.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Editar Producto:</strong>
                            <ul>
                                <li>En la columna "Acción", haz clic en el ícono de edición (lápiz) correspondiente al producto que deseas modificar.</li>
                                <li>Se abrirá un formulario con la información actual del producto.</li>
                                <li>Realiza los cambios necesarios y guarda las modificaciones.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Eliminar Producto:</strong>
                            <ul>
                                <li>En la columna "Acción", haz clic en el ícono de eliminación (basurero) correspondiente al producto que deseas eliminar.</li>
                                <li>Confirma la eliminación en el mensaje emergente.</li>
                            </ul>
                        </li>
                    </ol>
                    <strong>Información Adicional:</strong>
                    <ul>
                        <li>Asegúrate de ingresar información precisa y completa al agregar o editar productos.</li>
                        <li>El precio de venta generalmente debe ser mayor que el precio de compra para obtener ganancias.</li>
                        <li>Mantén actualizado el stock para un control adecuado del inventario.</li>
                    </ul>
      `;
      break;
    case 'sales':
      infoText.value = `
            <strong>Gestión de Ventas:</strong>
            <ol>
                <li>
                    <strong>Agregar Venta:</strong>
                    <ul>
                        <li>Haz clic en el botón azul con el icono "+" etiquetado como "Agregar Venta".</li>
                        <li>Se abrirá un formulario emergente para ingresar los detalles de la venta.</li>
                        <li>Completa los campos necesarios: ID del cliente, precio final, precio por unidad, fecha y hora, método de pago.</li>
                        <li>Haz clic en el botón "Agregar" para guardar la información de la venta.</li>
                    </ul>
                </li>
                <li>
                    <strong>Buscar Venta:</strong>
                    <ul>
                        <li>En el campo de búsqueda, ingresa el ID de la venta que deseas buscar.</li>
                        <li>Haz clic en el ícono de búsqueda (lupa) para filtrar los resultados.</li>
                    </ul>
                </li>
                <li>
                    <strong>Exportar a Excel:</strong>
                    <ul>
                        <li>Haz clic en el botón "Exportar a Excel" para descargar la lista de ventas en un archivo de Excel.</li>
                    </ul>
                </li>
                <li>
                    <strong>Generar PDF:</strong>
                    <ul>
                        <li>En la columna de "Factura", haz clic en el ícono de PDF (documento) para generar un reporte en PDF de la venta correspondiente.</li>
                    </ul>
                </li>
            </ol>
            <strong>Información Adicional:</strong>
            <ul>
                <li><strong>ID Cliente:</strong> Es el identificador único del cliente asociado con la venta.</li>
                <li><strong>Precio Final:</strong> Es el monto total de la venta.</li>
                <li><strong>Precio por Unidad:</strong> Es el precio por cada unidad vendida.</li>
                <li><strong>Fecha y Hora:</strong> Especifica la fecha y hora de la venta.</li>
                <li><strong>Método de Pago:</strong> Indica el método de pago utilizado para la venta (por ejemplo, Nequi, efectivo, tarjeta de crédito).</li>
            </ul>
      `;
      break;
    default:
      infoText.value = '';
  }
}


function backToMenu() {
  selectedValue.value = ''
}
</script>

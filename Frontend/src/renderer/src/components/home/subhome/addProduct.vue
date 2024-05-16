<template>
  <div class="overflow-hidden fixed inset-0 flex items-center justify-center bg-white">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Agregar Producto</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" v-model="name" id="name" name="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
        </div>
        <div class="mb-4">
          <label for="shopping_price" class="block text-sm font-medium text-gray-700">Precio de compra</label>
          <input type="number" v-model="shopping_price" id="shopping_price" name="shopping_price" step="0.01" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
        </div>
        <div class="mb-4">
          <label for="sale_price" class="block text-sm font-medium text-gray-700">Precio de venta</label>
          <input type="number" v-model="sale_price" id="sale_price" name="sale_price" step="0.01" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
        </div>
        <div class="mb-4">
          <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
          <input type="number" v-model="stock" id="stock" name="stock" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
        </div>
        <div class="mb-4">
          <label for="trademark" class="block text-sm font-medium text-gray-700">Marca comercial</label>
          <input type="text" v-model="trademark" id="trademark" name="trademark" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
        </div>
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
          <select v-model="category_Type" id="category" name="category" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
            <option value="" disabled selected style="color: gray;">Selecciona categoría</option>
            <option value="1">Manijas</option>
            <option value="2">Cauchos</option>
            <option value="3">Pines</option>
          </select>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded font-semibold">Agregar</button>
          <button type="button" @click="$emit('close-form')" class="ml-4 bg-gray-400 text-white px-4 py-2 rounded font-semibold">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      shopping_price: null,
      sale_price: null,
      stock: null,
      trademark: '',
      category_Type: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState(['darkMode'])
  },
  methods: {
    closeForm() {
      this.$emit('close-form');
    },

    async submitForm() {
      try {
        this.errorMessage = '';

        if (!this.name || !this.shopping_price || !this.sale_price || !this.stock || !this.category_Type) {
          throw new Error('Todos los campos son obligatorios.');
        }

        if (!Number.isInteger(this.shopping_price) || !Number.isInteger(this.sale_price) || !Number.isInteger(this.stock)) {
          throw new Error('Los precios y el stock deben ser números enteros.');
        }

        if (this.shopping_price < 0 || this.sale_price < 0 || this.stock < 0) {
          throw new Error('Los precios y el stock no pueden ser negativos.');
        }

        const response = await fetch('http://localhost:3000/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            shopping_price: this.shopping_price,
            sale_price: this.sale_price,
            stock: this.stock,
            trademark: this.trademark,
            category_Type: this.category_Type
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.message === "Producto agregado exitosamente") {
            Swal.fire({
              title: "Agregado",
              text: "Producto agregado correctamente",
              icon: "success"
            });
            this.$emit('product-added');
            this.name = '';
            this.shopping_price = null;
            this.sale_price = null;
            this.stock = null;
            this.trademark = '';
            this.category_Type = '';
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Error al agregar producto: ' + data.message;
          }
        } else {
          throw new Error('Error en la solicitud.');
        }
      } catch (error) {
        console.error('Error al agregar producto:', error);
        this.errorMessage = 'Error al agregar producto: ' + error.message;
      }
    }
  }
};
</script>

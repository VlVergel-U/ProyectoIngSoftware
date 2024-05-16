<template>
  <div class="bg-blue-900">
    <div class="container mx-auto">
      <div class="overflow-hidden font-sans h-screen flex items-center justify-center">
        <form class="bg-white rounded-lg p-8 space-y-4 w-96" @submit.prevent="submitForm">
          <h1 class="text-2xl font-semibold text-center border-b-2 border-blue-500 py-2">
            SISTEMA DE INVENTARIO
          </h1>
          <div class="flex justify-center">
            <img src="../../assets/icon.png" alt="IMG" class="w-26 h-24" />
          </div>

          <p class="text-center text-sm font-semibold">SOLO CAUCHOS</p>

          <div id="mensaje-de-error" v-if="mensaje">
            <p class="text-red-700 text-center font-bold">Credenciales incorrectas</p>
          </div>

          <div class="relative">
            <i class="fa fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"></i>
            <input v-model="user_name" class="input100 w-80 border-b-2 border-solid border-neutral-500 my-2 pl-10" type="text" name="email" placeholder="Email" />
          </div>

          <div class="relative">
            <input v-model="poswarrd" class="input100 w-80 border-b-2 border-solid border-neutral-500 pl-10" type="password" name="pass" placeholder="Contraseña" />
            <i class="fa fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"></i>
          </div>

          <div class="flex justify-center">
            <button type="submit" class="w-40 h-12 bg-blue-700 text-white font-semibold rounded-md transition duration-300 hover:bg-yellow-600 my-4">
              Iniciar sesión
            </button>
          </div>
          <a class="flex justify-center text-yellow-400 font-semibold" @click="goToRegister">Registrar usuario</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: '',
      poswarrd: '',
      mensaje: false
    }
  },
  methods: {
    submitForm() {
      const user_name = this.user_name;
      const poswarrd = this.poswarrd;

      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_name, poswarrd })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error de inicio de sesión');
        }
      })
      .then((data) => {
        if (data.message === "Usuario autenticado") {
            this.$router.push({ path: `/home` })
        } else {
          console.error("Credenciales incorrectas");
          this.mensaje = true;
        }
      })
      .catch((error) => {
        console.error('Error de inicio de sesión:', error.message);
        this.mensaje = true;
      });
    }
  }
}
</script>

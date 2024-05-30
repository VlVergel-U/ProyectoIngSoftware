<template>
  <div class="bg-custom h-screen bg-cover bg-center bg-blur">
    <div class="container mx-auto">

      <div class="overflow-hidden font-sans h-screen flex items-center justify-center">
        <div class="absolute bg-white rounded-full w-32 h-32 justify-center items-center flex border-2 border-black" style="margin-bottom: 460px;">
          <img src="../../assets/icon.jpeg" alt="IMG" class="w-28 h-10"  />
        </div>

        <form class="bg-zinc-950 rounded-lg p-8 space-y-4 w-96 shadow-lg shadow-zinc-800" @submit.prevent="submitForm">

          <div id="mensaje-de-error" v-if="mensaje">
            <p class="text-red-700 text-center font-bold">Credenciales incorrectas</p>
          </div>


          <div class="flex flex-col items-center relative mt-14">

          <p class="text-center text-xl font-semibold text-white mb-4">Ingresa Aquí</p>

          <div class="w-72">
            <p class="text-left text-white font-semibold">Usuario</p>
            <div class="relative my-2 mt-2">
              <i class="fa fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"></i>
              <input v-model="user_name" class="input100 w-full border-b-2 border-solid border-neutral-500 pl-10 bg-zinc-950 py-2" type="text" name="user" placeholder="Ingresa tu usuario" />
          </div>

            <p class="text-left text-white font-semibold mt-6">Contraseña</p>
            <div class="relative mt-2">
              <i class="fa fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"></i>
              <input v-model="poswarrd" class="input100 w-full border-b-2 border-solid border-neutral-500 pl-10 bg-zinc-950 py-2" type="password" name="pass" placeholder="Ingresa tu contraseña" />
            </div>
          </div>
        </div>


          <div class="flex justify-center">
            <button type="submit" class="w-72 h-12 bg-red-700 text-white font-semibold rounded-3xl transition duration-300 hover:bg-yellow-600 my-4">
              Iniciar sesión
            </button>
          </div>
          <a class="flex justify-center text-red-400 font-semibold" @click="goToRegister">Registrar usuario</a>
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

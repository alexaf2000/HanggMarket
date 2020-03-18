<template>
  <div>
    <vs-button color="primary" type="filled" @click="loginDialog = true">Iniciar sesion</vs-button>
    <vs-prompt
      color="primary"
      accept-text="Iniciar sesión"
      @accept="acceptAlert"
      @close="close"
      title="Iniciar sesión"
      :is-valid="validValues"
      :active.sync="loginDialog"
    >
      <div class="container">
        <p style="text-align:center">
          Nos alegra verte de nuevo,
          <b>inicia sesión</b>.
        </p>
        <vs-input
          class="login-dialogi"
          type="username"
          placeholder="Correo electrónico"
          icon="account_circle"
          v-model="login.username"
        />
        <vs-input
          class="login-dialogi"
          type="password"
          placeholder="Contraseña"
          icon="vpn_key"
          v-model="login.password"
        />
        <br />
        <vs-alert
          :active="!validValues"
          color="danger"
          icon="new_releases"
        >Debes de rellenar todos los campos</vs-alert>

        <vs-divider>¿Aún no tienes cuenta?</vs-divider>
        <vs-row vs-align="center" vs-type="flex" vs-justify="center">
          <vs-button>Crear una cuenta</vs-button>
        </vs-row>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexActive: 0,
      select1: 2,
      loginDialog: false,
      login: {
        username: "",
        password: "",
        grant_type: "password",
        client_id: 2,
        client_secret: 'G8PAkFMUOZW2vSIyg6GauT52usWME85k1ne01lbT'
      }
    };
  },
  computed: {
    validValues() {
      return this.login.username.length > 0 && this.login.password.length > 0;
    }
  },
  methods: {
    acceptAlert(color) {
      this.$vs.loading();
      setTimeout(() => {
        this.$vs.loading.close();
      }, 2000);

      this.$vs.notify({
        color: "primary",
        title: "Iniciando sesión...",
        text: "Espere mientras iniciamos sesion"
      });
    },
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!"
      });
    }
  }
};
</script>
<style>
.login-dialogi {
  margin: 5px 0px;
  width: 100%;
}
</style>

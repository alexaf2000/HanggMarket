<template>
  <div class="login-container">
    <vs-row class="row-container" vs-justify="center" vs-align="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vs-card class="login-card">
          <div style="color: rgb(255, 123, 0);" slot="header">
            <vs-row>
              <h3>Hangg</h3>
              <vs-icon icon="shopping_basket" />
              <span style="margin: 0 5px;">|</span>
              <h3>Panel de control</h3>
            </vs-row>
          </div>
          <div>
            <p>
              <b>¡Hola de nuevo!</b>
              <br />Confiamos en ti, pero antes de dejarte acceder debemos de comprobar que tienes permiso para acceder.
            </p>
            <vs-input
              class="login-input"
              icon-no-border
              type="email"
              label-placeholder="Correo electrónico"
              icon="email"
              v-model="login.email"
              v-on:keyup.enter="loginFunc"
            />
            <vs-input
              class="login-input"
              icon-no-border
              type="password"
              icon="lock"
              label-placeholder="Contraseña"
              v-model="login.password"
              v-on:keyup.enter="loginFunc"
            />
            <vs-alert :active="loginError" color="danger" icon="new_releases">
              <span>{{loginError}}</span>
            </vs-alert>
            <vs-checkbox class="remember-login" v-model="remember">Recordar mis datos</vs-checkbox>
            <vs-alert :active="remember == true" color="#00a1ff" icon="info">
              <span>
                <b>Por tu seguridad:</b> Asegurate de que eres el único usuario de este equipo.
              </span>
            </vs-alert>
            <vs-alert :active="errors.length > 0" color="danger" icon="info">
              <p v-for="error in errors" :key="error+50">{{error}}</p>
            </vs-alert>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="dark" v-on:click="loginFunc">Iniciar sesión</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  layout: "empty",
  head() {
    return {
      title: "Inicio de sesión"
    };
  },
  computed: {
    validCredentials() {
      return this.login.email.length > 0 && this.login.password.length > 0;
    }
  },
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      remember: false,
      loginError: null,
      errors: []
    };
  },
  methods: {
    validLogin: function(e) {
      if (this.login.email && this.login.password) {
        return true;
      }
      this.errors = [];

      this.errors.push("Debes de rellenar todos los campos.");
    },
    async loginFunc() {
      if (this.validLogin()) {
        this.$vs.loading();
        // Do the request for login
        await this.$axios
          .post(process.env.apiUrl + "/login", this.login)
          .then(response => {
            // Save the token.
            this.$store.dispatch("auth/saveToken", {
              token: response.data.token,
              remember: this.remember
            });
          })
          .catch(error => {
            // If there was an error then...
            if (error.response) {
              if (error.response.status == 422) {
                //If error was 422 (Bad formed request)
                // Then show the message
                this.errors = [error.response.data.message];
              }
            }
            this.$vs.notify({
              color: "danger",
              title: "Ha habido un error...",
              text: "No se ha podido iniciar sesión."
            });
          });

        // Fetch the user.
        await this.$store.dispatch("auth/fetchUser");
        this.$router.push("/");
        this.$vs.loading.close();
      }
    }
  }
};
</script>

<style>
.login-container {
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(255, 123, 0, 0.75);
}
.login-container:before {
  content: "";
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* Important URL char because of webpack render. */
  background: url(~assets/images/bg_image.png);
  background-size: cover;
  background-position: center;
  position: absolute;
  z-index: -1;
}
.login-container .row-container {
  height: 100%;
}
.login-card {
  animation: FallingAnimation ease 0.8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes FallingAnimation {
  0% {
    margin-top: -200px;
    opacity: 0;
  }
  100% {
    margin-top: 0px;
    opacity: 1;
  }
}
.login-input {
  width: 100%;
  margin-top: 25px !important;
  margin-bottom: 10px !important;
}
.vs-input--icon {
  position: absolute;
  z-index: 100;
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.4);
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 8px;
}
.remember-login {
  display: inline-flex;
}
.remember-login .vs-icon {
  font-size: 1.1rem;
}
</style>

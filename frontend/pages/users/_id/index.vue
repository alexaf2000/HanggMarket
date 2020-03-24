<template>
  <div>
    <vs-breadcrumb :items="breadcrumb" separator="chevron_right"></vs-breadcrumb>
    <h1>Modificar usuario</h1>
    <h3>{{originalUser.name}} {{originalUser.lastname}}</h3>
    <vs-row vs-justify="flex-start">
      <vs-col vs-w="6">
        <vs-avatar size="70px" :src="user.profile_image" />
        <h4>Datos generales</h4>
        <vs-input label-placeholder="Nombre" v-model="user.name" />
        <vs-input label-placeholder="Apellido" v-model="user.lastname" />
        <vs-input type="date" label-placeholder="Fecha de nacimiento" v-model="user.birthdate" />
        <h4>Correo electronico</h4>
        <vs-input type="email" label-placeholder="Correo electronico" v-model="user.email" />
        <vs-button color="primary" type="filled">Guardar cambios</vs-button>
      </vs-col>

      <vs-col vs-w="6">
        <h4 style="text-align:left;">Modificar contraseña</h4>
        <vs-input type="password" label-placeholder="Contraseña nueva" v-model="user.password" />
        <vs-input
          type="password"
          label-placeholder="Confirmar contraseña nueva"
          v-model="user.password_confirm"
        />
        <vs-button color="primary" type="filled">Cambiar contraseña</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  validate({ params }) {
    // Must be a number the id
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      userID: this.$route.params.id,
      originalUser: {},
      user: {
        name: "",
        lastname: "",
        password: "",
        password_confirm: "",
        email: "",
        birthdate: "",
        profile_image: ""
      },
      breadcrumb: [
        {
          title: "Usuarios",
          url: "../users"
        },
        {
          title: "Modificar usuario",
          active: true
        }
      ]
    };
  },
  async fetch() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.$vs.loading();
      await axios
        .get(process.env.apiUrl + "/user/show/" + this.userID)
        .then(response => {
          this.originalUser = response.data;
          this.user.name = this.originalUser.name;
          this.user.lastname = this.originalUser.lastname;
          this.user.email = this.originalUser.email;
          this.user.birthdate = this.originalUser.birthdate;
          this.user.profile_image = this.originalUser.profile_image;
        });
      this.$vs.loading.close();
    }
  }
};
</script>

<style>
</style>

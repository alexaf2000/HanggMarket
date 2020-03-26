<template>
  <div>
    <vs-breadcrumb :items="breadcrumb" separator="chevron_right"></vs-breadcrumb>
    <h1>Modificar usuario</h1>
    <h3>{{originalUser.name}} {{originalUser.lastname}}</h3>
    <vs-row vs-justify="flex-start">
      <vs-col vs-w="6">
        <vs-avatar
          size="70px"
          hover="blur"
          :src="user.profile_image"
          v-on:click="popupModifyProfileImage = true"
        />
        <!-- modify profile image user -->
        <vs-popup title="Cambiar imagen de perfil" :active.sync="popupModifyProfileImage">
          <vs-upload
            limit="1"
            ref="file"
            :show-upload-button="false"
            accept="image/png, image/jpeg"
          />
          <vs-button @click="modifyUserProfileImage">Cambiar imagen</vs-button>
        </vs-popup>
        <h4>Datos generales</h4>
        <vs-input label-placeholder="Nombre" v-model="user.name" />
        <vs-input label-placeholder="Apellido" v-model="user.lastname" />
        <vs-input type="date" label-placeholder="Fecha de nacimiento" v-model="user.birthdate" />
        <h4>Correo electronico</h4>
        <vs-input type="email" label-placeholder="Correo electronico" v-model="user.email" />
        <vs-button color="primary" type="filled" v-on:click="modifyUser">Guardar cambios</vs-button>
      </vs-col>

      <vs-col vs-w="6">
        <h4 style="text-align:left;">Modificar contraseña</h4>
        <vs-input type="password" label-placeholder="Contraseña nueva" v-model="user.password" />
        <vs-input
          type="password"
          label-placeholder="Confirmar contraseña nueva"
          v-model="user.password_confirmation"
        />
        <vs-button color="primary" type="filled" v-on:click="modifyUserPassword">Cambiar contraseña</vs-button>
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
      userId: this.$route.params.id,
      originalUser: {},
      user: {
        name: "",
        lastname: "",
        password: "",
        password_confirmation: "",
        email: "",
        birthdate: "",
        profile_image: ""
      },
      popupModifyProfileImage: false,
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
        .get(process.env.apiUrl + "/user/show/" + this.userId)
        .then(response => {
          this.originalUser = response.data;
          this.user.name = this.originalUser.name;
          this.user.lastname = this.originalUser.lastname;
          this.user.email = this.originalUser.email;
          this.user.birthdate = this.originalUser.birthdate;
          this.user.profile_image = this.originalUser.profile_image;
        });
      this.$vs.loading.close();
    },
    async modifyUser() {
      this.$vs.loading();
      await axios
        .post(process.env.apiUrl + "/user/update/" + this.userId, {
          name: this.user.name,
          lastname: this.user.lastname,
          email: this.user.email,
          birthdate: this.user.birthdate
        })
        .then(response => {
          this.loadData();
          this.$vs.notify({
            title: "Usuario modificado correctamente.",
            text: "El usuario ha sido modificado correctamente..",
            color: "success"
          });
        });
      this.$vs.loading.close();
    },
    async modifyUserPassword() {
      this.$vs.loading();
      await axios
        .post(
          process.env.apiUrl + "/user/update/" + this.userId + "/credentials",
          {
            password: this.user.password,
            password_confirmation: this.user.password_confirmation
          }
        )
        .then(response => {
          this.loadData();
          this.user.password = "";
          this.user.password_confirmation = "";
          this.$vs.notify({
            title: "Usuario modificado correctamente.",
            text: "El usuario ha sido modificado correctamente..",
            color: "success"
          });
        });
      this.$vs.loading.close();
    },
    async modifyUserProfileImage() {
      if (this.$refs.file.srcs.length) {
        this.$vs.loading();
        await axios
          .post(process.env.apiUrl + "/user/update/" + this.userId + "/image", {
            profile_image: this.$refs.file.srcs[0].src
          })
          .then(response => {
            this.loadData();
            this.popupModifyProfileImage = false;
            this.$vs.notify({
              title: "Usuario modificado correctamente.",
              text: "El usuario ha sido modificado correctamente..",
              color: "success"
            });
          });
        this.$vs.loading.close();
      }
    }
  }
};
</script>

<style>
</style>

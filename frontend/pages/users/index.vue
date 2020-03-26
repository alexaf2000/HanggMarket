<template>
  <div>
    <vs-row>
      <vs-col>
        <vs-button
          @click="popupCreateUser=true"
          color="#008bef"
          size="small"
          icon="add"
          style="margin:5px 0"
        >Añadir usuario</vs-button>
        <!-- create user popup -->
        <vs-popup title="Crear usuario" :active.sync="popupCreateUser">
          <vs-input color="#008bef" v-model="newUser.name" label-placeholder="Nombre" />
          <vs-input color="#008bef" v-model="newUser.lastname" label-placeholder="Apellido" />
          <vs-input
            color="#008bef"
            type="email"
            v-model="newUser.email"
            label-placeholder="Correo electronico"
          />
          <vs-input
            color="#008bef"
            type="password"
            v-model="newUser.password"
            label-placeholder="Contraseña"
          />
          <vs-input
            color="#008bef"
            type="password"
            v-model="newUser.password_confirmation"
            label-placeholder="Confirmar contraseña"
          />
          <vs-input
            color="#008bef"
            v-model="newUser.birthdate"
            type="date"
            label-placeholder="Fecha de nacimiento"
          />
          <div class="centerx">
            <vs-upload
              limit="1"
              ref="file"
              :show-upload-button="false"
              accept="image/png, image/jpeg"
            />
          </div>
          <vs-button color="#008bef" @click="addUser">Añadir usuario</vs-button>
        </vs-popup>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col>
        <vs-table :data="users" noDataText="No hay datos disponibles.">
          <template slot="header">
            <h3>Usuarios</h3>
          </template>
          <template slot="thead">
            <vs-th>Correo electrónico</vs-th>
            <vs-th>Nombre</vs-th>
            <vs-th>Apellido</vs-th>
            <vs-th>ID</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.email">{{tr.email}}</vs-td>

              <vs-td :data="tr.username">{{tr.name}}</vs-td>

              <vs-td :data="tr.lastname">{{tr.lastname}}</vs-td>

              <vs-td :data="tr.id">{{tr.id}}</vs-td>

              <template class="expand-user" slot="expand">
                <div class="con-expand-users">
                  <div class="con-btns-user">
                    <div class="con-userx">
                      <vs-avatar size="45px" :src="tr.profile_image" />
                      <span>{{ tr.name }} {{ tr.lastname }}</span>
                    </div>

                    <div>
                      <vs-button
                        vs-type="gradient"
                        size="small"
                        color="success"
                        icon="edit"
                        @click="goToUser(tr.id)"
                      ></vs-button>
                      <vs-button
                        vs-type="flat"
                        size="small"
                        color="danger"
                        icon="delete_sweep"
                        @click="dialogDeleteUser(tr.id)"
                      ></vs-button>
                    </div>
                  </div>
                  <vs-list>
                    <vs-list-item icon="mail" title="Email" :subtitle="tr.email"></vs-list-item>
                    <vs-list-item icon="cake" title="Fecha de nacimiento" :subtitle="tr.birthdate"></vs-list-item>
                    <vs-list-item
                      icon="calendar_today"
                      title="Creación de cuenta"
                      :subtitle="Date(tr.created_at)"
                    ></vs-list-item>
                  </vs-list>
                </div>
              </template>
            </vs-tr>
          </template>
        </vs-table>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-pagination
        class="users-pagination"
        :total="pages"
        v-model="actualPage"
        v-on:change="loadData"
      ></vs-pagination>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    users: [],
    newUser: {
      name: "",
      lastname: "",
      email: "",
      password: null,
      password_confirmation: null,
      birthdate: null,
      profile_image: null
    },
    selected: null, // Used for delete and modify (saves user id)
    pages: 0,
    actualPage: 1,
    popupCreateUser: false,
  }),
  // Autoexecuted before load page
  async fetch() {
    this.loadData();
  },
  methods: {
    // Load the data from server
    async loadData() {
      this.$vs.loading();
      await axios
        .get(process.env.apiUrl + "/user", {
          params: {
            page: this.actualPage
          }
        })
        .then(response => {
          this.users = response.data.data;
          this.pages = response.data.last_page;
        });
      this.$vs.loading.close();
    },
    dialogDeleteUser(id) {
      this.selected = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `¿Estás seguro?`,
        acceptText: "Confirmar",
        cancelText: "Cancelar",
        text: `Se va a proceder con la eliminación de el usuario.`,
        accept: this.deleteUser
      });
    },
    async deleteUser() {
      await axios
        .delete(process.env.apiUrl + "/user/destroy/" + this.selected)
        .then(response => {
          this.$vs.notify({
            title: "Usuario eliminado.",
            text: "El usuario ha sido eliminado correctamente.",
            color: "success",
            icon: "check_box"
          });
          this.loadData();
        });
    },
    async addUser() {
      if (this.$refs.file.srcs.length) {
        this.newUser.profile_image = this.$refs.file.srcs[0].src;
      }
      await axios
        .post(process.env.apiUrl + "/user/store", this.newUser)

        .then(response => {
          this.popupCreateUser = false;
          this.loadData();
          this.$vs.notify({
            title: "Usuario creado correctamente.",
            text: "El usuario ha sido creado correctamente",
            color: "success",
            icon: "check_box"
          });
        });
      this.actualPage = this.pages;
    },
    goToUser(id) {
      this.$router.push("/users/" + id);
    }
  }
};
</script>
<style>
.con-expand-users .con-btns-user {
  display: flex;
  padding: 10px;
  padding-bottom: 0px;
  align-items: center;
  justify-content: space-between;
}
.con-expand-users .con-userx {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.list-icon i {
  font-size: 0.9rem !important;
}
.vuesax-app-is-ltr .con-vs-popup {
  z-index: 5;
}
.users-pagination .vs-pagination--mb {
  justify-content: center !important;
  width: 100% !important;
}
</style>

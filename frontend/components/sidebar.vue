<template>
  <div class="parentx-static">
    <vs-sidebar
      default-index="1"
      color="primary"
      class="sidebarx"
      spacer
      hidden-background
      v-model="active"
    >
      <div class="header-sidebar" slot="header">
        <vs-avatar size="70px" />
        <h4>{{user.name}}</h4>
      </div>

      <vs-sidebar-item index="1" icon="home" to="/">Inicio</vs-sidebar-item>

      <vs-divider icon="shopping_basket" position="left">Productos</vs-divider>
      <vs-sidebar-item index="2" icon="shopping_cart" to="/products">Productos</vs-sidebar-item>
      <vs-sidebar-item index="3" icon="view_module" to="/products/categories">Categorías</vs-sidebar-item>

      <vs-divider icon="person" position="left">User</vs-divider>

      <vs-sidebar-item index="4" icon="group" to="/users">Usuarios</vs-sidebar-item>

      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat" v-on:click="logout">Cerrar sesión</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    async logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  data: () => ({
    active: true
  })
};
</script>

<style>
.parentx-static {
  overflow: hidden;
  height: 100%;
  position: relative;
  box-shadow: -10px 0px 13px black;
}

.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
h4 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
h4 button {
  margin-left: 10px;
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.footer-sidebar button {
  border: 0px solid rgba(0, 0, 0, 0) !important;
  border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
  border-radius: 0px !important;
}
</style>

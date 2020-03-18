<template>
  <div>

    <div class="centerx">
    <vs-navbar
      v-model="indexActive"
      color="dark"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="navbar">
      <div slot="title">
        <vs-navbar-title>
          <nuxt-link to="/" class="nav-logo">
          <vs-row>
            Hangg <vs-icon icon="shopping_basket"/>
          </vs-row>
          </nuxt-link>
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0" >
         <nuxt-link to="/" class="nav-logo">
          Inicio
          </nuxt-link>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>
      <loginbutton/>

      <nuxt-link to="/me" >
      <vs-button color="primary" type="border" icon="account_circle">alexaf2000</vs-button>
      </nuxt-link>
      <vs-button color="primary" type="border" icon="shopping_cart">15</vs-button>
    </vs-navbar>




  </div>
    <nuxt />
  </div>
</template>

<script>
import loginbutton from '~/components/loginbutton.vue'
export default {
    components: {
  loginbutton
},
}

</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 120ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.input-color{
  margin-bottom: '10px';
  position: 'relative';
  display: 'block'
  }
.navbar{
  position: fixed;
      box-shadow: 0px 15px 40px -10px rgb(0, 0, 0,0.4);

  }
  .nav-logo{
    color:rgb(255, 123, 0);
  }
</style>

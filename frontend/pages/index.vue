<template>
  <div class="container">
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-card actionable class="cardx">
          <div slot="header">
            <h3>Hello world !</h3>
          </div>
          <div slot="media">
            <img src="https://images-na.ssl-images-amazon.com/images/I/41zgaFGlp2L._AC_SY400_.jpg" />
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" type="gradient">View</vs-button>
              <vs-button color="danger" type="gradient">Delete</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-card actionable class="cardx">
          <div slot="header">
            <h3>Hello world !</h3>
          </div>
          <div slot="media">
            <img src="https://www.topcomparativas.com/wp-content/uploads/2019/10/61sAG5aKJL._AC_SL1500_-571x292.jpg" />
          </div>
          <div>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" type="gradient">View</vs-button>
              <vs-button color="danger" type="gradient">Delete</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuesaxLogo from '~/components/VuesaxLogo.vue'

export default {
  // components: {
  //   Logo,
  //   VuesaxLogo
  // }
};
</script>
<style scoped>
.container{
  background: red;
}
</style>

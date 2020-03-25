<template>
  <div class="base-container">
    <div class="left-sidebar">
      <sidebar />
    </div>
    <div class="right-content">
      <div class="basic-container">
      <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "~/components/sidebar.vue";

export default {
  components: {
    sidebar
  },
  middleware: "auth" // Every page that haves this layout will require the middleware auth
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
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
.base-container {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  overflow: hidden;
}
.left-sidebar {
  width: 250px;
  height: 100%;
  z-index: 1;
}
.right-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin: 0px 2px 0px 0px;
  z-index: 0;
}
.right-content .basic-container{
  margin: 15px;
}
.vuesax-app-is-ltr .con-vs-popup {
  z-index: 5;
}
.center-pagination .vs-pagination--mb {
  justify-content: center !important;
  width: 100% !important;
}
.vs-select--item-icon{
  font-size: 1em!important;
}
.vs-textarea{
      font-family: sans-serif;
      resize: none!important;
}
</style>

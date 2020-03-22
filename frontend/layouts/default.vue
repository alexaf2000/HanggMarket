<template>
  <div class="base-container">
    <div class="left-sidebar">
      <sidebar />
    </div>
    <div class="right-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import sidebar from "~/components/sidebar.vue";

export default {
  components: {
    sidebar
  },
  middleware: "auth"
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
.base-container{
  height: 100vh;
  max-height: 100vh;
  display: flex;
}
.left-sidebar{
  width: 250px;
  height: 100%;

}
.right-content{
  width: 100%;
  height: 100%;

}
</style>

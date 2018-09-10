<template>
  <div id="app">
    <component :is="layout">
      <router-view />
      <!-- <router-view :key="$route.fullPath" /> // this *reloads* the view on every route.fullPath change, which solves some problems, but introduces others...and also seems to result in a bit of a klunkier user experience. -->
    </component>
  </div>
</template>

<script>
/**
 * Layout "strategy" inspired by: https://itnext.io/anyway-heres-how-to-create-a-multiple-layout-system-with-vue-and-vue-router-b379baa91a05
 */
const defaultLayout = 'default'

export default {
  name: 'app',
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 10px;
}
</style>

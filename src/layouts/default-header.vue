<template>
  <default-nav />
</template>

<script>
  import defaultNav from './default-nav.vue'

  export default {
    components: {
      'default-nav': defaultNav
    },

    mounted () {
      console.log('Default header mounted.')
    }
  }
</script>

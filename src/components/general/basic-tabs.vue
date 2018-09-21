<template>
  <b-card no-body>
    <b-tabs card :pills="false">
      <slot />
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  mounted () {
    console.log('Basic tabs component mounted.')
  }
}
</script>

<style lang="scss" scoped>
</style>

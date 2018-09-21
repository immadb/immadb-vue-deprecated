<template>
  <b-card no-body>
    <b-card-header>
      <slot name="header" />
    </b-card-header>
    <b-card-body>
      <slot />
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  mounted () {
    console.log('Basic card component mounted.')
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          no-body
          border-variant="light"
        >
          <b-card-header>
            <default-header />
          </b-card-header>
          <b-card-body>
            <slot />
          </b-card-body>
          <b-card-footer>
            <default-footer />
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import alert from '@/components/alert.vue';
import DefaultHeader from './default-header.vue'
import DefaultFooter from './default-footer.vue'

export default {
  components: {
    // 'immadb-alert': alert,
    'default-header': DefaultHeader,
    'default-footer': DefaultFooter
  },
  mounted () {
    console.log('Default layout mounted.')
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  padding: 0;
}
</style>

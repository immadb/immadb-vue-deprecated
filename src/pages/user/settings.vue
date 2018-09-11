<template>
  <basic-content
    title="Settings"
    :loading="loading"
  >
    @todo
  </basic-content>
</template>

<script>
import basicContent from '@/components/content/basic'

export default {
  components: {
    'basic-content': basicContent
  },
  data () {
    return {
      loading: false
    }
  },
  // methods: {
  //   async getBout () {
  //   // getBout () {
  //     console.log('getBout')
  //     this.loading = true
  //     try {
  //       await this.$store.dispatch('bout/get', { slug: this.slug })
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //       this.loading = false
  //     }
  //   },
  //   async getData () {
  //     this.getBout()
  //   }
  // },
  created () {
    console.log('Settings page created.')
    // this.getData()
  },
  mounted () {
    console.log('Settings page mounted.')
  }
}
</script>

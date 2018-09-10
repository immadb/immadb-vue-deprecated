<template>
  <basic-content
    :title="$utils.boutTitle(bout)"
    :subtitle="subtitle"
    :loading="loading"
  >
    <bout
      v-if="bout"
      :bout="bout"
    />
  </basic-content>
</template>

<script>
import basicContent from '@/components/content/basic'
import Bout from './common/bout.vue'

export default {
  components: {
    'basic-content': basicContent,
    'bout': Bout
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    subtitle () {
      return this.bout ? this.bout.event.date_full_time + ' | ' + this.bout.event.location : '...'
    },
    bout () {
      let data = this.$store.getters['bout/data']
      return data ? data.data : null
    },
    slug: (t) => t.$route.params.slug
  },
  methods: {
    async getBout () {
    // getBout () {
      console.log('getBout')
      this.loading = true
      try {
        await this.$store.dispatch('bout/get', { slug: this.slug })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getData () {
      this.getBout()
    }
  },
  created () {
    console.log('Bout show page created.')
    this.getData()
  },
  // beforeDestroy () {
  //   this.$store.commit('bout/data', null)
  //   // this.$store.dispatch('bout/clear')
  // },
  mounted () {
    console.log('Bout show page mounted.')
  }
}
</script>

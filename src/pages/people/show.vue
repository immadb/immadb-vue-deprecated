<template>
  <basic-content
    :title="title"
    :subtitle="subtitle"
    :loading="loading"
  >
    @todo Person details go here
      <!-- <person
        v-if="person"
        :person="person"
      /> -->
  </basic-content>
</template>

<script>
import basicContent from '@/components/content/basic'
// import person from './common/person.vue'

export default {
  components: {
    'basic-content': basicContent
    // 'person': person
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    title () {
      return this.person ? this.person.full_name : '...'
    },
    subtitle () {
      return this.person ? this.person.nickname : '...'
    },
    person () {
      let data = this.$store.getters['person/data']
      return data ? data.data : null
    },
    slug: (t) => t.$route.params.slug
  },
  methods: {
    async getPerson () {
    // getPerson () {
      console.log('getPerson')
      this.loading = true
      try {
        await this.$store.dispatch('person/get', { slug: this.slug })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getData () {
      this.getPerson()
    }
  },
  created () {
    console.log('People show page created.')
    this.getData()
  },
  // beforeDestroy () {
  //   // this.$store.commit('person/data', null)
  //   this.$store.dispatch('person/clear')
  // },
  mounted () {
    console.log('People show page mounted.')
  }
}
</script>

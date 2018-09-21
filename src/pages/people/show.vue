<template>
  <basic-content
    :title="title"
    :loading="loading"
  >
    <person
      v-if="person"
      :person="person"
    />
  </basic-content>
</template>

<script>
import BasicContent from '@/components/content/basic'
import Person from './person.vue'

export default {
  components: {
    'basic-content': BasicContent,
    'person': Person
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    title () {
      return this.person ? this.person.complete_name : '...'
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
    getData () {
      this.getPerson()
    }
  },
  created () {
    console.log('People show page created.')
    this.getData()
  },
  watch: { /** @todo Maybe try to figure out why beforeRouteUpdate doesn't work, since it seems a bit more elegant. */
    '$route' (to, from) {
      this.getData()
    }
  },
  mounted () {
    console.log('People show page mounted.')
  }
}
</script>

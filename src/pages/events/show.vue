<template>
  <basic-content
    :title="$utils.eventFullTitle(event)"
    :subtitle="subtitle"
    :loading="loading"
  >
    <event
      v-if="event"
      :event="event"
    />
  </basic-content>
</template>

<script>
import basicContent from '@/components/content/basic'
import event from './common/event.vue'

export default {
  components: {
    'basic-content': basicContent,
    'event': event
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    subtitle () {
      return this.event ? this.event.date_full_time + ' | ' + this.event.location : '...'
    },
    event () {
      let data = this.$store.getters['event/data']
      return data ? data.data : null
    },
    slug: (t) => t.$route.params.slug
  },
  methods: {
    async getEvent () {
    // getEvent () {
      console.log('getEvent')
      this.loading = true
      try {
        await this.$store.dispatch('event/get', { slug: this.slug })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getData () {
      this.getEvent()
    }
  },
  created () {
    console.log('Event show page created.')
    this.getData()
  },
  // beforeDestroy () {
  //   // this.$store.commit('event/data', null)
  //   this.$store.dispatch('event/clear')
  // },
  mounted () {
    console.log('Event show page mounted.')
  }
}
</script>

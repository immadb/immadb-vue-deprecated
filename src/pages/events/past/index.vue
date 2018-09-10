<template>
  <index-content
    title="Past Events"
    :index="events"
    :loading="loading"
    @getData="getData"
  >
    <div slot="item" slot-scope="{ item }">
      <index-entry
        :event="item"
      />
    </div>
    <!-- __AT__forelse ($events as $promotion)
        <immadb-index-entry
            :promotion='__AT__json($promotion)'
        >
      </immadb-index-entry>
    __AT__empty
        <p>No events</p>
    __AT__endforelse -->
  </index-content>
</template>

<script>
// import alert from '@/components/alert.vue'
import IndexContent from '@/components/content/index.vue'
import IndexEntry from './index-entry.vue'

export default {
  components: {
    'index-content': IndexContent,
    'index-entry': IndexEntry
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    events () {
      let data = this.$store.getters['events/data']
      console.log('computed events data:')
      console.log(data)
      return data
    },
    pagination () {
      let data = this.$store.getters['events/data']
      return data ? data.meta : null
    },
    page () {
      return this.$route.query.page ? this.$route.query.page : 1
    },
    query: (t) => t.$route.query
  },
  methods: {
    async getPastEvents (params = null) {
    // getPastEvents(params = null) {
      console.log('getPastEvents')
      console.log(params)
      this.loading = true
      try {
        params = Object.assign({}, params)
        // const p = (!params ? this.buildParams() : this.buildParams(params))

        await this.$store.dispatch('events/past', params)// { page: this.page })
        // const data = await this.$store.dispatch('events/data', { page: this.page })
        // const data = await this.$store.dispatch('events/data', p)

        // this.events = data.data
        // this.pagination = data.meta
      } catch (err) {
        console.log(err)
        // this.error = get(err, "response.data", {})
        // this.error.errors = mapKeys(this.error.errors, (val, key) => `data.${key}`)
      } finally {
        this.loading = false
      }
    },
    async getData () {
      this.getPastEvents({page: this.query.page})
    }
  },
  created () {
    console.log('Past Events index page created.')
    this.getData()
  },
  mounted () {
    console.log('Past Events index page mounted.')
  }
}
</script>

<style lang="scss" scoped>
</style>

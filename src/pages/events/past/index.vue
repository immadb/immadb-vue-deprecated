<template>
  <tabled-index-content
    title="Past Events"
    :index="events"
    :loading="loading"
    @getData="getData"
  >
    <b-table
      :striped="true"
      :hover="true"
      :fields="eventTableFields"
      :items="events.data"
      :show-empty="true"
      v-if="events"
    >

      <template slot="promotion" slot-scope="data">
        <b-img rounded thumbnail :src="promotionImageUrl(data.value)" class="mr-3" :alt="data.value.name" />
        <!-- <b-img rounded thumbnail blank class="mr-3" :alt="data.promotion.name" height="75" width="75" /> -->
      </template>

      <template slot="event" slot-scope="data">
        <h5 class="mt-0 mb-1 text-left">
          <router-link :to="$utils.eventRoute(data.item)">
            {{ data.item.title }}
            <small class="text-muted">{{ data.item.subtitle }}</small>
          </router-link>
        </h5>
        <h6 class="mt-0 mb-1 text-left">
            Bouts: {{ data.item.bouts_count }}
        </h6>
        <h6 v-if="data.item.main_event" class="mt-0 mb-1 text-left">
            <router-link :to="{ name: 'bouts.show', params: { slug: data.item.main_event.slug }}" v-text="$utils.boutTitle(data.item.main_event)" />
        </h6>
      </template>

      <template slot="whenAndWhere" slot-scope="data">
         <h6 class="mt-0 mb-1 text-right">
          {{ data.item.full_date_full_time }}
        </h6>
        <address class="text-right">
          {{ data.item.venue }}<br />
          {{ data.item.location }}
        </address>
      </template>
    </b-table>

    <!-- <div slot="item" slot-scope="{ item }">
      <index-entry
        :event="item"
      />
    </div> -->
    <!-- __AT__forelse ($events as $promotion)
        <immadb-index-entry
            :promotion='__AT__json($promotion)'
        >
      </immadb-index-entry>
    __AT__empty
        <p>No events</p>
    __AT__endforelse -->
  </tabled-index-content>
</template>

<script>
// import alert from '@/components/alert.vue'
import IndexContent from '@/components/content/index.vue'
import TabledIndexContent from '@/components/content/tabled-index.vue'
import IndexEntry from './index-entry.vue'

export default {
  components: {
    'index-content': IndexContent,
    'tabled-index-content': TabledIndexContent,
    'index-entry': IndexEntry
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    eventTableFields () {
      /** @todo Figure out why solutions here (https://stackoverflow.com/questions/49842860/how-to-hide-bootstrap-vue-table-header-row) won't work. */
      return [
        { key: 'promotion', class: 'align-middle text-center', thStyle: 'display: none;' },
        { key: 'event', class: 'align-middle text-center', thStyle: 'display: none;' },
        { key: 'whenAndWhere', class: 'align-middle', thStyle: 'display: none;' }
      ]
    },
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
    },
    promotionImageUrl (promotion) {
      return this.$utils.promotionTwitterProfileThumbUrl(promotion)
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
table {
  margin-bottom: 0;
}
</style>

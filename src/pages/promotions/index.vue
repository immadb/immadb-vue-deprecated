<template>
  <index-content
    title="Promotions"
    :index='promotions'
    :loading="loading"
    @getData="getData"
  >
    <div slot="item" slot-scope="{ item }">
      <index-entry
        :promotion="item"
      />
    </div>
    <!-- __AT__forelse ($promotions as $promotion)
        <immadb-index-entry
            :promotion='__AT__json($promotion)'
        >
      </immadb-index-entry>
    __AT__empty
        <p>No promotions</p>
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
    promotions () {
      let data = this.$store.getters['promotions/data']
      console.log('computed promotions data:')
      console.log(data)
      return data
    },
    pagination () {
      let data = this.$store.getters['promotions/data']
      return data ? data.meta : null
    },
    page () {
      return this.$route.query.page ? this.$route.query.page : 1
    },
    query: (t) => t.$route.query
  },
  methods: {
    async getPromotions (params = null) {
    // getPromotions(params = null) {
      console.log('getPromotions')
      console.log(params)
      this.loading = true
      try {
        params = Object.assign({}, params)

        await this.$store.dispatch('promotions/data', params)
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getData () {
      this.getPromotions({page: this.query.page})
    }
  },
  created () {
    console.log('Promotions index page created.')
    this.getData()
  },
  mounted () {
    console.log('Promotions index page mounted.')
  }
}
</script>

<style lang="scss" scoped>
</style>

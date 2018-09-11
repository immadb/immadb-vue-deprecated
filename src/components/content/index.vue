<template>
  <b-card
    no-body
    border-variant="light"
    v-if="index"
  >
    <b-card-header
      header-bg-variant="white"
    >
      <b-container>
        <b-row>
          <b-col class="p-0">
            <!-- <immadb-watchlist-toggle v-if="watchable" class="float-left mr-2"></immadb-watchlist-toggle> -->
            <h2 class="mb-0">
              {{ title }}
              <small class="text-muted">{{ totalRows }}</small>
            </h2>
            <!-- <h6 v-if="subtitle">
              {{ subtitle }}
            </h6> -->
          </b-col>
          <b-col class="p-0">
            <div class="float-right">
              <b-pagination
                v-if="numberOfPages > 1"
                :total-rows="totalRows"
                :per-page="rowsPerPage"
                v-model="currentPage"
                :disabled="loading"
                size="sm"
              />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card-header>
    <b-card-body>
      <ul class="list-unstyled">
        <li class="index-item" v-for="item in index.data">
          <slot name="item"
            :item="item"
          />
        </li>
      </ul>
    </b-card-body>
  </b-card>
</template>

<script>
// import ratings from './../general/ratings';
// import watchlistToggle from './../general/watchlist-toggle';

export default {
  components: {
    // 'immadb-ratings': ratings,
    // 'immadb-watchlist-toggle': watchlistToggle,
  },
  props: {
    'title': {
      type: String,
      required: true
    },
    'index': {
      type: Object,
      required: false,
      default: null
    },
    'loading': {
      type: Boolean,
      required: true,
      default: true
    }
    // 'watchable': {
    //     type: Boolean,
    //     required: false,
    //     default: false,
    // },
    // 'ratable': {
    //     type: Boolean,
    //     required: false,
    //     default: false,
    // },
    // 'ratingUrl': {
    //     type: String,
    //     required: false,
    //     default: null,
    // },
    // 'userRating': {
    //     // type: Number,
    //     // required: false,
    //     default: null,
    // },
    // 'averageRating': {
    //     type: Number,
    //     required: false,
    //     default: null,
    // },
  },
  // data () {
  //   return {
  //     loading: false
  //   }
  // },
  computed: {
    pagination: (t) => t.index.meta,
    query: (t) => t.$route.query,
    numberOfPages: (t) => t.pagination.last_page,
    totalRows: (t) => t.pagination.total,
    rowsPerPage: (t) => t.pagination.per_page,
    currentPage: {
      get: function () {
        return Number(this.$route.query.page) || 1
      },
      set: function (page) {
        page = page === 1 ? undefined : page
        this.$router.replace({query: {...this.query, page}})
        this.$emit('getData')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  li.index-item:not(:last-child) {
    margin-bottom: 0.75em;
  }
</style>

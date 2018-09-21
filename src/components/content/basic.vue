<template>
  <b-card
    no-body
    border-variant="light"
  >
    <b-card-header
      header-bg-variant="white"
    >
      <b-container>
        <b-row>
          <b-col cols="10" class="p-0">
            <!-- <immadb-watchlist-toggle v-if="watchable" class="float-left mr-2"></immadb-watchlist-toggle> -->
            <h2 class="mb-0">
              {{ title }}
            </h2>
            <h6 v-if="subtitle">
              {{ subtitle }}
            </h6>
          </b-col>
          <b-col class="p-0">
            <!-- <immadb-ratings v-if="ratable" :averageRating="averageRating" :userRating="userRating" class="float-left mr-2"></immadb-ratings> -->
            <!-- <immadb-ratings
              v-if="ratable"
              :averageRating="averageRating"
              :userRating="userRating"
              :ratingUrl="ratingUrl"
            /> -->
          </b-col>
        </b-row>
      </b-container>
    </b-card-header>
    <b-card-body>
      <slot />
    </b-card-body>
  </b-card>
</template>

<script>
// import ratings from './../general/ratings';
// import watchlistToggle from './../general/watchlist-toggle';

export default {
  // components: {
  //     'immadb-ratings': ratings,
  //     'immadb-watchlist-toggle': watchlistToggle,
  // },
  props: {
    'title': {
      type: String,
      required: true
    },
    'subtitle': {
      type: String,
      required: false,
      default: null
    }
    // 'watchable': {
    // type: Boolean,
    // required: false,
    // default: false,
    // },
    // 'ratable': {
    // type: Boolean,
    // required: false,
    // default: false,
    // },
    // 'ratingUrl': {
    // type: String,
    // required: false,
    // default: null,
    // },
    // 'userRating': {
    // // type: Number,
    // // required: false,
    // default: null
    // },
    // 'averageRating': {
    // type: Number,
    // required: false,
    // default: null
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>

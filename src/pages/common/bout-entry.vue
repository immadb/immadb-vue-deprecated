<template>
  <b-row class="mb-4">
    <b-col cols="1" v-if="showMatch">
      <b-media no-body>
        <b-media-body class="ml-3">
          <p class="m-0 text-center">{{ bout.match }}</p>
        </b-media-body>
      </b-media>
    </b-col>
    <b-col>
      <bout-fighter
        :bout="bout"
        :fighter="bout.fighter_1"
        align="left"
        :spoilers="spoilers"
      />
    </b-col>
    <b-col cols="2">
      <b-media no-body>
        <b-media-body>
          <h6 class="m-0 text-center">
            <router-link :to="{ name: 'bouts.show', params: { slug: bout.slug } }">
              {{ $utils.boutBilling(bout) }}
            </router-link>
          </h6>
          <h6 class="m-0 text-center">
            {{ bout.weight }}
          </h6>
          <h6 class="m-0 text-center">
            {{ bout.format }}
          </h6>
        </b-media-body>
      </b-media>
    </b-col>
    <b-col>
      <bout-fighter
        :bout="bout"
        :fighter="bout.fighter_2"
        align="right"
        :spoilers="spoilers"
      />
    </b-col>
  </b-row>
</template>

<script>
import BoutEntryFighter from './bout-entry-fighter'

export default {
  components: {
    'bout-fighter': BoutEntryFighter
  },
  props: {
    'bout': {
      required: true,
      type: Object
    },
    showMatch: {
      type: Boolean,
      required: false,
      default: false
    },
    spoilers: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted () {
    console.log('Common bout entry component mounted.')
  }
}
</script>

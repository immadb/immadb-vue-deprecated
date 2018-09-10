<template>
  <b-media :right-align="align === 'right'" vertical-align="top">
    <!-- @todo Make all (?) image components lazy. -->
    <b-img-lazy slot="aside" rounded thumbnail :src="fighterImageUrl" classzzz="ml-3" :alt="fighter.full_name" />
    <!-- <b-img-lazy slot="aside" rounded thumbnail blank class="mr-3" :alt="fighter.full_name" height="75" width="75" /> -->

    <h6 :class="textClass" class="mt-0">
      <template v-if="fighter">
        <router-link :to="this.$utils.personRoute(fighter)">
          {{ fighter.full_name }}
        </router-link>
        <p>{{ fighter.pretty_prefight_record }}</p>
      </template>
      <template v-else>
        unknown
      </template>
    </h6>
    <h6 v-if="spoilers" :class="textClass" class="mt-0">
    <b-badge :variant="resultVariant(bout, fighter)">{{ $utils.boutFighterResult(bout, fighter) }}</b-badge>
    </h6>
  </b-media>
</template>

<script>
export default {
  props: {
    bout: {
      type: Object,
      required: true
    },
    fighter: {
      type: Object,
      required: true
    },
    spoilers: {
      type: Boolean,
      required: false,
      default: false
    },
    align: {
      type: String,
      required: false,
      default: 'left',
      validator: value => { // @todo Is there a better way to validate this...?
        return (value === 'left') || (value === 'right')
      }
    }
  },
  computed: {
    textClass () {
      return `text-${this.align}`
    },
    fighterImageUrl () {
      return this.$utils.personTwitterProfileThumbUrl(this.fighter)
    }
  },
  methods: {
    // @todo This method is used in more than one place.  DRY it up.
    resultVariant (bout, fighter) {
      if (bout.winner_id === null) {
        return 'secondary'
      }

      if (fighter.id === bout.winner_id) {
        return 'success'
      }

      return 'danger'
    }
  },
  mounted () {
    console.log('Event bout-fighter component mounted.')
  }
}
</script>

<style lang="scss" scoped>

</style>

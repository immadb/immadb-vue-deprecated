<template>
  <div>
    <b-img center rounded thumbnail :src="fighterImageUrl" :alt="fighter.full_name" height="150" width="150" />
    <p class="text-center">
      <router-link :to="this.$utils.personRoute(fighter)">
        {{ fighter.first_name }}<br />
        {{ fighter.last_name }}
      </router-link>
    </p>
  </div>
  <!-- <b-media :right-align="align==='right'" vertical-align="top">
    <b-img slot="aside" rounded thumbnail :src="fighterImageUrl" :alt="fighter.full_name" height="150" width="150" />
    <b-img slot="aside" rounded thumbnail blank blank-color="lightgray" :alt="fighter.full_name" height="150" width="150" />

    <p :class="textClass">
      <router-link :to="this.$utils.personRoute(fighter)">
        {{ fighter.complete_name }}
      </router-link>
    </p>
    <p :class="textClass">{{ fighter.pretty_prefight_record }}</p>
    <p :class="textClass">{{ fighter.age_at_fight }}</p>
    <p :class="textClass">{{ fighter.pretty_height }}</p>
    <p :class="textClass">{{ fighter.pretty_fight_weight }}</p>
    <p :class="textClass">{{ fighter.pretty_reach }}</p>
    <p :class="textClass">{{ fighter.pretty_leg_reach }}</p>
    <p :class="textClass">{{ fighter.pretty_fighting_out_of }}</p>

  </b-media> -->
</template>

<script>
export default {
  props: {
    'fighter': {
      type: Object,
      required: true
    },
    'bout': {
      type: Object,
      required: true
    },
    'align': {
      type: String,
      required: false,
      default: 'left',
      validator: value => { // @todo Is there a better way to validate this...?
        return (value === 'left') || (value === 'right')
      }
    }
  },
  computed: {
    fighterImageUrl () {
      return this.$utils.personTwitterProfileUrl(this.fighter)
    },
    textClass () {
      let align = (this.align === 'left') ? 'right' : 'left'
      return `text-${align}`
    }
  },
  mounted () {
    console.log('Tale-of-the-tape fighter component mounted.')
  }
}
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 0px;
}
</style>

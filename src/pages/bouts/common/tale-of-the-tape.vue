<template>
  <b-container class="tale-of-the-tape">
    <b-row>
      <b-col sm>
        <tale-of-the-tape-fighter :fighter="bout.red_fighter" :bout="bout" align="left"/>
      </b-col>

      <b-col cols="4">
        <b-row>
          <b-col sm>
            <p class="m-0 text-center">
              <router-link :to="this.$utils.eventRoute(bout.event)">
                {{ bout.event.title }}
              </router-link>
            </p>
            <p class="m-0 text-center">{{ boutDescription }}</p>
          </b-col>
        </b-row>
        <b-row class="tott-detail">
          <b-col sm><p class="tott-detail-value">{{ ageAtFight(bout.red_fighter) }}</p></b-col>
          <b-col sm><p class="tott-detail-key">Age</p></b-col>
          <b-col sm><p class="tott-detail-value">{{ ageAtFight(bout.blue_fighter) }}</p></b-col>
        </b-row>
        <b-row class="tott-detail">
          <b-col sm><p class="tott-detail-value">{{ bout.red_fighter.height }}</p></b-col>
          <b-col sm><p class="tott-detail-key">Height</p></b-col>
          <b-col sm><p class="tott-detail-value">{{ bout.blue_fighter.height }}</p></b-col>
        </b-row>
        <b-row class="tott-detail">
          <b-col sm><p class="tott-detail-value">{{ bout.red_fighter.reach }}</p></b-col>
          <b-col sm><p class="tott-detail-key">Reach</p></b-col>
          <b-col sm><p class="tott-detail-value">{{ bout.blue_fighter.reach }}</p></b-col>
        </b-row>
        <!-- <b-row>
          <b-col sm>
            <p class="m-0 text-center">
              @todo ads...?
            </p>
          </b-col>
        </b-row> -->
      </b-col>

      <b-col sm>
        <tale-of-the-tape-fighter :fighter="bout.blue_fighter" :bout="bout" align="right"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment-timezone'
import TaleOfTheTapeFighter from './tale-of-the-tape-fighter'

export default {
  components: {
    'tale-of-the-tape-fighter': TaleOfTheTapeFighter
  },
  computed: {
    boutDescription () {
      return this.bout.championship_status
    }
  },
  methods: {
    ageAtFight (fighter) {
      if (!fighter.birthdate) return 'n/a'

      let date = this.bout.event.date_time_utc
      // date = (date ? date : moment()) <-- keep this for an age-at-??? function, where a date may be provided, otherwise it defaults to now.

      // let user = store.getters['user/data']

      let birthdate = moment(fighter.birthdate)

      // if (user) {
      //   return moment.tz(date, 'UTC').tz(user.timezone).locale(user.language_code).diff(birthdate, 'years')
      // } else {
      return moment.tz(date, 'UTC').tz(moment.tz.guess()).diff(birthdate, 'years')
      // }
    }
  },
  props: {
    'bout': {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .tale-of-the-tape {
    padding: 0px;
  }
  .tott-detail {
    // ...
  }
  .tott-detail-key {
    margin-bottom: 0px;
    text-align: center;
    text-transform: uppercase;
  }
  .tott-detail-value {
    margin-bottom: 0px;
    text-align: center;
  }
</style>
